import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import {Footer, Header} from "./common/HeaderAndFooter";

const Router = createBrowserRouter([
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
        path: '/auth',
        element: (
            <>
                <Header/>
                <Login/>
                <Footer/>
            </>
        )
    }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
