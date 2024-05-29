import React, { useMemo, useState } from "react";
import classes from "../../styles/Login.module.css"
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from "../utils/Modal";
import LoadingHandler from "../utils/LoadingHandler";
import { useEffect } from 'react';

const Login: React.FC = (): JSX.Element => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [regPage, setRegPage] = useState(false)

    const { register, login, clearMessage } = useActions()
    const { loading } = useTypedSelector(state => state.auth)
    const { message } = useTypedSelector(state => state.msg)



    useEffect(() => {
        clearMessage()
    }, [regPage])

    const changePage = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setRegPage(!regPage)
    }

    return (
        <div className={classes.loginContainer}>
            <Modal visible={loading}><LoadingHandler /></Modal>
            <div className={classes.loginSubcontainer}>
                <div className={classes.loginHeader}>
                    {regPage ? "Зарегистрироваться" : "Войти"}
                </div>
                <div className={classes.loginItem}>
                    {regPage &&
                        <input
                            className={classes.loginInput}
                            type="text"
                            placeholder="Введите имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    }
                </div>
                <div className={classes.loginItem}>
                    <input
                        className={classes.loginInput}
                        type="text"
                        placeholder="Введите почту"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={classes.loginItem}>
                    <input
                        className={classes.loginInput}
                        type="password"
                        autoComplete="true"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={classes.loginItem}>
                    <button
                        className={classes.loginButton}
                        onClick={
                            regPage ? () => register(name, email, password) : () => login(email, password)
                        }
                    >{regPage ? "Создать пользователя и войти" : "Войти"}</button>
                </div>
                <div className={classes.loginItem}>
                    {regPage
                        ?
                        <a href="#" onClick={(e) => changePage(e)} className={classes.loginLink}>Есть аккаунт? Войти</a>
                        :
                        <a href="#" onClick={(e) => changePage(e)} className={classes.loginLink}>Нет аккаунта? Зарегистрироваться</a>
                    }
                </div>
                <div className={classes.loginItem}>
                    <span className={classes.loginMessage}>{message}</span>
                </div>
            </div>
        </div >

    )
}

export default Login;