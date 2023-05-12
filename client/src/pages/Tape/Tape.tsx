import React, {useContext, useEffect, useState} from 'react'
import {Header} from "../../components/Header";
import {IPost} from "../../models/IPost";
import {PostForm} from "../../components/PostForm";
import {Context} from "../../index";
import {InfinityTape} from "../../components/InfinityTape";

export const Tape = () => {

    const {store} = useContext(Context)

    return (
        <>
            <Header title={'Лента'}/>
            {store.isAuth && <PostForm/>}
            <InfinityTape/>
        </>
    )
}