import React, { FC } from 'react'
import styles from './Avatar.module.css'
import clsx from 'clsx'

interface AvatarProps {
    username: string
    src?: string
    size?: number
    rounded?: boolean
    bordered?: boolean
    className?: string
}

export const Avatar: FC<AvatarProps> = ({
    username,
    src = undefined,
    size = 16,
    className
}) => {
    return (
        <>
            {src && (
                <img
                    src={src}
                    alt={username}
                    className={clsx(
                        styles.Avatar,
                        styles['Avatar--image'],
                        className
                    )}
                    width={size}
                    height={size}
                />
            )}
            {!src && (
                <div
                    style={{
                        width: size,
                        height: size,
                        minWidth: size,
                        fontSize: size * 0.5
                    }}
                    className={clsx(
                        styles.Avatar,
                        styles['Avatar--text'],
                        className
                    )}
                >
                    <span>{username[0].toUpperCase()}</span>
                </div>
            )}
        </>
    )
}
