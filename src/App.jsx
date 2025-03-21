import React from "react";
import Header from "./sections/Header";
import Layout from "./sections/Layout";
import { BrowserRouter } from "react-router-dom";
import { useDataStore } from "./lib/useDataStore";
import { refreshTokenData } from "./lib/auth";

const params = new URLSearchParams(window.location.search);
let code = params.get("code");
refreshTokenData(code);

const App = () => {
  const { isTokenLoading } = useDataStore();

  return (
    <main className="grid grid-rows-[4rem_1fr] grid-cols-[18.75rem_1fr_18.75rem] h-screen overflow-hidden" data-theme="light">
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
