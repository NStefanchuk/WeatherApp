import CitySearch from '../components/citySearch/CitySearch'
import { Link } from 'react-router-dom'
import { MdOutlineStar } from 'react-icons/md'

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">
        Hey there!
        <br />
        Looking for the forecast? <br />
        Just enter a city name and let’s check the weather!
        <br />
      </h1>
      <Link className="home-favorites" to="/favorites">
        <MdOutlineStar />
      </Link>
      <CitySearch />
    </div>
  )
}

export default Home
