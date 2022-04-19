import React from "react";
import classes from "./Page.module.css"
import { Link } from 'react-router-dom';


const Home: React.FC = (): JSX.Element => {
    return (
        <div className={classes.centeredMessage}>
            <Link
                        to={{
                            pathname:"/boils",
                            
                            
                        }}
                        style={{color:"white"}}
                        />
            Добро пожаловать!
        </div>
    )
}

export default Home;