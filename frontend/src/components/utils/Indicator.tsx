import classes from "../../styles/Indicator.module.css";
import React from "react";

interface IndicatorProps {
    plan: string | null;
    fact: string | null;
}

const Indicator: React.FC<IndicatorProps> = ({plan, fact}): JSX.Element => {

    const rootClasses = [classes.dot]

    if (plan) {
        if (fact) {
            if (plan === fact) {
                rootClasses.push(classes.success)
            } else {
                rootClasses.push(classes.alert)
            }
        } else {
            rootClasses.push(classes.error)
        }
    } else {
        rootClasses.push(classes.disable)
    }

    return (
        <span className={rootClasses.join(' ')}></span>
    )
}

export default Indicator;





