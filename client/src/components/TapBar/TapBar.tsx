import React, {useContext} from 'react';
import styles from './TapBar.module.css'
import {Icon28ArticleOutline, Icon28UserOutline, Icon28UsersOutline, Icon28Search} from '@vkontakte/icons'
import {NavItem} from "./components/NavItem";
import {Context} from "../../index";

export const TapBar = () => {
    const {store} = useContext(Context)
    return (
        <div className={styles.TapBar}>
            <NavItem to={'/'}><Icon28ArticleOutline/></NavItem>
            <NavItem to={'/friends'}><Icon28UsersOutline/></NavItem>
            <NavItem to={'/peoples'}><Icon28Search/></NavItem>
            <NavItem to={`/profile/${store.user.username}`}><Icon28UserOutline/></NavItem>
        </div>
    )
}