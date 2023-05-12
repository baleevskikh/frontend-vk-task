import React, {FC, HTMLAttributes} from 'react'
import styles from './Preloader.module.css'
import {Spinner} from "../../ui/Spinner";

export const Preloader: FC<HTMLAttributes<HTMLDivElement>> = ({...restProps}) => {
    return (
        <div {...restProps} className={styles.Preloader}>
            <Spinner/>
        </div>
    )
}