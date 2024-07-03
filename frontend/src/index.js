import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import {Footer, Header} from "./common/HeaderAndFooter";
import {RequireAuth} from './common/Common';
import {Home} from './common/Home'
import {Login} from './pages/Login';
import {Logout} from "./pages/Logout";

const Router = createBrowserRouter([
    {
        path: '/auth',
        element: (
            <>
                <Header/>
                <Login/>
                <Footer/>
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
    }, {
        path: '/logout',
        element: (
            <>
                <Logout/>
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
