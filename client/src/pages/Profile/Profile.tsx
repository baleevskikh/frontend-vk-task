import React, {useContext} from 'react';
import {Header} from "../../components/Header";
import {Context} from "../../index";
import {ProfileBlock} from "../../components/ProfileBlock";
import {PostForm} from "../../components/PostForm";
import {useParams} from "react-router-dom";
import {PostsList} from "../../components/PostsList";

export const Profile = () => {
    const {store} = useContext(Context)
    const {username} = useParams()

    return (
        <>
            <Header title={`@${username}`}/>
            {username && <ProfileBlock username={username} owner={username === store.user.username}/>}
            {store.user.username === username && <PostForm/>}
            {username && <PostsList username={username}/>}
        </>
    )
}