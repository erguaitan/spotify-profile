import { axiosInstanceToken } from "./axios";
import { useDataStore } from "./useDataStore";

export async function redirectToAuthCodeFlow() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  localStorage.clear();

  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", import.meta.env.VITE_REDIRECT_URI);
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("scope", "playlist-read-private")
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function obtainNewToken(code) {
  const verifier = localStorage.getItem("verifier");
  if (!verifier) {
    await redirectToAuthCodeFlow(code);
  }

  const params = new URLSearchParams();
  params.append("client_id", import.meta.env.VITE_CLIENT_ID);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", import.meta.env.VITE_REDIRECT_URI);
  params.append("code_verifier", verifier);

  const result = await axiosInstanceToken.post("/api/token", params);

  const data = await result.data;
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
}

export async function refreshAccessToken() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const refresh_token = localStorage.getItem('refresh_token');

  if (!refresh_token) {
    redirectToAuthCodeFlow();
    return null;
  }

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refresh_token);

  const result = await axiosInstanceToken.post("/api/token", params);

  const data = await result.data;
  localStorage.setItem("access_token", data.access_token);

  if (data.refresh_token) {
    localStorage.setItem("refresh_token", data.refresh_token);
  }

  return data.access_token;
}

function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function refreshTokenData(code) {
  try {
    let token;
    const { updateDataToken } = useDataStore.getState();

    if (code) {
      await obtainNewToken(code)
      token = true
    } else if (localStorage.getItem("access_token")) {
      token = true
    } else {
      token = false
    }

    await updateDataToken(token);

  } catch (error) {
    console.error(error);
  }
}

