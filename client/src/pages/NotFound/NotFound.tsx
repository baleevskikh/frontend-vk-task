import React from 'react'
import styles from "./NotFound.module.css"
import logo from "../../assets/logo.svg"
import {ButtonLink} from "../../ui/Button";

export const NotFound = () => {
    return (
        <div className={styles.NotFound}>
            <div className={styles.NotFound__content}>
                <div className={styles.NotFound__logo}>
                    <img src={logo} alt="logo"/>
                </div>
                <h1 className={styles.NotFound__title}>Кажется, этой страницы не существует</h1>
                <ButtonLink to={'/'} stretched>На главную</ButtonLink>
            </div>
        </div>
    )
}