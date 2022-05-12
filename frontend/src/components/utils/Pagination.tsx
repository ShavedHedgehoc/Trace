import React, {FC} from 'react';
import classes from "../../styles/Pagination.module.css";
import {limitValues} from "../constants";

export interface PaginationProps {
    increasePage: () => void;
    decreasePage: () => void;
    getFirstPage: () => void;
    getLastPage: () => void;
    changeLimit: (limit: number) => void;
    loading: boolean;
    page: number;
    limit: number;
    total: number;
}

const Pagination: FC<PaginationProps> = (
    {
        increasePage,
        decreasePage,
        getFirstPage,
        getLastPage,
        changeLimit,
        page,
        limit,
        total,
        loading
    }) => {

    const lastPage = (Math.ceil(total / limit))
    const selectDisabled = loading || total === 0
    const prevButtonsDisabled = loading || total === 0 || page === 0
    const nextButtonsDisabled = loading || total === 0 || page === lastPage - 1

    return (
        <div className={classes.paginationContainer}>
            <div className={classes.paginationElement}>
                <div className={classes.paginationSubElement}>
                    <div className={classes.paginationLabel}>
                        {total === 0
                            ?
                            <span>Записи 0 - 0 из 0</span>
                            :
                            <span>Записи {1 + page * limit} - {page === lastPage - 1 ? total : limit + page * limit} из {total}</span>
                        }
                    </div>
                </div>
            </div>
            <div className={classes.paginationElement}>
                <div className={classes.paginationSubElement}>
                    <div className={classes.paginationLabel}>
                        Записей на странице:
                    </div>
                </div>
            </div>
            <div className={classes.paginationElement}>
                <div className={classes.paginationSubElement}>
                    <select
                        disabled={selectDisabled}
                        className={classes.paginationSelect}
                        value={limit}
                        onChange={(e) => changeLimit(parseInt(e.target.value))}>
                        {limitValues.map((item) => (
                            <option
                                className={classes.paginationOption}
                                key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={classes.paginationElement}>
                <div className={classes.paginationButtonGroup}>
                    <button
                        className={classes.paginationButton}
                        onClick={() => getFirstPage()}
                        disabled={prevButtonsDisabled}>&lt;&lt;</button>
                    <button
                        className={classes.paginationButton}
                        onClick={() => decreasePage()}
                        disabled={prevButtonsDisabled}>&lt;</button>
                </div>
            </div>
            <div className={classes.paginationElement}>
                <div className={classes.paginationSubElement}>
                    <div className={classes.paginationLabel}>
                        {total === 0
                            ? <span>Страница: 0 из 0</span>
                            : <span>Страница: {page + 1} из {lastPage}</span>
                        }
                    </div>
                </div>
            </div>
            <div className={classes.paginationElement}>
                <div className={classes.paginationButtonGroup}>
                    <button
                        className={classes.paginationButton}
                        onClick={() => increasePage()}
                        disabled={loading || total === 0 ? true : page === lastPage - 1 ? true : false}>&gt;</button>
                    <button
                        className={classes.paginationButton}
                        onClick={() => getLastPage()}
                        disabled={loading || total === 0 ? true : page === lastPage - 1 ? true : false}>&gt;&gt;</button>
                </div>
            </div>
        </div>
    )
}

export default Pagination;