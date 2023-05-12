import React, {FC, PropsWithChildren} from 'react'
import styles from './Placeholder.module.css'

export const Placeholder: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.Placeholder}>
            {children}
        </div>
    )
}