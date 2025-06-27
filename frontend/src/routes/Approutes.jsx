import React from "react";
import Register from "../screen/Register";
import Login from "../screen/Login";
import Home from "../screen/Home";
import Tag from "../screen/Tag";
import Users from "../screen/Users";
import Questions from "../screen/Questions";
import AskQuestion from "../screen/AskQuestion";
import Profile from "../screen/Profile";
import EditProfile from "../screen/Editprofile";
import { Routes, Route,BrowserRouter } from "react-router-dom";


const AppRoutes = () => {
    return (

            <Routes>
                
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/tag" element={<Tag/>}/>
                <Route path="/questions" element={<Questions/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/AskQuestion" element={<AskQuestion/>}/>
                <Route path="/users/:id" element={<Profile/>}/>
                <Route path="/users/:id/edit" element={<EditProfile />} />
            </Routes>
       
    )
}

export default AppRoutes;