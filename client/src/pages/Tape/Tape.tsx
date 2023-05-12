import React, {useContext, useEffect, useState} from 'react'
import {Header} from "../../components/Header";
import {IPost} from "../../models/IPost";
import {PostForm} from "../../components/PostForm";
import {Context} from "../../index";

export const Tape = () => {

    const {store} = useContext(Context)

    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {

    }, [])


    return (
        <>
            <Header title={'Лента'}/>
            {store.isAuth && <PostForm/>}
        </>
    )
}