import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import CityDetailsPage from './pages/CityDetailsPage'
import './App.css'
import { useTheme } from './context/ThemeContext'
import { FaMoon } from 'react-icons/fa'
import { PiSunFill } from 'react-icons/pi'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`app-container ${theme}`}>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? <FaMoon /> : <PiSunFill />}
      </button>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/city/:cityName" element={<CityDetailsPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
