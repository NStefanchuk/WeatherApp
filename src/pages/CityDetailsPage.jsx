import { useParams } from 'react-router-dom'
import CityDetails from '../components/cityDetails/CityDetails'

function CityDetailsPage() {
  const { cityName } = useParams()

  return <CityDetails cityName={cityName} />
}

export default CityDetailsPage
