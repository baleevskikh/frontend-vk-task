import React, {ChangeEvent, useState} from 'react'
import styles from './PeoplesList.module.css'
import {Icon24Search} from '@vkontakte/icons';
import {Spinner} from "../../ui/Spinner";
import UserService from "../../services/UserService";
import {IUser} from "../../models/IUser";
import {FriendItem} from "../FriendItem";
import {List} from "../List";
import {Placeholder} from "../Placeholder";

export const PeoplesList = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<IUser[]>([])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        UserService.searchUsers(e.target.value).then(response => {
            setUsers(response.data)
        }).catch(error => {
        }).finally(() => setIsLoading(false))
    }

    return (
        <>
            <div className={styles.PeoplesList}>
                <div className={styles.PeoplesList__input_wrapper}>
                    {!isLoading && <Icon24Search className={styles.PeoplesList__input_icon}/>}
                    {isLoading && <Spinner className={styles.PeoplesList__input_icon} size={'rg'}/>}
                    <input
                        onChange={handleChange}
                        className={styles.PeoplesList__input}
                        placeholder={'Начните вводидь запрос'}
                        type="text"
                    />
                </div>
            </div>
            {users.length === 0 && <Placeholder>Начните вводить запрос</Placeholder>}
            <List items={users} renderItem={(user: IUser) => <FriendItem user={user} key={user.id}/>}/>
        </>
    )
}