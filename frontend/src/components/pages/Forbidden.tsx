import React from "react";

import classes from "../../styles/Page.module.css"

const Forbidden: React.FC = (): JSX.Element => {
    return (
        <div className={classes.centeredMessage}>
            <div className={classes.pageSubHeader}>
                <div>Страница не найдена или            </div>
                <div>Ваших прав недостаточно для просмотра</div>
            </div>
        </div>
    )
}

export default Forbidden;