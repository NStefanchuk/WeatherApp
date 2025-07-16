import CitySearch from '../components/citySearch/CitySearch'
import { Link } from 'react-router-dom'
import { MdOutlineStar } from 'react-icons/md'

function Home() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          marginTop: '200px',
          marginBottom: '75px',
          fontSize: '35px',
          padding: '10px',
        }}
      >
        Hey there!
        <br />
        Looking for the forecast? <br />
        Just enter a city name and let’s check the weather!
        <br />
      </h1>
      <Link
        to="/favorites"
        style={{
          position: 'fixed',
          right: '70px',
          top: '10px',
          color: 'gold',
          fontSize: '40px',
          border: 'none',
          borderRadius: '4px',
          textDecoration: 'none',
          display: 'inline-block',
          cursor: 'pointer',
        }}
      >
        <MdOutlineStar />
      </Link>
      <CitySearch />
    </div>
  )
}

export default Home
