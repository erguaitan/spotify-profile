import React from 'react'
import { useDataStore } from '../lib/useDataStore'

const Header = () => {
  const { ownerData, isTokenLoading, token } = useDataStore();

  return (
    <header className='col-span-3 row-span-1 bg-[#400073] py-3 px-6 flex flex-row justify-between'>
      <a href="https://developer.spotify.com/" target='_blank' rel="noopener noreferrer">
        <img
          src='/full_logo_white_spotify.svg'
          alt='Spotify Logo'
          className='h-full w-auto'
        />
      </a>
      {
        (Object.keys(ownerData).length !== 0 && !isTokenLoading && token) &&
        <div className='flex flex-row h-full w-auto p-1 pr-4 max-w-40 bg-[#D7DBFF] rounded-4xl items-center'>
          <img
            src={ownerData.images[0].url}
            alt='User Logo'
            className='h-full rounded-4xl'
          />
          <a
            href={ownerData.external_urls.spotify}
            target='_blank' rel="noopener noreferrer"
            className='font-bold text-[#400073]/80 ml-3 line-clamp-1 w-full hover:text-[#400073] cursor-pointer'>{ownerData.display_name}</a>
        </div>
      }
    </header>
  )
}

export default Header
