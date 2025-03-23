import React from 'react'
import { useDataStore } from '../lib/useDataStore'

const Header = () => {
  const { ownerData, isTokenLoading, token, currentResolution, setIsSidebarOpen } = useDataStore();

  const handleOpenSidebar = (e) => {
    setIsSidebarOpen(e.target.checked)
  }

  return (
    <header className='col-span-full row-span-1 bg-[#400073] py-3 px-6 flex flex-row justify-between'>
      <a href="https://developer.spotify.com/" target='_blank' rel="noopener noreferrer">
        <img
          src={currentResolution == "mobile" ? "/icon_logo_white_spotify.svg" : "/full_logo_white_spotify.svg"}
          alt='Spotify Logo'
          className='h-full w-auto'
        />
      </a>
      {
        (Object.keys(ownerData).length !== 0 && !isTokenLoading && token) &&
        <div className={`flex flex-row h-full w-auto ${currentResolution == "desktop" && "p-1 pr-4 max-w-40 bg-[#D7DBFF] rounded-4xl items-center"} `}>
          {
            currentResolution == "desktop" ?
              <>
                <img
                  src={ownerData.images[0].url}
                  alt='User Logo'
                  className='h-full rounded-4xl'
                />
                <a
                  href={ownerData.external_urls.spotify}
                  target='_blank' rel="noopener noreferrer"
                  className='font-bold text-[#400073]/80 ml-3 line-clamp-1 w-full hover:text-[#400073] cursor-pointer'
                >{ownerData.display_name}</a>
              </> :
              <label className="btn btn-circle swap swap-rotate bg-[#D7DBFF] border-0">
                <input onChange={handleOpenSidebar} type="checkbox" />
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 512 512">
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 512 512">
                  <polygon
                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
          }
        </div>
      }
    </header>
  )
}

export default Header
