import * as React from 'react';
import { Icon16Spinner, Icon24Spinner, Icon32Spinner, Icon44Spinner } from '@vkontakte/icons';
import styles from './Spinner.module.css';
import clsx from "clsx";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: 'sm' | 'rg' | 'md' | 'lg'
}

export const Spinner = React.memo(
    ({
         size = 'rg',
         'aria-label': ariaLabel = 'Загружается...',
         className,
         ...restProps
     }: SpinnerProps) => {
        const SpinnerIcon = {
            sm: Icon16Spinner,
            rg: Icon24Spinner,
            md: Icon32Spinner,
            lg: Icon44Spinner,
        }[size];

        return (
            <span
                role="status"
                aria-label={ariaLabel}
                {...restProps}
                className={clsx(styles['Spinner'], className)}
            >
        <SpinnerIcon className={styles['Spinner__self']} />
      </span>
        )
    },
)