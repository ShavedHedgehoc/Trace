import React, {FC} from 'react';
import classes from "../../styles/Form.module.css";
import {
    ConvergenceFilterParams,
    IConvergenceFilter,
    IConvergenceFormField,
    IPlantSelectorOption
} from "../../types/convergence";

 export interface ConvergenceFormProps {
    filter: IConvergenceFilter;
    plants_select_options: IPlantSelectorOption[];
    changeFilter: ({key, value}: IConvergenceFormField) => void;
    resetFilter: () => void;

}

const ConvergenceForm: FC<ConvergenceFormProps> = (
    {
        filter,
        plants_select_options,
        changeFilter,
        resetFilter
    }
) => {
    return (
        <div className={classes.formContainer}>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Дата начала:</div>
                <div className={classes.formField}>
                    <input type="date"
                           className={classes.formDate}
                           id={ConvergenceFilterParams.START_DATE}
                           value={filter.start_date}
                           onChange={(e) => changeFilter({key: e.target.id, value: e.target.value})}
                    />
                </div>
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Дата окончания:</div>
                <div className={classes.formField}>
                    <input type="date"
                           className={classes.formDate}
                           id={ConvergenceFilterParams.END_DATE}
                           value={filter.end_date}
                           onChange={(e) => changeFilter({key: e.target.id, value: e.target.value})}
                    />
                </div>
            </div>
            <div className={classes.formElement}>
                <div className={classes.formLabel}>Площадка</div>
                <div className={classes.formField}>
                    <select
                        className={classes.formSelect}
                        id={ConvergenceFilterParams.PLANT}
                        value={filter.plant}
                        onChange={(e) => changeFilter({key: e.target.id, value: e.target.value})}
                    >
                        {plants_select_options.map((item) =>
                            <option key={item.key} value={item.key}>{item.value}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className={classes.formInlineElement}>
                <label className={classes.formLabel}>Точное совпадение:</label>
                <input type="checkbox"
                       className={classes.formCheckbox}
                       id={ConvergenceFilterParams.EXACTLY}
                       checked={filter.exactly === 'true'}
                       onChange={(e) => changeFilter({
                           key: e.target.id,
                           value: e.target.checked ? 'true' : 'false'
                       })}
                />
            </div>
            <div className={classes.formElement}>
                <a className={classes.formButton} onClick={() => resetFilter()}>Сбросить</a>
            </div>
        </div>
    );
};

export default ConvergenceForm;