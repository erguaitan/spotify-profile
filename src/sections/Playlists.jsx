import React, { useEffect, useState } from 'react'
import CloseAside from '../components/icons/CloseAside';
import World from '../components/icons/World';
import Sidebar from './Sidebar';
import SkeletonPlaylists from '../components/skeletons/SkeletonPlaylists';
import { useDataStore } from '../lib/useDataStore';
import PlaylistCard from '../components/PlaylistCard';
import { containerSectionClass, headerTextSectionClass } from '../constants/constants';

const Playlists = () => {
  const { isDataLoading, dataPlaylistsFiltered: playlists, updateDataLists, applyFilterPlaylists, changeFilterPlaylists } = useDataStore();
  
  const [isAside, setIsAside] = useState(false);

  const handleOpenAside = () => {
    setIsAside((prev) => (!prev))
  }

  const handleSetApplyFilter = (value) => {
    if (value !== applyFilterPlaylists) {
      changeFilterPlaylists();
    }
  }

  useEffect(() => {
    updateDataLists();
  }, [updateDataLists]);


  return (
    <>
      <Sidebar currentOption={"playlists"} />
      {
        isDataLoading ? <SkeletonPlaylists /> :
          <>
            <section className={`${!isAside ? 'col-span-2' : ''} ${containerSectionClass}`}>
              <h1 className={headerTextSectionClass} >Users's Playlists</h1>
              <div className='flex flex-row w-full justify-start px-3'>
                <button
                  onClick={() => handleSetApplyFilter(false)}
                  className={`px-3 py-1 w-15 ${applyFilterPlaylists ? "bg-[#400073]/30" : "bg-[#400073]"} text-white text-xs border-2 border-r-0 border-[#400073]/50 rounded-l-lg cursor-pointer`}
                >All</button>
                <button
                  onClick={() => handleSetApplyFilter(true)}
                  className={`px-3 py-1 w-15 ${applyFilterPlaylists ? "bg-[#400073]" : "bg-[#400073]/30"} text-white text-xs border-2 border-l-0 border-[#400073]/50 rounded-r-lg cursor-pointer`}
                >Own</button>
              </div>
              <div className='gap-y-2 gap-x-1 flex flex-row flex-wrap'>
                {playlists.map((
                  {
                    id,
                    external_urls: { spotify: href_list },
                    name,
                    owner: {
                      display_name: name_owner,
                      external_urls: { spotify: href_owner }
                    },
                    images,
                  }) => (
                  <PlaylistCard
                    key={id}
                    href_list={href_list}
                    name={name}
                    name_owner={name_owner}
                    href_owner={href_owner}
                    images={images}
                    onClick={handleOpenAside}
                  />
                ))}
              </div>
            </section>
            {
              isAside &&
              <aside className='bg-[#400073]/7 flex flex-col w-full h-full py-4 px-6 gap-4'>
                <div className='flex flex-row justify-between w-full'>
                  <World color={"#400073"} />
                  <CloseAside color={"#400073"} />
                </div>
                <div className='rounded-lg size-fit border-2'>
                  <img
                    src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8449d96cb2d95fb48cc299d03b"
                    alt='Playlist Img'
                    className='object-cover object-center w-full h-full rounded-xl'
                  />
                </div>
                <div className='flex flex-col'>
                  <h3>babilonia</h3>
                  <h6>erguaitan</h6>
                </div>
              </aside>
            }
          </>

      }
    </>
  )
}

export default Playlists
