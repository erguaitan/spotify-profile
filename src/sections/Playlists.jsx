import React, { useEffect, useState } from 'react'
import { fetchPlaylistsByApi } from '../lib/api';
import { refreshAccessToken } from '../lib/auth';
import CloseAside from '../components/icons/CloseAside';
import World from '../components/icons/World';
import Sidebar from './Sidebar';

const Playlists = () => {
  const [isAside, setIsAside] = useState(false);

  const handleOpenAside = () => {
    setIsAside((prev) => (!prev))
  }

  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    const handleFetchPlaylits = async () => {
      try {
        let data = await fetchPlaylistsByApi();
        if (data.error) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            data = await fetchPlaylistsByApi();
          } else {
            redirectToAuthCodeFlow(clientId);
          }
        }
        setPlaylists(data.items);

      } catch (error) {

      }
    }
    handleFetchPlaylits();

  }, [])

  return (
    <>
      <Sidebar />
      <section className={`${!isAside ? 'col-span-2' : ''} grid grid-rows-[auto_1fr] h-full px-10 py-10 overflow-auto`}>
        <h1 className='text-3xl font-bold'>Users's Playlists</h1>
        <div className='mt-6 gap-y-2 gap-x-1 flex flex-row flex-wrap'>
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
            <div
              onClick={handleOpenAside}
              key={id}
              className="rounded-2xl p-2 pb-4 hover:bg-[#400073]/10 min-h-0 w-50 transition duration-300 cursor-pointer hover:shadow-[2px_2px_0px_#400073]"
            >
              <div className='rounded-lg size-46'>
                <img
                  src={images[0].url}
                  alt='Playlist Img'
                  className='object-cover object-center w-full h-full rounded-xl'
                />
              </div>
              <h3 className='pl-2 mt-1 text-lg font-semibold text-black/80 line-clamp-2 leading-6'>
                <a href={href_list} target='_blank' rel="noopener noreferrer" className='hover:underline decoration-2 decoration-black/80 transition duration-300'>
                  {name}
                </a>
              </h3>
              <h6 className='pl-2 text-sm mt-1 text-black/50 font-semibold'>
                <a href={href_owner} target='_blank' rel="noopener noreferrer" className='hover:underline decoration-2 transition duration-300'>
                  {name_owner}
                </a>
              </h6>
            </div>
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
  )
}

export default Playlists
