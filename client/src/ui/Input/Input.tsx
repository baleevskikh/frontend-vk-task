import React, {FC, InputHTMLAttributes} from 'react'
import styles from './Input.module.css'
import clsx from 'clsx'
import {FieldValues, UseFormRegister} from "react-hook-form";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    className?: string
    size?: 'sm' | 'md' | 'lg'
    error?: boolean
    stretched?: boolean
    label?: boolean
    register: UseFormRegister<FieldValues>
    validationSchema?: any
    name: string
}

export const Input: FC<InputProps> = (
    {
        className,
        size = 'md',
        error = false,
        stretched,
        placeholder,
        label = false,
        register,
        validationSchema,
        name,
        ...restProps
    }) => {

    return (
        <div
            className={clsx(
                styles.Input,
                error && styles['Input--error'],
                stretched && styles['Input--stretched'],
                styles[`Input--${size}`],
                className
            )}
        >
            <input
                className={styles.Input__input}
                placeholder={label ? ' ' : placeholder}
                {...register(name, validationSchema)}
                {...restProps}
            />
            <div className={styles.Input__border}/>
            {label && (
                <label htmlFor={name} className={styles.Input__label}>
                    {placeholder}
                </label>
            )}
        </div>
    )
}
