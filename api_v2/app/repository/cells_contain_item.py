from sqlalchemy.exc import OperationalError
from app import db
from app.assets.api_errors import CellsContainError, DatabaseConnectionError
from app.models.cells_contain import CellsContain


class CellsContainItemRepository:

    def delete_by_id(self, id: int):
        try:
            record = db.session.query(CellsContain).filter(
                CellsContain.CellContainPK == id).one_or_none()
            if record is None:
                raise CellsContainError
            db.session.delete(record)
            db.session.commit()
        except OperationalError:
            raise DatabaseConnectionError
