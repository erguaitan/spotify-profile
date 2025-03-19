import React from 'react';
import Header from './sections/Header';
import Layout from './sections/Layout';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <main className='grid grid-rows-[5rem_1fr] grid-cols-[18.75rem_1fr_18.75rem] h-screen'>
      <Header />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </main>
  )
}

export default App;
