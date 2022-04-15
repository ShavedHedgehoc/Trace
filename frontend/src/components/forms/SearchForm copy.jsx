import { ClearOutlined } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, MenuItem, OutlinedInput, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import classes from './SearchForm.module.css'


const SearchForm = (props) => {

    const [formSearchString, setFormSearchString] = useState(
        {
            'batchString': '',
            'markingString': '',
            'dateString': '',
            'monthString': '-',
            'yearString': '-',
            'plantString': '-'
        }
    );

    useEffect(() => {
        props.callback(formSearchString);
    }, [formSearchString]);

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        if (name === 'dateString') {
            setFormSearchString(prevState => ({
                ...prevState,
                'monthString': '-',
                'yearString': '-',
                'plantString': '-',
                [name]: value
            }));
        } else {
            setFormSearchString(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleClearButton = () => {

        setFormSearchString({
            'batchString': '',
            'markingString': '',
            'dateString': '',
            'monthString': '-',
            'yearString': '-',
            'plantString': '-',
        });
    }

    const handleClearIcon = () => {
        setFormSearchString(prevState => ({
            ...prevState,
            'dateString': '',
        }));
    }


    return (
        <div className={classes.formLayout}>
            <div className={classes.formGroup}>
                <fieldset className={classes.fieldSet}>
                    <legend className={classes.legend}>Продукт</legend>
                    <div className={classes.formGroupRow}>
                        <TextField
                            name="batchString"
                            label="Варка"
                            size="small"
                            sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                            value={formSearchString.batchString}
                            onChange={handleChange}
                        />
                        <TextField
                            name="markingString"
                            label="Артикул"
                            size="small"
                            sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                            value={formSearchString.markingString}
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
                            name="dateString"
                            sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                            type="date"
                            size='small'
                            value={formSearchString.dateString}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handleClearIcon}
                                        edge="end"
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <TextField size='small'
                            name='monthString'
                            label="Месяц"
                            sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                            value={formSearchString.monthString}
                            defaultValue='-'
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value='-' sx={{ fontSize: '14px' }}><em>Все</em></MenuItem>
                            {props.monthItems.map((item) =>
                                <MenuItem key={item.key} value={item.key} sx={{ fontSize: '14px' }}><em>{item.value}</em></MenuItem>
                            )}
                        </TextField>
                        <TextField size='small'
                            label="Год"
                            name='yearString'
                            sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                            value={formSearchString.yearString}
                            defaultValue='-'
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value='-' sx={{ fontSize: '14px' }}><em>Все</em></MenuItem>
                            {props.yearItems.map((item) =>
                                <MenuItem key={item.key} value={item.key} sx={{ fontSize: '14px' }}><em>{item.value}</em></MenuItem>
                            )}
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
                            name='plantString'
                            sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                            value={formSearchString.plantString}
                            defaultValue='-'
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value='-' sx={{ fontSize: '14px' }}><em>Все</em></MenuItem>
                            {props.plantItems.map((item) =>
                                <MenuItem key={item.key} value={item.key} sx={{ fontSize: '14px' }}><em>{item.value}</em></MenuItem>
                            )}

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


