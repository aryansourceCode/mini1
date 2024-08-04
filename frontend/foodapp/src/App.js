// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from '../src/components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Meal from './pages/meal'
import Logout from './pages/logout'
import './App.css'; // Importing CSS for styling
import Dashboard from './pages/Dashboard';

const App = () => {
    return (
        <Router>
      
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout/>}></Route>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path='/profile' element={<Dashboard/>}></Route>
                    <Route path='/meal' element={<Meal/>}></Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
