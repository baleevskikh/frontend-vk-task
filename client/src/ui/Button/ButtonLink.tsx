import React, {FC, PropsWithChildren} from 'react'
import {Link, LinkProps} from "react-router-dom"
import styles from './Button.module.css'
import clsx from 'clsx'
import {UIButtonProps} from "./Button";

interface ButtonLinkProps extends LinkProps, UIButtonProps {}

export const ButtonLink: FC<PropsWithChildren<ButtonLinkProps>> = (
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
        <Link
            className={clsx(
                styles.Button,
                styles[`Button--${mode}`],
                styles[`Button--${size}`],
                stretched && styles['Button--stretched'],
                disabled || (loading && styles['Button--s']),
                loading && styles.loading,
                className
            )}
            {...restProps}
        >
            {children}
        </Link>
    )
}