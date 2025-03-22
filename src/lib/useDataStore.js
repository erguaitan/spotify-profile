import { create } from "zustand";
import { obtainNewToken, redirectToAuthCodeFlow, refreshAccessToken } from "./auth";
import { fetchEmptyUrlByApi, fetchPlaylistInfoByApi, fetchPlaylistsByApi, fetchProfileByApi } from "./api";

export const useDataStore = create((set, get) => ({
  token: false,
  isTokenLoading: false,
  ownerData: {},
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
  updateDataToken: async (value) => {
    try {
      if (get().isTokenLoading) return;
      set({ isDataSectionLoading: true });
      set({ token: value });
      if (value) {
        let data = await fetchProfileByApi();
        if (data.error) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            data = await fetchProfileByApi();
          }
        }
        set({ ownerData: data })
      }
    } catch (error) {
      set({ token: false });
    } finally {
      set({ isTokenLoading: false });
    }
  },

  isDataSectionLoading: false,
  isDataAsideLoading: false,

  dataPlaylists: [],
  dataPlaylistsFiltered: [],
  dataPlaylistsNextHref: null,
  applyFilterPlaylists: false,
  updateDataPlaylists: async () => {
    try {
      // if (get().isDataSectionLoading) return;
      set({ isDataSectionLoading: true });
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
      set({ dataPlaylistsNextHref: data.next });

    } catch (error) {
      set({ dataPlaylists: [] });
      set({ dataPlaylistsFiltered: [] });
      console.error(error);
    } finally {
      set({ isDataSectionLoading: false });
    }
  },
  changeFilterPlaylists: () => {
    set({ isDataLoading: true });
    set((state) => ({ applyFilterPlaylists: !state.applyFilterPlaylists }));

    const currentApplyFilter = get().applyFilterPlaylists;
    if (currentApplyFilter) {
      set((state) => ({
        dataPlaylistsFiltered: state.dataPlaylists.filter((item) => item.owner.display_name === get().ownerData.display_name),
      }));
    } else {
      set((state) => ({ dataPlaylistsFiltered: state.dataPlaylists }));
    }
    set({ isDataLoading: false });
  },

  dataPlaylistsAside: {},
  updateDataPlaylistsAside: async (playlistId) => {
    try {
      if (get().isDataAsideLoading) return;
      set({ isDataAsideLoading: true });
      let data = await fetchPlaylistInfoByApi(playlistId);
      if (data.error) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          data = await fetchPlaylistInfoByApi(playlistId);
        } else {
          redirectToAuthCodeFlow()
        }
      }
      set({ dataPlaylistsAside: data });

    } catch (error) {
      set({ dataPlaylistsAside: {} });
      console.error(error);
    } finally {
      set({ isDataAsideLoading: false });
    }
  },
  isMorePlaylistsTracksLoading: false,
  loadMoreTracksPlaylistsAside: async () => {
    set({ isMorePlaylistsTracksLoading: true })
    const nextHref = get().dataPlaylistsAside.tracks.next
    const nextHrefSplit = nextHref.split("/");
    const nextHrefJoin = nextHrefSplit.slice(-2).join("/");

    try {
      let data = await fetchPlaylistInfoByApi(nextHrefJoin);
      if (data.error) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          data = await fetchPlaylistInfoByApi(nextHrefJoin);
        } else {
          redirectToAuthCodeFlow()
        }
      }

      if (get().dataPlaylistsAside.tracks.next !== data.next && get().dataPlaylistsAside.tracks.next !== null) {
        set((state) => ({
          dataPlaylistsAside: {
            ...state.dataPlaylistsAside,
            tracks: {
              ...state.dataPlaylistsAside.tracks,
              next: data.next,
              items: [
                ...state.dataPlaylistsAside.tracks.items,
                ...data.items,
              ],
            },
          },
        }));
      }      

    } catch (error) {
      console.error(error);
    } finally {
      set({ isMorePlaylistsTracksLoading: false })
    }
  },
  isMorePlaylistsLoading: false,
  loadMorePlaylists: async () => {
    set({ isMorePlaylistsLoading: true })
    const nextHrefSplit = get().dataPlaylistsNextHref.split("/");
    const nextHrefJoin = nextHrefSplit.slice(-3).join("/");

    try {
      let data = await fetchEmptyUrlByApi(nextHrefJoin);
      if (data.error) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          data = await fetchEmptyUrlByApi(nextHrefJoin);
        } else {
          redirectToAuthCodeFlow()
        }
      }

      set((state) => ({
        dataPlaylists: [
          ...state.dataPlaylists,
          ...data.items
        ]
      }));
      
      if (get().applyFilterPlaylists) {
        set((state) => ({
          dataPlaylistsFiltered: state.dataPlaylists.filter((item) => item.owner.display_name === get().ownerData.display_name),
        }));
      } else {
        set((state) => ({
          dataPlaylistsFiltered: [
            ...state.dataPlaylistsFiltered,
            ...data.items
          ]
        }));
      }

      set({dataPlaylistsNextHref: data.next});

    } catch (error) {
      console.error(error);
    } finally {
      set({ isMorePlaylistsLoading: false })
    }
  }

}))