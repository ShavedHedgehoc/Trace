import React, { FC } from 'react';
import classes from "../../styles/Form.module.css";
import { CellsContainFilterParams, ICellsContainFilter, ICellsContainFormField } from '../../types/cellsContain';

export interface CellsContainFormProps {
    filter: ICellsContainFilter;
    changeFilter: ({ key, value }: ICellsContainFormField) => void;
    resetFilter: () => void;
}

const CellsContainForm: FC<CellsContainFormProps> = (
    {
        filter,
        changeFilter,
        resetFilter
    }
) => {
    return (
        <div className={classes.formContainerWithPad}>
            <div className={classes.formElementBordered}>
                <div className={classes.formElementBorderedHeader}>Фильтр:</div>
                <div className={classes.formElementBorderedBody}>
                    <div className={classes.formElementBorderedColumn}>
                        <div className={classes.formElementRow}>
                            <div className={classes.formRowLabel}>Ячейка:</div>
                            <input
                                className={classes.formElementRowInput}
                                id={CellsContainFilterParams.CELL}
                                value={filter.cell}
                                onChange={(e) => changeFilter({ key: e.target.id, value: e.target.value })}
                            />
                        </div>
                        <div className={classes.formElementRow}>
                            <div className={classes.formRowLabel}>Код 1С:</div>
                            <input
                                className={classes.formElementRowInput}
                                id={CellsContainFilterParams.PRODUCT_ID}
                                value={filter.product_id}
                                onChange={(e) => changeFilter({ key: e.target.id, value: e.target.value })}
                            />
                        </div>
                        <div className={classes.formElementRow}>
                            <div className={classes.formRowLabel}>Наименование:</div>
                            <input
                                className={classes.formElementRowInput}
                                id={CellsContainFilterParams.PRODUCT_NAME}
                                value={filter.product_name}
                                onChange={(e) => changeFilter({ key: e.target.id, value: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.formElementNotBordered}>
                <div className={classes.formElementBorderedColumn}>
                    <div className={classes.formElementCenteredRow}>
                        <a className={classes.formButtonFullWidth} >Применить фильтр</a>
                    </div>
                    <div className={classes.formElementCenteredRow}>
                        <a className={classes.formButtonFullWidth} onClick={() => resetFilter()}>Сбросить фильтр</a>
                    </div>
                    {/* <div className={classes.formElementCenteredRow}>
                        <a className={classes.formButtonFullWidth} >Обновить данные</a>
                    </div> */}
                </div>
            </div>
            <div className={classes.formElementBordered}>
                <div className={classes.formElementBorderedHeader}>Порядок сортировки:</div>
                <div className={classes.formElementBorderedBody}>
                    <div className={classes.formElementBorderedColumnCenter}>
                        <div className={classes.formElementRow}>
                            <div className={classes.formRadio}>
                                <input type="radio" name="order" value="cells" /> По ячейкам
                            </div>
                        </div>
                        <div className={classes.formElementRow}>
                            <div className={classes.formRadio}>
                                <input type="radio" name="order" value="product" /> По продукту
                            </div>
                        </div>
                        <div className={classes.formElementRow}>
                            <div className={classes.formRadio}>
                                <input type="radio" name="order" value="expire" /> По сроку годности
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CellsContainForm;
