import React, { useEffect } from "react";
import Header from "./sections/Header";
import Layout from "./sections/Layout";
import { BrowserRouter } from "react-router-dom";
import { useDataStore } from "./lib/useDataStore";
import { refreshTokenData } from "./lib/auth";
import { useMediaQuery } from "@mui/material";

const params = new URLSearchParams(window.location.search);
let code = params.get("code");
refreshTokenData(code);

const App = () => {
  const { isTokenLoading, changeResolution } = useDataStore();

  const isDesktopScreen = useMediaQuery("(min-width:1024px)");
  const isTabletHorizontalScreen = useMediaQuery("(min-width:768px) and (max-width:1024px)");
  const isTabletVerticalScreen = useMediaQuery("(min-width:440px) and (max-width:768px)");
  const isMobileScreen = useMediaQuery("(max-width:440px)");

  useEffect(() => {
    if (isDesktopScreen) {
      changeResolution("desktop");
    } else if (isTabletHorizontalScreen) {
      changeResolution("tablet-h");
    } else if (isTabletVerticalScreen) {
      changeResolution("tablet-v");
    } else if (isMobileScreen) {
      changeResolution("mobile");
    }
  }, [isDesktopScreen, isTabletHorizontalScreen, isTabletVerticalScreen, isMobileScreen, changeResolution])

  return (
    <main className={`grid grid-rows-[4rem_1fr] ${isDesktopScreen ? "grid-cols-[18.75rem_1fr_18.75rem]" : (isTabletHorizontalScreen || isTabletVerticalScreen) ? "grid-cols-[1fr_18.75rem]" : "grid-cols-1"} h-screen overflow-hidden`} data-theme="light">
      <Header />
      {isTokenLoading ? (
        <div className="col-span-3 flex justify-center items-center">
          <span className="loading loading-spinner text-[#400073] w-20 "></span>
        </div>
      ) : (
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      )}
    </main>
  );
};

export default App;
