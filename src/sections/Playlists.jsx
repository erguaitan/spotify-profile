import React, { useEffect, useState } from 'react'
import { fetchPlaylistsByApi } from '../lib/api';
import { refreshAccessToken } from '../lib/auth';

const Playlists = () => {
  const [isAside, setIsAside] = useState(false);

  const handleClick = () => {
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
      <section className={`${!isAside ? 'col-span-2' : ''} grid grid-rows-[auto_1fr] h-full px-10 py-10 overflow-auto`}>
        <h1 className='text-3xl font-bold'>Users's Playlists</h1>
        <div className='mt-6 grid gap-x-8 gap-y-2 justify-items-center grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))]'>
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
            <div key={id} className="rounded-2xl p-2 pb-4 hover:bg-[#400073]/10 h-full w-50 transition duration-300 cursor-pointer hover:shadow-[2px_2px_0px_#400073]">
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
        <aside className='bg-amber-400 '>
          <p>b</p>
        </aside>

      }
    </>
  )
}

export default Playlists
