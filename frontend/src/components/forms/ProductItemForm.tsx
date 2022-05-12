import React, {FC} from 'react'
import {IProductItemFilter, IProductItemFormField, ProductItemFilterParams} from "../../types/productItem";
import classes from "../../styles/Form.module.css";

export interface ProductItemFormProps {
    changeFilter: ({key, value}: IProductItemFormField) => void;
    clearFilter: () => void;
    filter: IProductItemFilter;
}

const ProductItemForm: FC<ProductItemFormProps> = (
    {
        changeFilter,
        clearFilter,
        filter,
    }
) => {
    return (
        <div className={classes.formContainer}>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Квазипартия</div>
                <div className={classes.formField}>
                    <input type="text" className={classes.formInput}
                           id={ProductItemFilterParams.LOT_NAME}
                           value={filter.lot_name}
                           onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                    />
                </div>
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Торговое название</div>
                <div className={classes.formField}>
                    <input type="text" className={classes.formInput}
                           id={ProductItemFilterParams.TRADEMARK_NAME}
                           value={filter.trademark_name}
                           onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                    />
                </div>
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Поставщик</div>
                <div className={classes.formField}>
                    <input type="text" className={classes.formInput}
                           id={ProductItemFilterParams.SELLER_NAME}
                           value={filter.seller_name}
                           onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                    />
                </div>
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Производитель</div>
                <div className={classes.formField}>
                    <input type="text" className={classes.formInput}
                           id={ProductItemFilterParams.MANUFACTURER_NAME}
                           value={filter.manufacturer_name}
                           onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                    />
                </div>
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Партия производителя</div>
                <div className={classes.formField}>
                    <input type="text" className={classes.formInput}
                           id={ProductItemFilterParams.MANUFACTURER_LOT_NAME}
                           value={filter.manufacturer_lot_name}
                           onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                    />
                </div>
            </div>
            <div className={classes.formElement}>
                <a className={classes.formButton} onClick={() => clearFilter()} >Очистить</a>
            </div>
        </div>
    )
}

export default ProductItemForm;