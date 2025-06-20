import React from "react";
import Register from "../screen/Register";
import Login from "../screen/Login";
import Home from "../screen/Home";
import Tag from "../screen/Tag";
import Users from "../screen/Users";
import Questions from "../screen/Questions";
import AskQuestion from "../screen/AskQuestion";
import { Routes, Route,BrowserRouter } from "react-router-dom";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/tag" element={<Tag/>}/>
                <Route path="/questions" element={<Questions/>}/>
                <Route path="/usr" element={<Users/>}/>
                <Route path="/AskQuestion" element={<AskQuestion/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;