import React, {FC} from 'react'
import {useNavigate} from "react-router-dom"
import styles from './Header.module.css'
import {Icon24Back} from '@vkontakte/icons';

interface HeaderProps {
    title: string
    back?: boolean
}

export const Header: FC<HeaderProps> = ({title, back}) => {
    const navigate = useNavigate()

    return (
        <div className={styles.Header}>
            {back &&
                <button onClick={() => navigate(-1)} className={styles.Header__back_button}>
                    <Icon24Back/>
                </button>
            }
            <h1>{title}</h1>
        </div>
    )
}