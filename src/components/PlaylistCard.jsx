import React, { useEffect, useState } from 'react'
import { useDataStore } from '../lib/useDataStore'

const PlaylistCard = ({ id, href_list, name, name_owner, href_owner, images, handleOpenAside }) => {
  const { currentResolution } = useDataStore();

  const [widthCard, setWidthCard] = useState('')
  const [textSizeListName, setTextSizeListName] = useState('')
  const [textSizeOwnerName, setTextSizeOwnerName] = useState('')
  const [textDecoration, setTextDecoration] = useState('')

  useEffect(() => {
    if (currentResolution == "mobile") {
      setWidthCard("min-w-20 max-w-30 p-1 pb-2 rounded-lg")
      setTextSizeListName("text-sm leading-4")
      setTextSizeOwnerName("text-xs")
      setTextDecoration("decoration-1")
    } else if (currentResolution == "tablet-v") {
      setWidthCard("min-w-30 max-w-40 p-2 pb-4 rounded-2xl")
      setTextSizeListName("text-base leading-5")
      setTextSizeOwnerName("text-sm")
      setTextDecoration("decoration-2")
    } else {
      setWidthCard("min-w-40 max-w-50 p-2 pb-4 rounded-2xl")
      setTextSizeListName("text-lg leading-6")
      setTextSizeOwnerName("text-sm")
      setTextDecoration("decoration-2")
    }

  }, [currentResolution]);

  return (
    <div
      onClick={() => handleOpenAside(true, id)}
      className={`hover:bg-[#400073]/10 min-h-0 flex-1 ${widthCard} transition duration-300 cursor-pointer hover:shadow-[2px_2px_0px_#400073]`}
    >
      <div className='rounded-lg w-full aspect-square'>
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
      <h3 className={`pl-1 mt-1 ${textSizeListName} font-semibold text-black/80 line-clamp-2`}>
        <a href={href_list} target='_blank' rel="noopener noreferrer" className={`hover:underline ${textDecoration} decoration-black/80 transition duration-300`}>
          {name}
        </a>
      </h3>
      <h6 className={`pl-1 ${textSizeOwnerName} text-black/50 font-semibold line-clamp-1`}>
        <a href={href_owner} target='_blank' rel="noopener noreferrer" className={`hover:underline ${textDecoration} transition duration-300`}>
          {name_owner}
        </a>
      </h6>
    </div>
  )
}

export default PlaylistCard
