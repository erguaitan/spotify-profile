import React, { useEffect, useRef, useState } from 'react';
import { useDataStore } from '../lib/useDataStore';
import CloseAside from './icons/CloseAside';
import World from './icons/World';
import Lock from './icons/Lock';
import ArrowDown from './icons/ArrowDown';

const PlaylistsAside = ({ handleOpenAside }) => {
  const {
    dataPlaylistsAside,
    isMorePlaylistsTracksLoading,
    loadMoreTracksPlaylistsAside
  } = useDataStore();

  const [isDescOpen, setIsDescOpen] = useState(false);
  const loadMorePlaylistTracksRef = useRef(null);

  const handleOpenDesc = () => {
    setIsDescOpen((prev) => (!prev))
  }

  const handleLoadMoreTracks = (nextHref) => {
    loadMoreTracksPlaylistsAside(nextHref);
  }

  useEffect(() => {
    if (isMorePlaylistsTracksLoading || dataPlaylistsAside.tracks.next == null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMoreTracks()
        }
      },
      { rootMargin: '50px' }
    );

    if (loadMorePlaylistTracksRef.current) {
      observer.observe(loadMorePlaylistTracksRef.current);
    }

    return () => {
      if (loadMorePlaylistTracksRef.current) {
        observer.unobserve(loadMorePlaylistTracksRef.current);
      }
    }
  }, [dataPlaylistsAside, isMorePlaylistsTracksLoading])

  return (
    <aside className="bg-[#400073]/7 flex flex-col h-full overflow-auto py-4 px-6">

      <span className='flex flex-col h-fit'>
        <div className="flex flex-row justify-between items-center w-full">
          {
            dataPlaylistsAside.public ?
              <World color={"#400073"} size={"size-6"} /> :
              <Lock color={"#400073"} size={"size-6"} />

          }
          <p className='text-sm text-[#400073] font-semibold line-clamp-1'>{`${dataPlaylistsAside.followers.total} followers`}</p>
          <CloseAside color={"#400073"} size={"size-6"} handleOpenAside={handleOpenAside} />
        </div>
        <div className="mt-4 flex flex-col">
          <div className='rounded-lg w-full aspect-square'>
            {
              dataPlaylistsAside.images && dataPlaylistsAside.images.length > 0 ?
                <img
                  src={dataPlaylistsAside.images[0].url}
                  alt='Playlist Img'
                  className='object-cover object-center w-full h-full rounded-lg'
                /> :
                <div className='size-full rounded-lg bg-black/20'></div>
            }
          </div>
          <h3 className='mt-2 text-2xl font-semibold text-black/80 line-clamp-2 leading-6'>
            <a href={dataPlaylistsAside.external_urls.spotify} target='_blank' rel="noopener noreferrer" className='hover:underline decoration-2 transition duration-300 cursor-pointer'>
              {dataPlaylistsAside.name}
            </a>
          </h3>
          <h6 className='text-sm text-black/50 font-semibold line-clamp-1'>
            <a href={dataPlaylistsAside.owner.external_urls.spotify} target='_blank' rel="noopener noreferrer" className='hover:underline decoration-2 transition duration-300 cursor-pointer'>
              {dataPlaylistsAside.owner.display_name}
            </a>
          </h6>
        </div>
        <div className="flex flex-col mt-4 mb-2 gap-4">
          <p onClick={handleOpenDesc} className={`text-xs text-black/60 font-semibold ${isDescOpen ? "" : "line-clamp-1"}  leading-4`}>{dataPlaylistsAside.description}</p>
          <p className='text-base text-black/80 mt-2 font-semibold line-clamp-2 leading-4'>{`${dataPlaylistsAside.tracks.total} songs`}</p>
        </div>
      </span>
      <div className='flex flex-col overflow-y-auto overflow-x-hidden'>
        {
          dataPlaylistsAside.tracks.items.map((item, index) => {
            try {
              return (
                <div key={item.track.id} className='flex flex-row py-1 min-h-13 gap-2 hover:bg-[#400073]/7 transition duration-300'>
                  <div className='h-full w-auto aspect-square'>
                    {
                      item.track.album.images.length > 0 ?
                        <img
                          className='object-cover object-center w-full h-full rounded-xs'
                          src={item.track.album.images[0].url}
                          alt="Track Image"
                        /> :
                        <div className='size-full rounded-xs bg-black/20'></div>
                    }
                  </div>

                  <span className='flex flex-col justify-center gap-0.5'>
                    <span className='font-semibold text-base leading-none text-black/80 line-clamp-1'>
                      <a href={item.track.external_urls.spotify} target='_blank' rel="noopener noreferrer" className='hover:underline decoration-2 transition duration-300'>{item.track.name}</a>
                    </span>
                    <span className='font-semibold text-xs leading-none text-black/50 line-clamp-1'>
                      {
                        item.track.artists.map((artist, index) => (
                          <a
                            key={index}
                            href={artist.external_urls.spotify}
                            target='_blank' rel="noopener noreferrer"
                            className='hover:underline decoration-1 transition duration-300'>
                            {`${artist.name}${index + 1 < item.track.artists.length ? ", " : ""}`}
                          </a>
                        )
                        )
                      }
                    </span>
                  </span>
                </div>
              )
            } catch (error) {
              console.error(error)
            }
          })
        }
        {
          dataPlaylistsAside.tracks.next !== null && (
            <div ref={loadMorePlaylistTracksRef} className="flex justify-center py-4 w-full min-h-15">
              {
                isMorePlaylistsTracksLoading ?
                  <span className="loading loading-spinner text-[#400073] h-full "></span> :
                  null
              }

            </div>
          )
        }
      </div>
    </aside>
  )
}

export default PlaylistsAside
