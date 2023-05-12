import React from 'react'
import {Header} from "../../components/Header"
import {PeoplesList} from "../../components/PeoplesList"

export const Peoples = () => {
    return (
        <>
            <Header title={'Люди'}/>
            <PeoplesList/>
        </>
    )
}