import React from 'react'

const Header = () => {
  return (
    <header className='col-span-3 row-span-1 bg-[#400073] py-4 px-6 flex flex-row justify-between'>
      <a href="https://developer.spotify.com/" target='_blank' rel="noopener noreferrer">
        <img
          src='/full_logo_white_spotify.svg'
          alt='Spotify Logo'
          className='h-full w-auto'
        />
      </a>
      <a href='/' className='flex flex-row h-full w-auto p-2 bg-[#D7DBFF] rounded-4xl items-center'>
        <img
          src='https://i.scdn.co/image/ab67757000003b82ac42f6d74095848bbe21fb9a'
          alt='User Logo'
          className='h-full rounded-4xl'
        />
        <p className='font-bold text-[#400073] mx-3'>erguaitan</p>
      </a>
    </header>
  )
}

export default Header
