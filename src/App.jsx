import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './features/components/navBar.jsx'
import GameList from './features/games/gameList.jsx';
import GameDetail from './features/games/gameDetail.jsx';
import FavoritesList from './features/favorites/favoritesList.jsx';
123
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
    <Route path="/" element={<GameList />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/favorites" element={<FavoritesList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
