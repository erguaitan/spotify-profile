import { create } from "zustand";
import { obtainNewToken, redirectToAuthCodeFlow, refreshAccessToken } from "./auth";
import { fetchPlaylistsByApi } from "./api";

export const useDataStore = create((set, get) => ({
  token: false,
  isTokenLoading: true,
  updateStoreToken: async (code) => {
    try {
      if (window.location.pathname === "/login") {
        set({ token: false });
        localStorage.clear();
      } else {
        if (code) {
          await obtainNewToken(code);
          const params = new URLSearchParams(window.location.search);
          params.delete("code");
          const newUrl = `${window.location.pathname}?${params.toString()}`;
          window.history.replaceState({}, "", newUrl);
        }

        if (localStorage.getItem("access_token")) {
          set({ token: true })
        } else {
          window.location.href = "/login";
        }
      }
    } catch (error) {
      console.error(error)
      window.location.href = "/login";
    } finally {
      set({ isTokenLoading: false });
    }
  },

  isDataLoading: true,
  updateData: async (value) => {
    set({ token: value });
    set({ isTokenLoading: false });
  },

  dataPlaylists: [],
  dataPlaylistsFiltered: [],
  applyFilterPlaylists: false,
  updateDataLists: async () => {
    try {
      if (get().isDataLoading) return;
      set({ isDataLoading: true });
      let data = await fetchPlaylistsByApi();
      if (data.error) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          data = await fetchPlaylistsByApi();
        } else {
          redirectToAuthCodeFlow()
        }
      }
      set({ dataPlaylists: data.items });
      set({ dataPlaylistsFiltered: data.items });

    } catch (error) {
      set({ data: null });
      console.error(error);
    } finally {
      set({ isDataLoading: false });
    }
  },
  changeFilterPlayLists: () => {
    set({ isDataLoading: true });
    set((state) => ({ applyFilterPlaylists: !state.applyFilterPlaylists }));

    const currentApplyFilter = get().applyFilterPlaylists;
    if (currentApplyFilter) {
      set((state) => ({
        dataPlaylistsFiltered: state.dataPlaylists.filter((item) => item.owner.display_name === "erguaitan"), // TODO: take display_name from api
      }));
    } else {
      set((state) => ({ dataPlaylistsFiltered: state.dataPlaylists }));
    }
    set({ isDataLoading: false });
  }
}))