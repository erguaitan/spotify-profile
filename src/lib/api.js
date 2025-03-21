import { axiosInstance } from "./axios";

export async function fetchProfileByApi() {
  const access_token = localStorage.getItem('access_token');
  const result = await axiosInstance.get("/me", {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  return result.data;
}

export async function fetchPlaylistsByApi() {
  try {
    const access_token = localStorage.getItem('access_token');
    const result = await axiosInstance.get("/me/playlists", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    return result.data;

  } catch (error) {
    return {error} 
  }
}

export async function fetchPlaylistInfoByApi(playlistId) {
  try {
    const access_token = localStorage.getItem('access_token');
    const result = await axiosInstance.get(`/playlists/${playlistId}`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    return result.data;

  } catch (error) {
    return {error} 
  }
}
