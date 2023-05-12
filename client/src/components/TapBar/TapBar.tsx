import React from 'react';
import styles from './TapBar.module.css'
import {Icon28ArticleOutline, Icon28UserOutline, Icon28UsersOutline, Icon28MessageOutline} from '@vkontakte/icons'
import {NavItem} from "./components/NavItem";

export const TapBar = () => {
    return (
        <div className={styles.TapBar}>
            <NavItem to={'/'}><Icon28ArticleOutline/></NavItem>
            <NavItem to={'/messages'}><Icon28MessageOutline/></NavItem>
            <NavItem to={'/friends'}><Icon28UsersOutline/></NavItem>
            <NavItem to={'/profile'}><Icon28UserOutline/></NavItem>
        </div>
    )
}