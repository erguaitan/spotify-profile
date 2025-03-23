import React, { useEffect, useState } from 'react'
import { useDataStore } from '../../lib/useDataStore';

const SkeletonPlaylistsSection = () => {
  const skeletonLists = Array(5).fill(null);
  const { currentResolution } = useDataStore();

  const [widthCard, setWidthCard] = useState('')

  useEffect(() => {
    if (currentResolution == "mobile") {
      setWidthCard("max-w-30 p-1 pb-2 rounded-lg")
    } else if (currentResolution == "tablet-v") {
      setWidthCard("max-w-40 p-2 pb-4 rounded-2xl")
    } else {
      setWidthCard("max-w-50 p-2 pb-4 rounded-2xl")
    }

  }, [currentResolution]);

  return (
    <section className="col-span-2 flex flex-col h-full px-10 py-10 overflow-auto gap-y-6">
      <div className='skeleton bg-[#400073]/10 w-80 max-w-1/1 text-3xl font-bold min-h-8'></div>
      <div className='flex flex-row w-full justify-start'>
        <button
          className="skeleton bg-[#400073]/10 px-3 py-1 w-30 max-w-1/1 text-xs h-7"
        ></button>
      </div>
      <div className={`gap-y-2 gap-x-1 grid grid-cols-[repeat(auto-fit,minmax(${currentResolution == "mobile" ? "5rem" : currentResolution == "tablet-v" ? "7.5rem" : "10rem"},1fr))] w-full justify-center`}>
        {
          skeletonLists.map((_, index) => (
            <div
              key={index}
              className={`min-h-0 ${widthCard}`}
            >
              <div className='skeleton bg-[#400073]/10 rounded-lg w-full aspect-square'></div>
              <div className='skeleton bg-[#400073]/10 mt-1 h-4.5 w-[80%]'></div>
              <div className='skeleton bg-[#400073]/10 mt-1 h-3.5 w-[40%]'></div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default SkeletonPlaylistsSection
