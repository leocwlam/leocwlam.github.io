import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { Image} from 'react-bootstrap'

import { weatherDescriptionImage, convertTemperatureUnits, shortHandDay, convertTemperature, localeDateTime, gmtOffset, locationInformationTime } from '../lib/weatherHelper'
import { useWeather } from '../Hooks/WeatherContext'

const WEATHERSERVICE = 'https://yjymxw64uayrr4a6.anvil.app/_/private_api/CQ5QZK23NH3UZY7HIQCUN45R/'
const DEFINEDWEATHERFUTURECAST = 'weather/futurecast'

const Styles = styled.div`
  .weatherfuturecast{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    color: black;
    font-size: xx-small;
    border-top: groove;
    border-bottom: groove;
    align-items: center;
    margin-top: .7rem;
    margin-left: .3rem;
    margin-right: .3rem;
    width: 100%;
  }
`

function WeatherFutureCast() {
  const [weatherContext, ] = useWeather()
  const [futureFirstDay, setfutureFirstDay] = useState({day: 0, weatherCode: 'clear', temperatureMinimum: 0, temperatureMinimumUnits: 'C', temperatureMaximum: 0, temperatureMaximumUnits: 'C', sunrise: new Date(), sunset: new Date()})
  const [futureSecondDay, setfutureSecondDay] = useState({day: 1, weatherCode: 'clear', temperatureMinimum: 0, temperatureMinimumUnits: 'C', temperatureMaximum: 0, temperatureMaximumUnits: 'C', sunrise: new Date(), sunset: new Date()})
  const [futureThirdDay, setfutureThirdDay] = useState({day: 2, weatherCode: 'clear', temperatureMinimum: 0, temperatureMinimumUnits: 'C', temperatureMaximum: 0, temperatureMaximumUnits: 'C', sunrise: new Date(), sunset: new Date()})
  const [weatherTimeForImage, setWeatherTimeForImage] = useState(new Date())

  function temperatureValue(temperature, temperatureUnits, requestDisplayTemperatureUnits) {
    if (convertTemperatureUnits(temperatureUnits) === requestDisplayTemperatureUnits)
      return temperature

    if (requestDisplayTemperatureUnits === convertTemperatureUnits('C')) {
      return (temperatureUnits.toLowerCase() === 'c') ? temperature : convertTemperature(temperature, false)
    }
    
    return (temperatureUnits.toLowerCase() === 'c') ? convertTemperature(temperature, true) : temperature
  }

  function requestWeatherFutureCast({latitude, longitude}) {
    fetch(`${WEATHERSERVICE}${DEFINEDWEATHERFUTURECAST}/${latitude}/${longitude}`)
      .then((response) => response.json())
      .then(async (data) => {
        const offSetSeconds = await gmtOffset(latitude, longitude)
        const informationTime = await locationInformationTime(latitude, longitude)
        const todayDay = informationTime.getDay();
        setWeatherTimeForImage(informationTime)
        setfutureFirstDay({day: ((todayDay+1)%7),
          weatherCode: data[1].weather_code.value,
          temperatureMinimum: temperatureValue(data[1].temp[0].min.value, data[1].temp[0].min.units, weatherContext.temperatureUnits),
          temperatureMinimumUnits: weatherContext.temperatureUnits,
          temperatureMaximum: temperatureValue(data[1].temp[1].max.value, data[1].temp[1].max.units, weatherContext.temperatureUnits),
          temperatureMaximumUnits: weatherContext.temperatureUnits,
          sunrise: localeDateTime(new Date(data[1].sunrise.value), offSetSeconds/3600),
          sunset: localeDateTime(new Date(data[1].sunset.value), offSetSeconds/3600)})

        setfutureSecondDay({day: ((todayDay+2)%7),
          weatherCode: data[2].weather_code.value,
          temperatureMinimum: temperatureValue(data[2].temp[0].min.value, data[2].temp[0].min.units, weatherContext.temperatureUnits),
          temperatureMinimumUnits: weatherContext.temperatureUnits,
          temperatureMaximum: temperatureValue(data[2].temp[1].max.value, data[2].temp[1].max.units, weatherContext.temperatureUnits),
          temperatureMaximumUnits: weatherContext.temperatureUnits,
          sunrise: localeDateTime(new Date(data[2].sunrise.value), offSetSeconds/3600),
          sunset: localeDateTime(new Date(data[2].sunset.value), offSetSeconds/3600)})

        setfutureThirdDay({day: ((todayDay+3)%7),
          weatherCode: data[3].weather_code.value,
          temperatureMinimum: temperatureValue(data[3].temp[0].min.value, data[3].temp[0].min.units, weatherContext.temperatureUnits),
          temperatureMinimumUnits: weatherContext.temperatureUnits,
          temperatureMaximum: temperatureValue(data[3].temp[1].max.value, data[3].temp[1].max.units, weatherContext.temperatureUnits),
          temperatureMaximumUnits: weatherContext.temperatureUnits,
          sunrise: localeDateTime(new Date(data[3].sunrise.value), offSetSeconds/3600),
          sunset: localeDateTime(new Date(data[3].sunset.value), offSetSeconds/3600)})
      })
      .catch((err) => console.log(err))
  }

  function renderFutureDay({day, weatherCode, temperatureMinimum, temperatureMinimumUnits, temperatureMaximum, temperatureMaximumUnits, sunrise, sunset}){
    return (
      <>
        <h6>
          {shortHandDay(day)}
        </h6>
        <div style={{display: 'flex'}}>
          <Image
            width={'30rem'}
            height={'30rem'}
            src={weatherDescriptionImage(weatherCode, weatherTimeForImage).image}
            alt={weatherCode}
            style={{marginLeft: '1rem'}}
            />
          <div style= {{textAlign: 'center', fontSize: 'xx-small', color:'#22222c', alignSelf: 'center'}}>
            {weatherDescriptionImage(weatherCode, weatherTimeForImage).description}
          </div>
        </div>
        <div style={{display: 'flex', color: '#98732dd1', fontSize: 'medium'}}>
          <div>
            {temperatureMinimum.toFixed(2)}{convertTemperatureUnits(temperatureMinimumUnits)}
          </div>
          <div>
            -
          </div>
          <div>
            {temperatureMaximum.toFixed(2)}{convertTemperatureUnits(temperatureMaximumUnits)}
          </div>
        </div>
        <div>
          <div>
            Sunrise: {sunrise.toLocaleTimeString()}
          </div>
          <div>
            Sunset: {sunset.toLocaleTimeString()}
          </div>
        </div>
      </>
    )
  }

  useEffect(() => {
    requestWeatherFutureCast(weatherContext)
  }, [weatherContext]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Styles>
      <div style={{display: 'flex'}}>
        <div className="weatherfuturecast">
          {renderFutureDay(futureFirstDay)}
        </div>
        <div className="weatherfuturecast">
          {renderFutureDay(futureSecondDay)}
        </div>
        <div className="weatherfuturecast">
          {renderFutureDay(futureThirdDay)}
        </div>
      </div>
    </Styles>
  )
}

export default WeatherFutureCast