import React from 'react'

const PlaylistCard = ({ id, href_list, name, name_owner, href_owner, images, handleOpenAside }) => {
  return (
    <div
      onClick={() => handleOpenAside(true, id)}
      className="rounded-2xl p-2 pb-4 hover:bg-[#400073]/10 min-h-0 w-50 transition duration-300 cursor-pointer hover:shadow-[2px_2px_0px_#400073]"
    >
      <div className='rounded-lg size-46'>
        {
          images != null ?
            <img
              src={images[0].url}
              alt='Playlist Img'
              className='object-cover object-center w-full h-full rounded-xl'
            /> :
            <div className='size-full rounded-xl bg-black/20'></div>
        }
      </div>
      <h3 className='pl-2 mt-1 text-lg font-semibold text-black/80 line-clamp-2 leading-6'>
        <a href={href_list} target='_blank' rel="noopener noreferrer" className='hover:underline decoration-2 decoration-black/80 transition duration-300'>
          {name}
        </a>
      </h3>
      <h6 className='pl-2 text-sm text-black/50 font-semibold'>
        <a href={href_owner} target='_blank' rel="noopener noreferrer" className='hover:underline decoration-2 transition duration-300'>
          {name_owner}
        </a>
      </h6>
    </div>
  )
}

export default PlaylistCard
