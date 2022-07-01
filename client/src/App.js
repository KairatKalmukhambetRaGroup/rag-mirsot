import React from "react";

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from "./components/Home/Home";
import Header from "./components/subcomponents/Header/Header";
import About from "./components/About/About";
import Login from "./components/Admin/Login/Login";
import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Pages from "./components/Admin/Pages/Pages";
import Footer from "./components/subcomponents/Footer/Footer";
import Subpage from "./components/Subpage/Subpage";


const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<>
                    <Header />
                    <Outlet/> 
                    <Footer />
                </>}>
                    <Route path="" exact element={<Home />}/>
                    <Route path="about" exact element={<About />}/>
                    {["directions", "services"].map((path, index) => (
                        <Route path={path} key={index}>
                            <Route path=":pagename" element={<Subpage parent={path} /> } />
                        </Route>
                    ))}
                </Route>
                <Route path="/admin" element={<>
                    <Outlet />
                </>}>
                    <Route path="" element={<Admin />}>
                        <Route path="" element={<Dashboard />} />
                        <Route path=":pagename" element={<Pages />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
