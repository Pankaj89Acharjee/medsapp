import React, {useEffect} from 'react';
import './App.css';
import { Routes, Route, useNavigate} from 'react-router-dom';
import {Login} from './components';
import Home from './container/Home';
import { fetchUser } from './utils/fetchUser';


const App = () => {
  const navigate = useNavigate();

  useEffect (() => {
    const user = fetchUser();
    if(!user) 
      navigate('/login');
  }, [navigate]);

  return (
    <Routes /*Earlier version it was Switch case, 
    but DOM community renamed it as Routes in latest versions after version 5.0.2*/>
      <Route path = "login" element={<Login />} /*Login Component*/ />
      <Route path  = "/*" element={<Home />} /*Home Component*/ />
    </Routes>
  );
}

export default App;
