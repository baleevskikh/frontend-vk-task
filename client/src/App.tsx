import React, {useContext, useEffect, useState} from 'react';
import {LayoutAuthorization} from "./layouts/LayoutAuthorization";
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginForm, RegistrationForm} from "./components/Authorization";
import {LayoutMain} from "./layouts/LayoutMain";
import {Tape} from "./pages/Tape";
import {Friends} from "./pages/Friends";
import {Profile} from "./pages/Profile";
import {EditProfile} from "./pages/EditProfile";
import {Peoples} from "./pages/Peoples";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import logo from './assets/logo.svg'

const App = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {store} = useContext(Context)

    useEffect(() => {
        (async () => {
            if (localStorage.getItem('accessToken')) await store.checkAuth()
            setIsLoading(false)
        })()
    }, [])

    if (isLoading) {
        return <div className={'splash_screen'}><img src={logo} alt="logo"/></div>
    }

    return (
        <Routes>
            <Route path='*' element={<Navigate to={'/'}/>}/>
            {!store.isAuth &&
                <Route path={'/'} element={<LayoutAuthorization/>}>
                    <Route path={'login'} element={<LoginForm/>}/>
                    <Route path={'join'} element={<RegistrationForm/>}/>
                </Route>
            }
            <Route path={'/'} element={<LayoutMain/>}>
                <Route index element={<Tape/>}/>
                {store.isAuth &&
                    <>
                        <Route path={'friends'} element={<Friends/>}/>
                        <Route path={'edit-profile'} element={<EditProfile/>}/>
                        <Route path={'peoples'} element={<Peoples/>}/>
                        <Route path={'profile/:username'} element={<Profile/>}/>
                    </>
                }
            </Route>
        </Routes>
    )
}

export default observer(App)