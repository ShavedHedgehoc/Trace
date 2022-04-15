import { Button, MenuItem, OutlinedInput, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector, } from "react-redux";
import { changeBoilsFormDataAction, resetBoilsFormDataAction } from '../../store/boilsFormDataReducer';
import classes from './SearchForm.module.css'


const SearchForm = () => {

    const dispatch = useDispatch();
    const formData = useSelector(state => state.boilsFormData.boilsFormData);
    const boilsData = useSelector(state => state.boilsData.boilsData);

    const handleChange = (event) => {
        const formField = {
            name: event.target.name,
            value: event.target.value
        }
        dispatch(changeBoilsFormDataAction(formField))
    }

    const handleClearButton = () => {
        dispatch(resetBoilsFormDataAction())
    }

    return (
        <div className={classes.formLayout}>
            <div className={classes.formGroup}>
                <fieldset className={classes.fieldSet}>
                    <legend className={classes.legend}>Продукт</legend>
                    <div className={classes.formGroupRow}>
                        <TextField
                            name="batch"
                            label="Варка"
                            size="small"
                            sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                            value={formData.batch}
                            onChange={handleChange}
                        />
                        <TextField
                            name="marking"
                            label="Артикул"
                            size="small"
                            sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                            value={formData.marking}
                            onChange={handleChange}
                        />
                    </div>
                </fieldset>
            </div>
            <div className={classes.formGroup}>
                <fieldset className={classes.fieldSet}>
                    <legend className={classes.legend}>Период</legend>
                    <div className={classes.formGroupRow}>
                        <OutlinedInput
                            name="date"
                            sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                            type="date"
                            size='small'
                            value={formData.date}
                            onChange={handleChange}                            
                        />
                        <TextField size='small'
                            name='month'
                            label="Месяц"
                            sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                            value={formData.month}
                            defaultValue='-'
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value='-' sx={{ fontSize: '14px' }}><em>Все</em></MenuItem>
                            {/* {boilsData.month_selector_options.map((item) =>
                                <MenuItem key={item.key} value={item.key} sx={{ fontSize: '14px' }}><em>{item.value}</em></MenuItem>
                            )} */}
                        </TextField>
                        <TextField size='small'
                            label="Год"
                            name='year'
                            sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                            value={formData.year}
                            defaultValue='-'
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value='-' sx={{ fontSize: '14px' }}><em>Все</em></MenuItem>
                            {/* {boilsData.year_selector_options.map((item) =>
                                <MenuItem key={item.key} value={item.key} sx={{ fontSize: '14px' }}><em>{item.value}</em></MenuItem>
                            )} */}
                        </TextField>

                    </div>
                </fieldset>
            </div>
            <div className={classes.formGroup}>
                <fieldset className={classes.fieldSet}>
                    <legend className={classes.legend}>Площадка</legend>
                    <div className={classes.formGroupRow}>
                        <TextField size='small'
                            label="Площадка"
                            name='plant'
                            sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                            value={formData.plant}
                            defaultValue='-'
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value='-' sx={{ fontSize: '14px' }}><em>Все</em></MenuItem>
                            {/* {boilsData.plant_selector_options.map((item) =>
                                <MenuItem key={item.key} value={item.key} sx={{ fontSize: '14px' }}><em>{item.value}</em></MenuItem>
                            )} */}

                        </TextField>
                    </div>
                </fieldset>
            </div>

            <div className={classes.formButtonGroup}>
                <Button onClick={handleClearButton}>Очистить</Button>
            </div>
        </div>
    )
};

export default SearchForm;
