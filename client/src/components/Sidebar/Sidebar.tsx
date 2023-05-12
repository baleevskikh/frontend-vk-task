import React, {useContext} from 'react'
import {Context} from "../../index"
import styles from './Sidebar.module.css'
import {NavItem} from "./components/NavItem/"
import {
    Icon28Ghost,
    Icon28ArticleOutline,
    Icon28Search,
    Icon28UserOutline,
    Icon28UsersOutline
} from '@vkontakte/icons'
import {UserItem} from "./components/UserItem";
import {observer} from "mobx-react-lite";

export const Sidebar = observer(() => {
    const {store} = useContext(Context)

    const logout = async () => {
        if (window.confirm(`Выйти из аккаунта ${store.user.name}?`)) await store.logout()
    }

    return (
        <header className={styles.Sidebar}>
            <div className={styles.Sidebar__container}>
                <nav className={styles.StickyContainer}>
                    <div className={styles.Sidebar__logo}><Icon28Ghost/></div>
                    <ul>
                        <NavItem to={'/'}>
                            <Icon28ArticleOutline/>
                            Лента
                        </NavItem>
                        {store.isAuth &&
                            <>
                                <NavItem to={'/friends'}>
                                    <Icon28UsersOutline/>
                                    Друзья
                                </NavItem>
                                <NavItem to={'/peoples'}>
                                    <Icon28Search/>
                                    Люди
                                </NavItem>
                                <NavItem to={`/profile/${store.user.username}`}>
                                    <Icon28UserOutline/>
                                    Профиль
                                </NavItem>
                            </>
                        }
                    </ul>
                </nav>

                {store.isAuth &&
                    <UserItem onClick={logout} avatar={store.user.avatar} name={store.user.name}
                              username={store.user.username}/>
                }
            </div>
        </header>
    )
})