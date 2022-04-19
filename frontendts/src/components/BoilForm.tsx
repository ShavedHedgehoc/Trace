import React, { FC } from 'react'
import { BoilFilterParams, IBoilFilter, IBoilFormField, IMonthData, IPlantData, IYearData } from '../types/boil';
import classes from "./BoilForm.module.css";

interface BoilFormProps {
    changeFilter: ({ key, value }: IBoilFormField) => void;
    clearFilter:()=>void;
    filter: IBoilFilter;
    months: IMonthData[];
    years: IYearData[];
    plants: IPlantData[];
    loading:boolean;
}

const BoilForm: FC<BoilFormProps> = ({ changeFilter, clearFilter, filter, months, years, plants, loading }) => {

    return (
        <div className={classes.boilFormContainer}>
            <div className={classes.boilFormElement}>
                <div className={classes.boilFormLabel}>Варка</div>
                <div className={classes.boilFormField}>
                    <input type="text" className={classes.boilFormInput}
                        disabled={loading}
                        id={BoilFilterParams.BATCH}
                        value={filter.batch}
                        onChange={(e) => (changeFilter({ key: e.target.id, value: e.target.value }))}
                    />
                </div>
            </div>
            <div className={classes.boilFormElement}>
                <div className={classes.boilFormLabel}>Артикул</div>
                <div className={classes.boilFormField}>
                    <input type="text" className={classes.boilFormInput}
                    disabled={loading}
                        id={BoilFilterParams.MARKING}
                        value={filter.marking}
                        onChange={(e) => (changeFilter({ key: e.target.id, value: e.target.value }))}
                    />
                </div>
            </div>
            <div className={classes.boilFormElement}>
                <div className={classes.boilFormLabel}>Дата</div>
                <div className={classes.boilFormField}>
                    <input type="date" className={classes.boilFormDate}
                    disabled={loading}
                        id={BoilFilterParams.DATE}
                        value={filter.date}
                        onChange={(e) => (changeFilter({ key: e.target.id, value: e.target.value }))}
                    />
                </div>
            </div>

            <div className={classes.boilFormElement}>
                <div className={classes.boilFormLabel}>Месяц</div>
                <div className={classes.boilFormField}>
                    <select className={classes.boilFormSelect}
                    disabled={loading}
                        id={BoilFilterParams.MONTH}
                        value={filter.month}
                        onChange={(e) => (changeFilter({ key: e.target.id, value: e.target.value }))}
                    >
                        {months.map((item) =>
                            <option key={item.key} value={item.key}>{item.value}</option>
                        )}
                    </select>

                </div>
            </div>
            <div className={classes.boilFormElement}>
                <div className={classes.boilFormLabel}>Год</div>
                <div className={classes.boilFormField}>
                    <select className={classes.boilFormSelect}
                    disabled={loading}
                        id={BoilFilterParams.YEAR}
                        value={filter.year}
                        onChange={(e) => (changeFilter({ key: e.target.id, value: e.target.value }))}
                    >
                        {years.map((item) =>
                            <option key={item.key} value={item.key}>{item.value}</option>
                        )}
                    </select>

                </div>
            </div>
            <div className={classes.boilFormElement}>
                <div className={classes.boilFormLabel}>Площадка</div>
                <div className={classes.boilFormField}>
                    <select className={classes.boilFormSelect}
                    disabled={loading}
                        id={BoilFilterParams.PLANT}
                        value={filter.plant}
                        onChange={(e) => (changeFilter({ key: e.target.id, value: e.target.value }))}
                    >
                        {plants.map((item) =>
                            <option key={item.key} value={item.key}>{item.value}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className={classes.boilFormElement}>
                <button className={classes.boilFormButton} onClick={()=>clearFilter()} disabled={loading}>Очистить</button>
            </div>
        </div>
    )
}

export default BoilForm;