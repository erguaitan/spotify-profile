export function createCookie(key, value, time = import.meta.env.VITE_TIME_COOKIE) {
  let expires = "";
  time = parseInt(time);
  let date = new Date();
  date.setTime(date.getTime() + time * 1000);
  expires = "; expires=" + date.toUTCString();
  document.cookie = key + "=" + encodeURIComponent(value) + expires + "; path=/";
  // document.cookie = key + "=" + encodeURIComponent(value) + expires + "; path=/; Secure; HttpOnly; SameSite=Strict";
}

export function obtainCookie(key) {
  let name = key + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookiesArray = decodedCookie.split('; ');
  for (let cookie of cookiesArray) {
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return null;
}

export function deleteCookie(key) {
  document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function deleteAllCookies() {
  let cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let key = cookie.split("=")[0];
    deleteCookie(key);
  }
}