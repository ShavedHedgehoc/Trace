import React, {FC} from 'react'
import {IProductFilter, IProductFormField, ProductFilterParams} from "../../types/product";
import classes from "../../styles/Form.module.css";

 export interface ProductFormProps {
    changeFilter: ({key, value}: IProductFormField) => void;
    clearFilter: () => void;
    filter: IProductFilter;
}

const ProductForm: FC<ProductFormProps> = (
    {
        changeFilter,
        clearFilter,
        filter,
    }
) => {
    return (
        <div className={classes.formContainer}>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Код 1С</div>
                <div className={classes.formField}>
                    <input type="text" className={classes.formInput}
                           autoComplete={'off'}
                           id={ProductFilterParams.PRODUCT_ID}
                           value={filter.product_id}
                           onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                    />
                </div>
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Наименование</div>
                <div className={classes.formField}>
                    <input type="text" className={classes.formInput}
                           autoComplete={'off'}
                           id={ProductFilterParams.PRODUCT_NAME}
                           value={filter.product_name}
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

export default ProductForm;