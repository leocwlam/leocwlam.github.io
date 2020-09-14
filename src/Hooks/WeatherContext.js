import React, { useContext, useState } from 'react'

import useLocalStorage from '../Hooks/UseLocalStorage'
const WeatherContext = React.createContext()

export function useWeather() {
  return useContext(WeatherContext)
}

function WeatherProvider({children}) {
  const [temperatureUnits,] = useLocalStorage('temperatureUnits', '°C')
  const [weather, setWeather] = useState({latitude: 0, longitude: 0, temperatureUnits: temperatureUnits})

  return (
    <WeatherContext.Provider value={[weather, setWeather]}>
      { children }
    </WeatherContext.Provider>
  )
}

export default WeatherProvider