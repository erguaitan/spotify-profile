import React from 'react'
import { redirectToAuthCodeFlow } from '../lib/auth'

const Login = () => {
  localStorage.clear();

  const handleAuthClick = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    redirectToAuthCodeFlow(clientId);
  }

  return (
    <section className='col-span-3 flex flex-col justify-center items-center h-full w-full bg-[#400073]/10'>
      <button onClick={handleAuthClick} className='flex flex-row gap-4 bg-[#400073] h-17 justify-between items-center rounded-4xl py-2 pl-2 pr-6 cursor-pointer'>
        <img src='/icon_logo_white_spotify.svg' alt='Small Spotify Logo' className='h-full w-auto' />
        <p className='text-2xl text-white font-bold'>Autenticar con Spotify</p>
      </button>
    </section>
  )
}

export default Login
