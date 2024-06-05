from flask import jsonify
from sqlalchemy import case, func, sql, text
from sqlalchemy.exc import OperationalError


from app import db
from app.models.boil_records import BoilRecord
from app.models.author import Author
from app.models.batch import Batch
from app.models.boil import Boil
from app.models.bt_product import BtProduct
from app.models.document import Document
from app.models.load import Load
from app.models.lot import Lot
from app.models.product import Product
from app.models.plant import Plant
from app.models.weighting import Weighting
from app.models.operations import Operation
from app.schemas.boil import (
    BoilItemHeaderSchema,
    BoilItemRowSchema,
    BoilItemSummaryRowSchema,
    BoilItemTechRowSchema,
)
from app.assets.api_errors import DatabaseConnectionError


class BoilItemRepository:

    header_schema = BoilItemHeaderSchema()
    summary_rows_schema = BoilItemSummaryRowSchema()
    rows_schema = BoilItemRowSchema()
    tech_schema = BoilItemTechRowSchema()

    def __header(self, boil_id: int):
        data = (
            db.session.query(
                Batch.BatchName.label("boil_name"),
                Batch.BatchDate.label("date"),
                Plant.PlantName.label("plant"),
                Product.ProductMarking.label("marking"),
            )
            .join(Plant, Plant.PlantAlias == Batch.plant_letter, isouter=True)
            .join(BtProduct, BtProduct.BatchPK == Batch.BatchPK, isouter=True)
            .join(Product, Product.ProductId == BtProduct.ProductId, isouter=True)
            .filter(Batch.BatchPK == boil_id)
            .one_or_none()
        )
        header = self.header_schema.dump(data)
        return header

    def __summary_boil_sbqry(self, id: int):
        summary_boil_subqry = (
            db.session.query(
                Boil.BatchPK.label("batch_id"),
                Boil.ProductId.label("product_id"),
                Product.ProductName.label("product_name"),
                func.sum(Boil.Quantity).label("plan"),
            )
            .join(Product, Boil.ProductId == Product.ProductId)
            .filter(Boil.BatchPK == id)
            .group_by(Boil.BatchPK, Boil.ProductId, Product.ProductName)
            .subquery()
        )
        return summary_boil_subqry

    def __summary_weighting_sbqry(self, id: int):
        summary_wght_subqry = (
            db.session.query(
                Weighting.BatchPK,
                Weighting.ProductId.label("product_id"),
                Product.ProductName.label("product_name"),
                func.sum(Weighting.Quantity).label("fact"),
            )
            .join(Product, Weighting.ProductId == Product.ProductId)
            .filter(Weighting.BatchPK == id)
            .group_by(Weighting.BatchPK, Weighting.ProductId, Product.ProductName)
            .subquery()
        )
        return summary_wght_subqry

    def __summary_query(self, id: int):
        summary_boil_subqry = self.__summary_boil_sbqry(id)
        summary_wght_subqry = self.__summary_weighting_sbqry(id)
        summary_qry = (
            db.session.query(
                summary_boil_subqry.c.product_id.label("b_product_id"),
                summary_boil_subqry.c.product_name.label("b_product_name"),
                summary_boil_subqry.c.plan.label("plan"),
                summary_wght_subqry.c.product_id.label("w_product_id"),
                summary_wght_subqry.c.product_name.label("w_product_name"),
                summary_wght_subqry.c.fact.label("fact"),
            )
            .join(
                summary_wght_subqry,
                summary_boil_subqry.c.product_id == summary_wght_subqry.c.product_id,
                full=True,
            )
            .order_by(
                case(
                    [
                        (
                            summary_boil_subqry.c.product_name != "",
                            summary_boil_subqry.c.product_name,
                        ),
                    ],
                    else_=summary_wght_subqry.c.product_name,
                ).asc()
            )
        )
        return summary_qry

    def __summary_rows(self, id: int):
        data = self.__summary_query(id).all()
        rows = self.summary_rows_schema.dump(data, many=True)
        return rows

    def __weighting_query(self, id: int):
        weighting_qry = (
            db.session.query(
                Weighting.ProductId.label("product_id"),
                Product.ProductName.label("product_name"),
                Weighting.Quantity.label("quantity"),
                Lot.LotPK.label("lot_id"),
                Lot.LotName.label("lot"),
                Author.AuthorName.label("user"),
                # Document.CreateDate.label("date"),
                func.dateadd(text("hour"), 3, Document.CreateDate).label("date"),
            )
            .join(Product, Weighting.ProductId == Product.ProductId)
            .join(Lot, Weighting.LotPK == Lot.LotPK)
            .join(Document, Weighting.DocumentPK == Document.DocumentPK)
            .join(Author, Document.AuthorPK == Author.AuthorPK)
            .filter(Weighting.BatchPK == id)
            .order_by((Product.ProductName).asc())
        )
        return weighting_qry

    def __weighting_rows(self, id: int):
        data = self.__weighting_query(id).all()
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def __load_query(self, id: int):
        query = (
            db.session.query(
                Load.BatchPK.label("batch_id"),
                Weighting.ProductId.label("product_id"),
                Weighting.LotPK.label("lot_id"),
                Product.ProductName.label("product_name"),
                Lot.LotName.label("lot_name"),
                Author.AuthorName.label("user"),
                # Document.CreateDate.label("date"),
                func.dateadd(text("hour"), 3, Document.CreateDate).label("date"),
            )
            .join(Weighting, Weighting.ContainerPK == Load.ContainerPK)
            .join(Product, Product.ProductId == Weighting.ProductId)
            .join(Lot, Lot.LotPK == Weighting.LotPK)
            .join(Document, Document.DocumentPK == Load.DocumentPK)
            .join(Author, Author.AuthorPK == Document.AuthorPK)
            .filter(Load.BatchPK == id)
            .order_by(Product.ProductName)
        )
        return query

    def __load_rows(self, id: int):
        data = self.__load_query(id).all()
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def __technology_subquery_loads(self, id: int):
        query = (
            db.session.query(
                Load.BatchPK.label("batch_id"),
                Weighting.ProductId.label("code"),
                Product.ProductName.label("name"),
                Lot.LotName.label("lot"),
                sql.null().label("temp"),
                Author.AuthorName.label("user"),
                # Document.CreateDate.label("date"),
                func.dateadd(text("hour"), 3, Document.CreateDate).label("date"),
                sql.literal("load").label("op_type"),
            )
            .join(Weighting, Weighting.ContainerPK == Load.ContainerPK)
            .join(Product, Product.ProductId == Weighting.ProductId)
            .join(Lot, Lot.LotPK == Weighting.LotPK)
            .join(Document, Document.DocumentPK == Load.DocumentPK)
            .join(Author, Author.AuthorPK == Document.AuthorPK)
            .filter(Load.BatchPK == id)
        )
        return query

    def __technology_subquery_boil(self, id: int):
        query = (
            db.session.query(
                BoilRecord.BatchId.label("batch_id"),
                Operation.OperationCode.label("code"),
                Operation.OperationName.label("name"),
                sql.null().label("lot"),
                BoilRecord.Temperature.label("op_temp"),
                Author.AuthorName.label("user"),
                BoilRecord.CreateDate.label("date"),
                sql.literal("boil").label("op_type"),
            )
            .join(Operation, Operation.OperationPK == BoilRecord.OperationId)
            .join(Author, Author.AuthorPK == BoilRecord.AuthorId)
            .filter(BoilRecord.BatchId == id)
        )
        return query

    def __technology_rows(self, id: int):
        loads = self.__technology_subquery_loads(id)
        boils = self.__technology_subquery_boil(id)
        sbqry = loads.union(boils).subquery()
        data = db.session.query(sbqry).order_by(sbqry.c.date).all()
        rows = self.tech_schema.dump(data, many=True)
        return rows

    def get_boil(self, id: int):
        try:
            header = self.__header(id)
            summary_rows = self.__summary_rows(id)
            weighting_rows = self.__weighting_rows(id)
            load_rows = self.__load_rows(id)
            technology_rows = self.__technology_rows(id)
            response = {
                "header": header,
                "summaryRows": summary_rows,
                "weightingRows": weighting_rows,
                "loadRows": load_rows,
                "technologyRows": technology_rows,
            }
            return jsonify(response)
        except OperationalError:
            raise DatabaseConnectionError
