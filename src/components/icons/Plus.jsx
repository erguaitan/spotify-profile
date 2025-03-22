import React from 'react'

const Plus = ({size="size-24", color="currentColor", strokeWidth="2"}) => {
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke={color}  strokeWidth={strokeWidth}  strokeLinecap="round"  strokeLinejoin="round"  className={`${size} icon icon-tabler icons-tabler-outline icon-tabler-plus`}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
  )
}

export default Plus
