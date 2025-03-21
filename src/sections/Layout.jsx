import React from 'react'
import Playlists from './Playlists'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login';
import { useDataStore } from '../lib/useDataStore';

const Layout = () => {
  const { token } = useDataStore();

  return (
    <Routes>
      <Route path="*" element={token ? <Navigate to="/playlists" /> : <Navigate to="/login" />} />
      <Route path='/callback' element={<Navigate to="/playlists" />} />
      <Route path='/login' element={token ? <Navigate to="/playlists" /> : <Login />} />
      <Route path='/' element={token ? <Navigate to="/playlists" /> : <Navigate to="/login" />} />
      <Route path='/playlists' element={token ? <Playlists /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default Layout
