import React, { useContext, useState } from 'react'

const WeatherContext = React.createContext()

export function useWeather() {
  return useContext(WeatherContext)
}

function WeatherProvider({children}) {
  const [weather, setWeather] = useState({latitude: 0, longitude: 0, temperatureUnits: 'C'})

  return (
    <WeatherContext.Provider value={[weather, setWeather]}>
      { children }
    </WeatherContext.Provider>
  )
}

export default WeatherProvider