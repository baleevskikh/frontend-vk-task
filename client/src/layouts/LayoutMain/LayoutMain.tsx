import React, {useContext} from 'react'
import {Sidebar} from "../../components/Sidebar";
import {Outlet} from "react-router-dom";
import {NeedLogin} from "../../components/NeedLogin";
import {Context} from "../../index";
import {TapBar} from "../../components/TapBar";



export const LayoutMain = () => {
    const {store} = useContext(Context)
    return (
        <div className={'container'}>
            <Sidebar/>
            <main className={'page_body'}>
                <Outlet/>
            </main>
            {!store.isAuth && <NeedLogin/>}
            {store.isAuth && <TapBar/>}
        </div>
    )
}