import React from "react";
import Register from "../screen/Register";
import Login from "../screen/Login";
import { Routes, Route,BrowserRouter } from "react-router-dom";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/home" element={<div>Home</div>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;