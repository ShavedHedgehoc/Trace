import React from "react";

import { CircleTwoTone, Circle } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const ColoredCircle = (props) => {
    return (
        <IconButton disableRipple={true} disabled={true} >
            {/* <CircleTwoTone sx={{ color: props.plan ? props.fact ? props.plan === props.fact ? "green" : "orange" : "red" : "gray" }} /> */}
            <Circle sx={{
                color:
                    props.plan
                        ? props.fact
                            ? props.plan === props.fact
                                ? "lightgreen"
                                : "yellow"
                            : "pink"
                        : "gray"
            }} />
        </IconButton>
    );
};

export default ColoredCircle;