export const containerSectionClass = "flex flex-col h-full px-10 py-10 overflow-auto gap-6";
export const headerTextSectionClass = "text-3xl font-bold";

const sideBarOptionClass = "text-[#400073] py-3 px-4 hover:bg-[#400073]/15 border-b-2 border-b-[#400073] transition duration-300"
export const sideBarOptions = [
  {
    title: "Playlists",
    href: "/playlists",
    className: sideBarOptionClass,
  },
  {
    title: "Playing Tracks",
    href: "/",
    className: sideBarOptionClass,
  },
  {
    title: "Albums",
    href: "/",
    className: sideBarOptionClass,
  },
  {
    title: "Saved Tracks",
    href: "/",
    className: sideBarOptionClass,
  },
  {
    title: "Profile",
    href: "/",
    className: sideBarOptionClass,
  },
  {
    title: "Top Tracks",
    href: "/",
    className: sideBarOptionClass,
  },
  {
    title: "Top Artists",
    href: "/",
    className: sideBarOptionClass,
  },
  {
    title: "Followed Artists",
    href: "/",
    className: sideBarOptionClass,
  },
]