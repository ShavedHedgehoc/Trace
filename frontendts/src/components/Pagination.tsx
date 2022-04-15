import React, { FC } from 'react';

const limitValues =[5, 10, 15, 20]

interface PaginationProps {
    increasePage: () => void;
    decreasePage: () => void;
    getFirstPage: () => void;
    getLastPage: () => void;
    changeLimit: (limit: number) => void;
    page: number;
    limit: number;
    total: number;
}

const Pagination: FC<PaginationProps> = ({ increasePage, decreasePage, getFirstPage, getLastPage, changeLimit, page, limit, total }) => {
    
    const lastPage = (Math.ceil(total / limit))
    
    return (
        <div>
            <p>Записи {1 + page * limit} - {page === lastPage - 1 ? total : limit + page * limit} из {total}</p>
            <p>Записей на странице:
                <select value={limit} onChange={(e) => changeLimit(parseInt(e.target.value))}>
                    {limitValues.map((item) => (
                        <option key={item} >{item}</option>
                    ))}
                </select >
            </p>
            <p>Страница: {page + 1} из {lastPage}</p>
            <div>
                <button onClick={() => getFirstPage()} disabled={page === 0 ? true : false}>Первая</button>
                <button onClick={() => decreasePage()} disabled={page === 0 ? true : false}>-</button>
                <button onClick={() => increasePage()} disabled={page === lastPage - 1 ? true : false}>+</button>
                <button onClick={() => getLastPage()} disabled={page === lastPage - 1 ? true : false}>Последняя</button>
            </div>
        </div>
    )

}

export default Pagination;