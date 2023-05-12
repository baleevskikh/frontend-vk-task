import React, {FC, PropsWithChildren} from 'react'
import styles from './NavItem.module.css'
import clsx from "clsx"
import {Link, LinkProps, useMatch} from "react-router-dom";

export const NavItem: FC<PropsWithChildren<LinkProps>> = ({children, ...restProps}) => {
    const match = useMatch(String(restProps.to))
    return (
        <li>
            <Link
                className={clsx(
                    styles.NavItem,
                    match && styles['NavItem--active']
                )}
                {...restProps}
            >
                {children}
            </Link>
        </li>
    )
}
