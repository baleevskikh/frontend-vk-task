import React, {FC, useState} from 'react';
import styles from './FriendItem.module.css'
import {Avatar} from "../../ui/Avatar";
import {IUser} from "../../models/IUser";

import {ToggleFriendButton} from "../ToggleFriendButton";
import {useNavigate} from "react-router-dom";

interface FriendItemProps {
    user: IUser
}

export const FriendItem: FC<FriendItemProps> = ({user}) => {

    const navigate = useNavigate();

    function handleClick() {
        navigate(`/profile/${user.username}`);
    }

    return (
        <div className={styles.FriendItem}>
            <div onClick={handleClick} className={styles.FriendItem__info_wrapper}>
                <Avatar size={48} username={user.name}/>
                <p className={styles.FriendItem__info}>{user.name} <br/><span>{user.username}</span></p>
            </div>
            <ToggleFriendButton userId={user.id} friendStatus={user.friendStatus} size={'sm'}/>
        </div>
    )
}