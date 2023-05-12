import React, {useEffect, useState} from 'react'
import UserService from "../../services/UserService";
import {IUser} from "../../models/IUser";
import {List} from "../List";
import {FriendItem} from "../FriendItem";
import {Preloader} from "../Preloader";
import {Placeholder} from "../Placeholder";

export const FriendsList = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        UserService.getFriends().then(response => {
            setUsers(response.data)
        }).catch(error => {
        }).finally(() => setIsLoading(false))
    }, [])

    if (isLoading) return <Preloader/>

    return (
        <>
            {users.length === 0 && <Placeholder>У вас нет друзей</Placeholder>}
            <List items={users} renderItem={(user: IUser) => <FriendItem user={user} key={user.id}/>}/>
        </>
    )
}