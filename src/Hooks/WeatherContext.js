import React, { useContext, useState } from 'react'

import useLocalStorage from '../Hooks/UseLocalStorage'
const WeatherContext = React.createContext()

export function useWeather() {
  return useContext(WeatherContext)
}

function WeatherProvider({children}) {
  const [latitude,] = useLocalStorage('latitude', 0)
  const [longitude,] = useLocalStorage('longitude', 0)
  const [temperatureUnits,] = useLocalStorage('temperatureUnits', '°C')
  const [weather, setWeather] = useState({latitude, longitude, temperatureUnits: temperatureUnits})

  return (
    <WeatherContext.Provider value={[weather, setWeather]}>
      { children }
    </WeatherContext.Provider>
  )
}

export default WeatherProvider