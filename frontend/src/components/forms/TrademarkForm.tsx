import React, {FC} from 'react';
import classes from "../../styles/Form.module.css";
import {
    TrademarkFilterParams,
    ITrademarkFilter,
    ITrademarkFormField,
} from "../../types/trademark";


export interface TrademarkFormProps {
    filter: ITrademarkFilter;
    changeFilter: ({key, value}: ITrademarkFormField) => void;
    resetFilter: () => void;

}

const TrademarkForm: FC<TrademarkFormProps> = (
    {
        filter,
        changeFilter,
        resetFilter
    }
) => {
    return (
        <div className={classes.formContainer}>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Торговое название:</div>
                <input type="text" className={classes.formInput}
                       autoComplete={'off'}
                       id={TrademarkFilterParams.TRADEMARK_NAME}
                       value={filter.trademark_name}
                       onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                />
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Код 1С:</div>
                <input type="text" className={classes.formInput}
                       autoComplete={'off'}
                       id={TrademarkFilterParams.PRODUCT_ID}
                       value={filter.product_id}
                       onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                />
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Наименование:</div>
                <input type="text" className={classes.formInput}
                       autoComplete={'off'}
                       id={TrademarkFilterParams.PRODUCT_NAME}
                       value={filter.product_name}
                       onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                />
            </div>
            <div className={classes.formElement}>
                <a className={classes.formButton} onClick={() => resetFilter()}>Сбросить</a>
            </div>
        </div>
    );
};

export default TrademarkForm;