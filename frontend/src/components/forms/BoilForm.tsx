import React, {FC} from 'react'
import {BoilFilterParams, IBoilFilter, IBoilFormField, IMonthData, IPlantData, IYearData} from '../../types/boil';
import classes from "../../styles/Form.module.css";

 export interface BoilFormProps {
    changeFilter: ({key, value}: IBoilFormField) => void;
    clearFilter: () => void;
    filter: IBoilFilter;
    months: IMonthData[];
    years: IYearData[];
    plants: IPlantData[];
    loading: boolean;
}

const BoilForm: FC<BoilFormProps> = (
    {
        changeFilter,
        clearFilter,
        filter,
        months,
        years,
        plants,
    }
) => {
    return (
        <div className={classes.formContainer}>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Варка</div>
                <div className={classes.formField}>
                    <input type="text" className={classes.formInput}
                           autoComplete={'off'}
                           id={BoilFilterParams.BATCH}
                           value={filter.batch}
                           onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                    />
                </div>
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Артикул</div>
                <div className={classes.formField}>
                    <input type="text" className={classes.formInput}
                           autoComplete={'off'}
                           id={BoilFilterParams.MARKING}
                           value={filter.marking}
                           onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                    />
                </div>
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Дата</div>
                <div className={classes.formField}>
                    <input type="date" className={classes.formDate}
                           // disabled={loading}
                           id={BoilFilterParams.DATE}
                           value={filter.date}
                           onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                    />
                </div>
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Месяц</div>
                <div className={classes.formField}>
                    <select className={classes.formSelect}
                            // disabled={loading}
                            id={BoilFilterParams.MONTH}
                            value={filter.month}
                            onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                    >
                        {months.map((item) =>
                            <option key={item.key} value={item.key}>{item.value}</option>
                        )}
                    </select>

                </div>
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Год</div>
                <div className={classes.formField}>
                    <select className={classes.formSelect}
                            // disabled={loading}
                            id={BoilFilterParams.YEAR}
                            value={filter.year}
                            onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                    >
                        {years.map((item) =>
                            <option key={item.key} value={item.key}>{item.value}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Площадка</div>
                <div className={classes.formField}>
                    <select className={classes.formSelect}
                            // disabled={loading}
                            id={BoilFilterParams.PLANT}
                            value={filter.plant}
                            onChange={(e) => (changeFilter({key: e.target.id, value: e.target.value}))}
                    >
                        {plants.map((item) =>
                            <option key={item.key} value={item.key}>{item.value}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className={classes.formElement}>
                <a className={classes.formButton} onClick={() => clearFilter()} >Очистить</a>
            </div>
        </div>
    )
}

export default BoilForm;