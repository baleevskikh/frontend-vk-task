import React, {FC, useEffect, useState} from 'react';
import PostService from "../../services/PostService";
import {Preloader} from "../Preloader";
import {IPost} from "../../models/IPost";
import {List} from "../List";
import {Post} from "../Post";
import {Placeholder} from "../Placeholder";

interface PostsListProps {
    username: string
}

export const PostsList: FC<PostsListProps> = ({username}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        setIsLoading(true)
        PostService.getUserPosts(username).then(response => {
            setPosts(response.data)
        }).catch(error => {
        }).finally(() => setIsLoading(false))
    }, [username])

    if (isLoading) return <Preloader/>

    return (
        <>
            {posts.length === 0 && <Placeholder>Постов нет</Placeholder>}
            <List items={posts} renderItem={(post: IPost) => <Post post={post} key={post._id}/>}/>
        </>
    )
}