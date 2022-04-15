import { Typography } from '@mui/material';
import React from 'react';
import classes from "./LoadingHandler.module.css"


const LoadingHandler = ({ children, visible, setVisible }) => {

    const rootClasses = [classes.loadingHandler];

    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={classes.loadingHandlerContent}>                
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{textAlign:"center"}}
                        >
                            {/* {children} */}
                            Загружаем...
                        </Typography>                
            </div>
        </div>
    );
};

export default LoadingHandler;