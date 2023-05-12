import React from 'react'
import {Header} from "../../components/Header";
import {FriendsList} from "../../components/FriendsList";

export const Friends = () => {
    return (
        <>
            <Header title={'Друзья'}/>
            <FriendsList/>
        </>
    )
}