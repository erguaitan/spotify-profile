import React, { useEffect, useState } from 'react'
import Playlists from './Playlists'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login';
import { checkAuthUser } from '../lib/auth';

const Layout = () => {
  const [authUser, setAuthUser] = useState(false);

  useEffect(() => {
    setAuthUser(checkAuthUser());

  }, []);

  return (
    <Routes>
      <Route path='/callback' element={<Navigate to="/" />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={authUser ? <Navigate to="/playlists" /> : <Navigate to="/login" />} />
      <Route path='/playlists' element={authUser ? <Playlists /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default Layout
