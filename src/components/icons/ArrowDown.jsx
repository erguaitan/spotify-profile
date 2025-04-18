import React from 'react'

const ArrowDown = ({color= "currentColor", size= "size-24", strokeWidth="2"}) => {
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={strokeWidth}  strokeLinecap="round"  strokeLinejoin="round"  className={`${size} icon icon-tabler icons-tabler-outline icon-tabler-arrow-down`}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M18 13l-6 6" /><path d="M6 13l6 6" /></svg>
  )
}

export default ArrowDown
