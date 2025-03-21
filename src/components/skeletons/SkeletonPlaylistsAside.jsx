import React from 'react'
import CloseAside from '../icons/CloseAside'

const SkeletonPlaylistsAside = ({ handleOpenAside }) => {
  return (
    <aside className="bg-[#400073]/7 flex flex-col h-full overflow-auto py-4 px-6">

      <span className='flex flex-col h-fit'>
        <div className="flex flex-row justify-between items-center w-full">
          <div className='skeleton size-6 rounded-4xl bg-[#400073]/10'></ div>
          <div className='skeleton bg-[#400073]/10 h-3.5 w-24'></div>
          <CloseAside color={"#400073"} size={"size-6"} handleOpenAside={handleOpenAside} />
        </div>
        <div className="mt-4 flex flex-col">
          <div className='rounded-lg w-full aspect-square skeleton bg-[#400073]/10'>
          </div>
          <div className='skeleton bg-[#400073]/10 h-6 w-2/3 mt-2'></div>
          <div className='skeleton bg-[#400073]/10 h-4 w-1/3 mt-1'></div>
        </div>
        <div className="flex flex-col mt-4 mb-2 gap-4">
          <div className='flex flex-col'>
            <div className='skeleton bg-[#400073]/10 h-3 w-3/3 mt-1'></div>
            <div className='skeleton bg-[#400073]/10 h-3 w-2/3 mt-1'></div>
          </div>
          <div className='skeleton bg-[#400073]/10 h-4 w-1/3 mt-1'></div>
        </div>
      </span>
      <div className='flex flex-col overflow-auto'>
        {
          (Array(3).fill(null)).map((_, index) => (
            <div key={index} className='flex flex-row py-1 h-13 w-full gap-2'>
              <div className='skeleton bg-[#400073]/10 h-full aspect-square'></div>
              <span className='flex flex-col w-full'>
                <div className='skeleton bg-[#400073]/10 h-4.5 w-2/3 mt-1'></div>
                <div className='skeleton bg-[#400073]/10 h-3 w-1/3 mt-1'></div>
              </span>
            </div>
          ))
        }

      </div>
    </aside>
  )
}

export default SkeletonPlaylistsAside
