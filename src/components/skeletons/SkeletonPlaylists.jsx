import React from 'react'

const SkeletonPlaylists = () => {
  const skeletonLists = Array(5).fill(null);

  return (
    <section className="col-span-2 flex flex-col h-full px-10 py-10 overflow-auto">
      <div className='skeleton w-80 text-3xl font-bold h-8'></div>
      <div className='flex flex-row w-full justify-start mt-6'>
                <button
                  className="skeleton px-3 py-1 w-30 text-xs  cursor-pointer h-5"
                ></button>
              </div>
      <div className='gap-y-2 gap-x-1 flex flex-row flex-wrap mt-6'>
        {
          skeletonLists.map((_, index) => (
            <div
              key={index}
              className="rounded-2xl p-2 pb-4 min-h-0 w-50"
            >
              <div className='skeleton rounded-lg size-46'></div>
              <div className='skeleton mt-1 h-4.5 w-[80%]'></div>
              <div className='skeleton mt-1 h-3.5 w-[40%]'></div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default SkeletonPlaylists
