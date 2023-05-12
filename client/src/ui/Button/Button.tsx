import React, {ButtonHTMLAttributes, FC, PropsWithChildren} from 'react'
import styles from './Button.module.css'
import clsx from 'clsx'
import {Spinner} from "../Spinner";

export interface UIButtonProps {
    className?: string
    mode?: 'default' | 'primary' | 'secondary' | 'bordered' | 'custom'
    size?: 'sm' | 'md' | 'lg'
    stretched?: boolean
    loading?: boolean
    disabled?: boolean
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, UIButtonProps {}

export const Button: FC<PropsWithChildren<ButtonProps>> = (
    {
        className,
        mode = 'default',
        size = 'md',
        stretched = false,
        children,
        disabled = false,
        loading = false,
        ...restProps
    }) => {
    return (
        <button
            className={clsx(
                styles.Button,
                styles[`Button--${mode}`],
                styles[`Button--${size}`],
                stretched && styles['Button--stretched'],
                (disabled || loading) && styles['Button--disabled'],
                loading && styles['Button--loading'],
                className
            )}
            {...restProps}
        >
            <span>{children}</span>
            {loading && <Spinner className={styles.Button__spinner} size={'rg'}/>}
        </button>
    )
}