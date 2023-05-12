import React from 'react';
import {Header} from "../../components/Header";
import {EditProfileForm} from "../../components/EditProfileForm";

export const EditProfile = () => {
    return (
        <>
            <Header back title={'Редактирование профиля'}/>
            <EditProfileForm/>
        </>
    )
}