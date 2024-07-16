import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import {Footer, Header} from "./common/HeaderAndFooter";
import {RequireAuth, RequireUnAuth} from './common/Common';
import {Home} from './common/Home'
import {Login} from './pages/Login';
import {Logout} from "./pages/Logout";
import {Register} from './pages/Register';
import {Admin} from './pages/Admin';
import {useState} from 'react';
import CreateAds from "./pages/User/create/Create";
import ViewAds from "./pages/User/view/view";
import {ViewUserAds} from "./pages/User/userview/userview"
import {UpdateUserAds} from "./pages/User/update/UpdateDelete"
import  {MessagesPage} from "./pages/User/Messages"
import {ChatPage} from "./pages/User/Chats"
const Router = createBrowserRouter([
    {
        path: '/auth',
        element: (
            <>
                <Header/>
                <RequireUnAuth><Login/></RequireUnAuth>
                <Footer/>
            </>
        )
    },
    {
        path: '/admin',
        element: (
            <>
                <Admin/>
            </>
        )
    },
    {
        path: '/',
        element: (
            <>
                <Header/>
                <RequireAuth><Home/></RequireAuth>
                <Footer/>
            </>
        )
    },
    {
        path: '/logout',
        element: (
            <>
                <Logout/>
            </>
        )
    },
    {
        path: '/register',
        element: (
            <>
                <Header/>
                <RequireUnAuth><Register/></RequireUnAuth>
                <Footer/>
            </>
        )
    },
    {
        path: '/createads',
        element: (
            <>
                <Header/>
                <RequireAuth><CreateAds/></RequireAuth>
                <Footer/>
            </>
        )
    },
    {
        path: '/viewads',
        element: (
            <>
                <Header/>
                <RequireAuth><ViewAds/></RequireAuth>
                <Footer/>
            </>
        )
    },    {
        path: '/viewuserads',
        element: (
            <>
                <Header/>
                <RequireAuth><ViewUserAds/></RequireAuth>
                <Footer/>
            </>
        )
    }, {
        path: '/updateuserads/:ad_id',
        element: (
            <>
                <Header/>
                <RequireAuth><UpdateUserAds/></RequireAuth>
                <Footer/>
            </>
        )
    },{
        path: '/chats/:chat_id',
        element: (
            <>
                <Header/>
                <RequireAuth><ChatPage/></RequireAuth>
                <Footer/>
            </>
        )
    },{
        path: '/chats',
        element: (
            <>
                <Header/>
                <RequireAuth><MessagesPage/></RequireAuth>
                <Footer/>
            </>
        )
    },
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={Router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();