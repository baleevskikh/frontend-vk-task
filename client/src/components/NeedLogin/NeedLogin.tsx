import React from 'react'
import styles from './NeedLogin.module.css'
import {ButtonLink} from "../../ui/Button";
import clsx from "clsx";

export const NeedLogin = () => {
    return (
        <div className={styles.NeedLogin__wrapper}>
            <div className={clsx('container', styles.NeedLogin)}>
                <div className={styles.NeedLogin__text}>
                    <p>Будьте в курсе событий</p>
                    <span>Пользователи Ghost узнают новости первыми.</span>
                </div>
                <div className={styles.NeedLogin__links}>
                    <ButtonLink className={styles['Button--login']} mode={'custom'} to={'login'}>Войти</ButtonLink>
                    <ButtonLink mode={'secondary'} to={'join'}>Зарегистрироваться</ButtonLink>
                </div>
            </div>
        </div>
    )
}