import React, { FC } from 'react';
import classes from "../../styles/LoadingHandler.module.css";

export interface DeleteCellsContainModalProps {
    id: string;
    handleClickYes: () => void;
    handleClickNo: () => void;
}



const DeleteCellsContain: FC<DeleteCellsContainModalProps> = (props) => {
    return (
        <div className={classes.loadingHandlerContainer}>
            <div className={classes.loadingHandlerHeader}>
                Вы действительно хотите удалить запись {props.id}
            </div>
            <a onClick={() => props.handleClickYes()}>Да, удалить!</a>
            <a onClick={() => props.handleClickNo()}>Ой, не надо!</a>

        </div>
    )
}

export default DeleteCellsContain;