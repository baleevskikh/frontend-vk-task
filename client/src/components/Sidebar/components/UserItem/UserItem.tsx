import React, {HTMLAttributes} from 'react';
import styles from './UserItem.module.css'
import {Icon16MoreHorizontal} from '@vkontakte/icons'
import {Avatar} from "../../../../ui/Avatar";

interface UserItemProps extends HTMLAttributes<HTMLDivElement> {
    name: string
    username: string
    avatar: string
}

export const UserItem = ({name, username, avatar, ...restProps}: UserItemProps) => {
    return (
        <div className={styles.UserItem__wrapper} {...restProps}>
            <div className={styles.UserItem}>
                <Avatar className={styles.UserItem__avatar} username={name} size={40} src={avatar}/>
                <div className={styles.UserItem__info}>
                    <span className={styles.UserItem__name}>{name}</span>
                    <br/>
                    <span className={styles.UserItem__username}>@{username}</span>
                </div>
                <div className={styles.UserItem__action_icon}>
                    <Icon16MoreHorizontal/>
                </div>
            </div>
        </div>
    )
}