import React from 'react'

const CloseAside = ({ color = "currentColor", handleOpenAside, size }) => {
  return (
    <svg onClick={() => handleOpenAside(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${size} cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
  )
}

export default CloseAside
