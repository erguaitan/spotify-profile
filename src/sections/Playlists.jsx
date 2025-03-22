import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import SkeletonPlaylistsSection from '../components/skeletons/SkeletonPlaylistsSection';
import SkeletonPlaylistsAside from '../components/skeletons/SkeletonPlaylistsAside';
import { useDataStore } from '../lib/useDataStore';
import PlaylistCard from '../components/PlaylistCard';
import { containerSectionClass, headerTextSectionClass } from '../constants/constants';
import PlaylistsAside from '../components/PlaylistsAside';

const Playlists = () => {
  const {
    isDataSectionLoading,
    dataPlaylistsFiltered: playlists,
    updateDataPlaylists,
    applyFilterPlaylists,
    changeFilterPlaylists,
    isDataAsideLoading,
    updateDataPlaylistsAside,
    dataPlaylistsAside
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
        isDataSectionLoading || playlists.length == 0 ? <SkeletonPlaylistsSection /> :
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
