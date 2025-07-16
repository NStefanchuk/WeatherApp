import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiFog,
  WiShowers,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiNa,
} from 'react-icons/wi'

export const getWeatherIcon = (code) => {
  if (code === 0) return WiDaySunny
  if (code === 1 || code === 2) return WiDayCloudy
  if (code === 3) return WiCloud
  if (code === 45 || code === 48) return WiFog
  if (code >= 51 && code <= 57) return WiShowers
  if (code >= 61 && code <= 65) return WiRain
  if (code >= 66 && code <= 67) return WiRain
  if (code >= 71 && code <= 77) return WiSnow
  if (code >= 80 && code <= 82) return WiShowers
  if (code >= 95 && code <= 99) return WiThunderstorm
  return WiNa
}
