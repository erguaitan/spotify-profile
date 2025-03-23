import React from 'react'
import { redirectToAuthCodeFlow } from '../lib/auth'
import { useDataStore } from '../lib/useDataStore';

const Login = () => {
  const handleAuthClick = () => {
    redirectToAuthCodeFlow();
  }
  localStorage.clear();

  const {currentResolution} = useDataStore();

  return (
    <section className='col-span-3 flex flex-col justify-center items-center h-full w-full bg-[#400073]/10'>
      <button onClick={handleAuthClick} className='flex flex-row gap-4 bg-[#400073] h-10 mx-3 md:h-17 justify-between items-center rounded-4xl py-2 pl-2 pr-6 cursor-pointer'>
        <img src='/icon_logo_white_spotify.svg' alt='Small Spotify Logo' className='h-full w-auto' />
        <p className='md:text-2xl text-base text-white font-bold'>{currentResolution == "tablet-v" ? "Authenticate" : currentResolution == "mobile" ? "Authenticate" : "Authenticate with Spotify"}</p>
      </button>
    </section>
  )
}

export default Login
