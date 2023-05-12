import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import './styles/main.css';
import App from './App';
import Store from "./store/store";

interface State {
    store: Store
}

export const store = new Store()

export const Context = createContext<State>({
    store
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <BrowserRouter>
        <Context.Provider value={{store}}>
            <App/>
        </Context.Provider>
    </BrowserRouter>
)