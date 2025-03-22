import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import SkeletonPlaylistsSection from '../components/skeletons/SkeletonPlaylistsSection';
import SkeletonPlaylistsAside from '../components/skeletons/SkeletonPlaylistsAside';
import { useDataStore } from '../lib/useDataStore';
import PlaylistCard from '../components/PlaylistCard';
import { containerSectionClass, headerTextSectionClass } from '../constants/constants';
import PlaylistsAside from '../components/PlaylistsAside';
import Plus from '../components/icons/Plus';

const Playlists = () => {
  const {
    isDataSectionLoading,
    dataPlaylistsFiltered,
    updateDataPlaylists,
    applyFilterPlaylists,
    changeFilterPlaylists,
    isDataAsideLoading,
    updateDataPlaylistsAside,
    dataPlaylistsAside,
    dataPlaylistsNextHref,
    isMorePlaylistsLoading,
    loadMorePlaylists
  } = useDataStore();

  const [isAside, setIsAside] = useState(false);
  const [playlistSelected, setPlaylistSelected] = useState('');

  const handleOpenAside = (value, playlistId) => {
    if (value == true) {
      setPlaylistSelected(playlistId);
    }
    setIsAside(value);
  }

  const handleSetApplyFilter = (value) => {
    if (value !== applyFilterPlaylists) {
      changeFilterPlaylists();
    }
  }

  const handleLoadMorePlaylists = () => {
    loadMorePlaylists();
  }

  useEffect(() => {
    updateDataPlaylists();
  }, [updateDataPlaylists]);

  useEffect(() => {
    if (playlistSelected !== '') {
      updateDataPlaylistsAside(playlistSelected);
    }
  }, [playlistSelected])

  return (
    <>
      <Sidebar currentOption={"playlists"} />
      {
        isDataSectionLoading || dataPlaylistsFiltered.length == 0 ? <SkeletonPlaylistsSection /> :
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
                {dataPlaylistsFiltered.map((
                  {
                    id,
                    external_urls: { spotify: href_list },
                    name,
                    owner: {
                      display_name: name_owner,
                      external_urls: { spotify: href_owner }
                    },
                    images,
                  }) => {
                  try {
                    return (
                      <PlaylistCard
                        key={id}
                        id={id}
                        href_list={href_list}
                        name={name}
                        name_owner={name_owner}
                        href_owner={href_owner}
                        images={images}
                        handleOpenAside={handleOpenAside}
                      />
                    )
                  } catch (error) {
                    console.error(error);
                  }
                })}
                {
                  dataPlaylistsNextHref && (
                    isMorePlaylistsLoading ?
                      <div className="rounded-2xl p-2 pb-4 min-h-0 w-50 transition duration-300">
                        <div className='rounded-lg size-46'>
                          <div
                            className='size-full rounded-xl bg-[#400073]/70 hover:bg-[#400073]/80 transition duration-300 cursor-pointer flex items-center justify-center'
                          >
                            <span className="loading loading-spinner text-white w-12"></span> :
                          </div>
                        </div>
                      </div> :
                      <div className="rounded-2xl p-2 pb-4 min-h-0 w-50 transition duration-300">
                        <div className='rounded-lg size-46'>
                          <div
                            onClick={handleLoadMorePlaylists}
                            className='size-full rounded-xl bg-[#400073]/70 hover:bg-[#400073]/80 transition duration-300 cursor-pointer flex items-center justify-center'
                          >
                            <Plus strokeWidth='3' color='white' size='size-12' />
                          </div>
                        </div>
                      </div>
                  )

                }
              </div>
            </section>
            {
              isAside && (
                isDataAsideLoading || Object.keys(dataPlaylistsAside).length === 0 ?
                  <SkeletonPlaylistsAside handleOpenAside={handleOpenAside} /> :
                  <PlaylistsAside handleOpenAside={handleOpenAside} />
              )
            }
          </>

      }
    </>
  )
}

export default Playlists
