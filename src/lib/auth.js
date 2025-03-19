import { createCookie, obtainCookie } from "./cookie";
import { axiosInstanceToken } from "./axios";

export async function redirectToAuthCodeFlow(clientId) {
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

export function obtainAuthCode() {
  const params = new URLSearchParams(window.location.search);
  let code = params.get("code");

  if (code) {
    const params = new URLSearchParams(window.location.search);
    params.delete("code");
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);

    // createCookie('code', code);
    localStorage.setItem('code', code)
  } else {
    // code = obtainCookie('code');
    code = localStorage.getItem('code')
  }

  return code;
}

export async function obtainNewToken(client_id, code) {
  const verifier = localStorage.getItem("verifier");
  if (!verifier) {
    await redirectToAuthCodeFlow(client_id, code);
  }

  const params = new URLSearchParams();
  params.append("client_id", client_id);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", import.meta.env.VITE_REDIRECT_URI);
  params.append("code_verifier", verifier);

  const result = await axiosInstanceToken.post("/api/token", params);

  const data = await result.data;
  // localStorage.setItem("access_token", data.access_token);
  // localStorage.setItem("refresh_token", data.refresh_token);
  createCookie("access_token", data.access_token);
  createCookie("refresh_token", data.refresh_token);

  return data.access_token;
}

export async function refreshAccessToken() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  // const refreshToken = localStorage.getItem("refresh_token");
  const refreshToken = obtainCookie("refresh_token");
  if (!refreshToken) {
    redirectToAuthCodeFlow(clientId);
    return null;
  }

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const result = await axiosInstanceToken.post("/api/token", params);

  const data = await result.data;
  // localStorage.setItem("access_token", data.access_token);
  createCookie("access_token", data.access_token);

  if (data.refreshToken) {
    // localStorage.setItem("refresh_token", data.refreshToken);
    createCookie("refresh_token", data.refreshToken);
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

  createCookie('verifier', text);

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

