import React, {FC, useEffect, useState} from 'react';
import PostService from "../../services/PostService";
import {Preloader} from "../Preloader";
import {IPost} from "../../models/IPost";
import {List} from "../List";
import {Post} from "../Post";
import {Placeholder} from "../Placeholder";


export const InfinityTape: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {

    }, [])

    if (isLoading) return <Preloader/>

    return (
        <>
            {posts.length === 0 && <Placeholder>Постов нет</Placeholder>}
            <List items={posts} renderItem={(post: IPost) => <Post post={post} key={post._id}/>}/>
        </>
    )
}