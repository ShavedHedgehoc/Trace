import { ClearOutlined, InputOutlined } from '@mui/icons-material';
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputBase, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import classes from './SearchForm.module.css'


// function useDebounce(value, wait = 500) {
//     const [deboncedValue, setDeboncedValue] = useState(value);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDeboncedValue(value);
//         }, wait);
//         return () => clearTimeout(timer);
//     }, [value, wait]);
//     return deboncedValue;
// }




const SearchForm2 = (props) => {

    // const [formSearchString, setFormSearchString] = useState(
    //     {
    //         'batchString': '',
    //         'markingString': '',
    //         'dateString': '',
    //         'monthString': '-',
    //         'yearString': '-',
    //         'plantString': '-'
    //     }
    // );

    // var formData = new FormData();
    // const handleChange = (e) => {
    //     formData.append(e.target.id, e.target.value);
    //     for( var pair of formData.entries()){
    //         console.log(pair[0],pair[1]);
    //     }
    // }


    // const debounceSearchString = useDebounce(formSearchString, 500);




    // useEffect(() => {
    //     props.callback(formSearchString);
    // }, []);{}

    const handleChange=()=>{
        useCallback()
    }
    return (
        <form onChange={handleChange}>
            <div className={classes.formLayout}>
                <div className={classes.formGroup}>
                    <fieldset className={classes.fieldSet}>
                        <legend className={classes.legend}>Продукт</legend>
                        <div className={classes.formGroupRow}>
                            <input id="boil">
                            </input>
                            <input id="marking">
                            </input>
                        </div>
                    </fieldset>
                </div>

                <div className={classes.formGroup}>
                    <fieldset className={classes.fieldSet}>
                        <legend className={classes.legend}>Период</legend>
                        <div className={classes.formGroupRow}>
                            <input id="date" type="date">
                            </input>
                            <input id="month" type="select">
                            </input>
                            <input id="year" type="select">
                            </input>
                        </div>
                    </fieldset>
                </div>



                <div className={classes.formGroup}>

                    <fieldset className={classes.fieldSet}>
                        <legend className={classes.legend}>Площадка</legend>
                        <div className={classes.formGroupRow}>
                            <input id="plant" type="select">
                            </input>
                        </div>
                    </fieldset>
                </div>

                <div className={classes.formButtonGroup}>
                    <button>Clear</button>
                </div>
            </div>
        </form>
    )
};

export default SearchForm2;


