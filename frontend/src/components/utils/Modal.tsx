import React from 'react';
import classes from "../../styles/Modal.module.css";

interface ModalProps{
    children: React.ReactChild;
    visible: boolean;
}

const Modal:React.FC<ModalProps> = ( {children, visible }):JSX.Element => {

    const rootClasses = [classes.modalContainer];

    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={classes.loadingHandlerContent}>
                     {children}
            </div>
        </div>
    );
};

export default Modal;