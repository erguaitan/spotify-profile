import React, { useEffect, useState } from 'react'
import { fetchPlaylistsByApi } from '../lib/api';
import { refreshAccessToken } from '../lib/auth';

const Profile = () => {
  useEffect(() => {
    const handleFetchProfile = async () => {
      try {
        let data = await fetchPlaylistsByApi();
        if (data.error) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            data = await fetchProfileByApi();
          } else {
            redirectToAuthCodeFlow(clientId);
          }
        }

        console.log(data);
      } catch (error) {

      }
    }
    handleFetchProfile();

  }, [])

  return (
    <div>
      Profile
    </div>
  )
}

export default Profile
