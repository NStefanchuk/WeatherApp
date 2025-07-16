import React from 'react';
import FavouritesList from '../components/favouritesList/FavouritesList';
import { useTheme } from '../context/ThemeContext'; 
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Favorites = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="favourites-container">
              <button className="nav-button home-button" onClick={() => navigate("/")} style={{right: "70px"}}>
          <IoHome color={theme === "dark" ? "#fff" : "#000"} />
        </button>
      <h2>Your Favourite Cities</h2>
      <FavouritesList />
    </div>
  );
};

export default Favorites;
