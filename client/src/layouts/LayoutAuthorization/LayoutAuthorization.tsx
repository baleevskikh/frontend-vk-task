import React from 'react'
import {Link, Outlet} from "react-router-dom";
import styles from './LayoutAuthorization.module.css'
import logo from '../../assets/logo.svg'

export const LayoutAuthorization = () => {
    return (
        <div className={styles.LayoutAuthorization}>
            <div className={styles.LayoutAuthorization__content}>
                <div className={styles.LayoutAuthorization__logo}>
                    <Link to={'/'}>
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
                <Outlet/>
            </div>
        </div>
    )
}
