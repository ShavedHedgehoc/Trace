import React, { FC } from 'react';
import classes from "../../styles/Form.module.css";
import { CellsContainFilterParams, ICellsContainFilter, ICellsContainFormField, ICellsContainOrders } from '../../types/cellsContain';

export interface CellsContainFormProps {
    filter: ICellsContainFilter;
    order: ICellsContainOrders;
    changeFilter: ({ key, value }: ICellsContainFormField) => void;
    changeOrder: (value: ICellsContainOrders) => void;
    resetFilter: () => void;
}

const CellsContainForm: FC<CellsContainFormProps> = (
    {
        filter,
        order,
        changeFilter,
        changeOrder,
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
                    {/* <div className={classes.formElementCenteredRow}>
                        <a className={classes.formButtonFullWidth} >Применить фильтр</a>
                    </div> */}
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
                                <input
                                    type="radio"
                                    name="order"
                                    value={ICellsContainOrders.BY_CELLS}
                                    checked={order === ICellsContainOrders.BY_CELLS}
                                    onChange={(e) => changeOrder(e.target.value as ICellsContainOrders)
                                        //     {
                                        //     console.log(e.target.value);
                                        //     setOrder(e.target.value)
                                        // }
                                    }
                                />
                                <a className={classes.formButtonFullWidth} onClick={() => {
                                    changeOrder(ICellsContainOrders.BY_CELLS)
                                    // console.log(ICellsContainOrders.BY_CELLS);
                                    // setOrder(ICellsContainOrders.BY_CELLS)
                                }
                                }>По ячейкам</a>
                                {/* По ячейкам */}
                            </div>
                        </div>
                        <div className={classes.formElementRow}>
                            <div className={classes.formRadio}>
                                <input
                                    type="radio"
                                    name="order"
                                    value={ICellsContainOrders.BY_PRODUCTS}
                                    checked={order === ICellsContainOrders.BY_PRODUCTS}
                                    onChange={(e) => changeOrder(e.target.value as ICellsContainOrders)


                                        //     {
                                        //     console.log(e.target.value);
                                        //     setOrder(e.target.value)
                                        // }
                                    }
                                />
                                <a className={classes.formButtonFullWidth} onClick={() => {
                                    changeOrder(ICellsContainOrders.BY_PRODUCTS)
                                    // console.log(ICellsContainOrders.BY_PRODUCTS);
                                    // setOrder(ICellsContainOrders.BY_PRODUCTS)
                                }
                                }>По продукту</a>

                                {/* По продукту */}
                            </div>
                        </div>
                        <div className={classes.formElementRow}>
                            <div className={classes.formRadio}>
                                <input
                                    type="radio"
                                    name="order"
                                    value={ICellsContainOrders.BY_EXPIRE}
                                    checked={order === ICellsContainOrders.BY_EXPIRE}
                                    onChange={(e) => changeOrder(e.target.value as ICellsContainOrders)

                                        //     {
                                        //     console.log(e.target.value);
                                        //     setOrder(e.target.value)
                                        // }
                                    }
                                />
                                <a className={classes.formButtonFullWidth} onClick={() => {
                                    changeOrder(ICellsContainOrders.BY_EXPIRE)
                                    // console.log(ICellsContainOrders.BY_EXPIRE);
                                    // setOrder(ICellsContainOrders.BY_EXPIRE)
                                }
                                }>По сроку годности</a>

                                {/* По сроку годности */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CellsContainForm;
