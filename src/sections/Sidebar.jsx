import React from 'react'
import { sideBarOptions } from '../constants/constants'
import LogOut from '../components/icons/LogOut'
import { deleteAllCookies } from '../lib/cookie'
import { useDataStore } from '../lib/useDataStore'

const Sidebar = ({currentOption}) => {
  const {updateDataToken, isSidebarOpen, currentResolution} = useDataStore()

  const handleLogOut = async () => {
    await updateDataToken(false)
    localStorage.clear();
    deleteAllCookies();
    window.location.href = "/login"
  }

  return (
    <nav className={`bg-[#400073]/7 flex flex-col justify-between p-8 overflow-auto ${currentResolution != "desktop" && "col-span-full"} ${!isSidebarOpen && currentResolution != "desktop" && "hidden"}`}>
      <ul className='flex flex-col gap-3'>
        {sideBarOptions.map(({ title, href, className }, index) => (
          <a href={href} key={index}>
            <li className={`${className} ${currentOption === href.slice(1) ? "bg-[#400073]/7 font-semibold" : null}`}>{title}</li>
          </a>
        ))}
      </ul>
      <button onClick={handleLogOut} className='flex flex-row py-3 px-4 space-x-2 hover:bg-[#400073]/7 transition duration-300 rounded-2xl cursor-pointer mt-8'>
        <LogOut color='#400073' />
        <p className='mx-3 text-[#400073]'>Log Out</p>
      </button>
    </nav>
  )
}

export default Sidebar
