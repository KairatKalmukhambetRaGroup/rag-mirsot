import React from "react";
import "./i18n";

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from "./components/Home/Home";
import Header from "./components/subcomponents/Header/Header";
import About from "./components/About/About";
import Login from "./components/Admin/Login/Login";
import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Admin/Dashboard/Dashboard";


const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<>
                    <Header />
                    <Outlet/> 
                </>}>
                    <Route path="" exact element={<Home />}/>
                    <Route path="about" exact element={<About />}/>
                </Route>
                <Route path="/admin" element={<>
                    <Outlet />
                </>}>
                    <Route path="" element={<Admin />}>
                        <Route path="" element={<Dashboard />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
