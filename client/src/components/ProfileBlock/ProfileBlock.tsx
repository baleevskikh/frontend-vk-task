import React, {FC, useContext, useEffect, useState} from 'react';
import styles from "./ProfileBlock.module.css";
import {format} from 'date-fns'
import {Avatar} from "../../ui/Avatar";
import {ButtonLink} from "../../ui/Button";
import {IUserFull} from "../../models/IUser";
import UserService from "../../services/UserService";
import {Preloader} from "../Preloader";
import {Navigate} from "react-router-dom";
import {pluralize} from "../../utils/utils";
import {Context} from "../../index";
import {ToggleFriendButton} from "../ToggleFriendButton";
import {Icon20CakeOutline, Icon20LocationMapOutline} from '@vkontakte/icons';

interface ProfileBlockProps {
    username: string
    owner: boolean
}

export const ProfileBlock: FC<ProfileBlockProps> = ({username, owner}) => {

    const {store} = useContext(Context)

    const [user, setUser] = useState<IUserFull>()

    useEffect(() => {
        UserService.getUserByUsername(username).then(response => {
            setUser(response.data)
        }).catch(error => {
        })
    }, [])

    if (!username) return <Navigate to={'/'}/>

    if (!user?.username) return <Preloader style={{height: 175}}/>

    return (
        <div className={styles.ProfileBlock}>
            <Avatar className={styles.ProfileBlock__avatar} size={142} username={user.name} src={user.avatar}/>
            <div className={styles.ProfileBlock__grid}>
                <h2 className={styles.ProfileBlock__name}>
                    {user.name}
                    <br/>
                    <span>@{user.username}</span>
                </h2>
                {store.isAuth && <>
                    {!owner &&
                        <ToggleFriendButton userId={user.id} friendStatus={user.friendStatus} size={'sm'}/>
                    }
                    {owner &&
                        <ButtonLink to={'/edit-profile'} size={'sm'} mode={'bordered'}
                                    className={styles.ProfileBlock__button}>
                            Редактировать
                        </ButtonLink>
                    }
                </>}
                <div className={styles.ProfileBlock__bio}><p>{user.bio}</p></div>
                <div className={styles.ProfileBlock__other}>
                    <p className={styles.ProfileBlock__other_item}>
                        <Icon20LocationMapOutline/>
                        {user.city ? user.city : 'Не указан'}
                    </p>
                    <p className={styles.ProfileBlock__other_item}>
                        <Icon20CakeOutline/>
                        {user.birthday ? format(new Date(user.birthday), 'dd.MM.yyyy') : 'Не указана'}
                    </p>
                </div>
                <div className={styles.ProfileBlock__info}>
                    <div className={styles.ProfileBlock__info_item}>
                        <span>{user.posts} </span> {pluralize(user.posts, 'пост', 'поста', 'постов')}
                    </div>
                    <div className={styles.ProfileBlock__info_item}>
                        <span>{user.friends} </span> {pluralize(user.friends, 'друг', 'друга', 'друзей')}
                    </div>
                    <div className={styles.ProfileBlock__info_item}>
                        <span>{user.subscribers} </span> {pluralize(user.subscribers, 'подписчик', 'подписчика', 'подписчиков')}
                    </div>
                </div>
            </div>
        </div>
    )
}