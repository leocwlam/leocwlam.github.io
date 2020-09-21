import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { Image} from 'react-bootstrap'

import { weatherDescriptionImage, convertTemperatureUnits, shortHandDay, convertTemperature, localeDateTime, gmtOffset, locationInformationTime } from '../lib/weatherHelper'
import { useWeather } from '../Hooks/WeatherContext'

const WEATHERSERVICE = 'https://yjymxw64uayrr4a6.anvil.app/_/private_api/CQ5QZK23NH3UZY7HIQCUN45R/'
const DEFINEDWEATHERFUTURECAST = 'weather/futurecast'

const WEATHERICONWIDTH = '30rem'

const Styles = styled.div`
  .weatherFutureMainSession {
    display: flex;
  }

  .weatherFuturecast {
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

  .weatherImageSession {
    display: flex;

    div {
      text-align: center;
      font-size: xx-small;
      color:#22222c;
      align-self: center;
    }
  }

  .weatherOtherInformationSession {
    display: flex; 
    color: #98732dd1;
    font-size: medium;
  }
`

function WeatherFutureCast() {
  const [weatherContext, ] = useWeather()
  const [todayLocalTime, setTodayLocalTime] = useState(new Date())
  const [todayDay, setTodayDay] = useState({day: 0, weatherCode: 'clear', temperatureMinimum: 0, temperatureMinimumUnits: 'C', temperatureMaximum: 0, temperatureMaximumUnits: 'C', sunrise: new Date(), sunset: new Date()})
  const [futureFirstDay, setfutureFirstDay] = useState({day: 1, weatherCode: 'clear', temperatureMinimum: 0, temperatureMinimumUnits: 'C', temperatureMaximum: 0, temperatureMaximumUnits: 'C', sunrise: new Date(), sunset: new Date()})
  const [futureSecondDay, setfutureSecondDay] = useState({day: 2, weatherCode: 'clear', temperatureMinimum: 0, temperatureMinimumUnits: 'C', temperatureMaximum: 0, temperatureMaximumUnits: 'C', sunrise: new Date(), sunset: new Date()})
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
        const todayDay = informationTime.getDay()
        setTodayLocalTime(todayDay)
        setWeatherTimeForImage(informationTime)

        setTodayDay({day: ((todayDay+0)%7),
          weatherCode: data[0].weather_code.value,
          temperatureMinimum: temperatureValue(data[0].temp[0].min.value, data[0].temp[0].min.units, weatherContext.temperatureUnits),
          temperatureMinimumUnits: weatherContext.temperatureUnits,
          temperatureMaximum: temperatureValue(data[0].temp[1].max.value, data[0].temp[1].max.units, weatherContext.temperatureUnits),
          temperatureMaximumUnits: weatherContext.temperatureUnits,
          sunrise: localeDateTime(new Date(data[0].sunrise.value), offSetSeconds/3600),
          sunset: localeDateTime(new Date(data[0].sunset.value), offSetSeconds/3600)})

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
      })
      .catch((err) => console.log(err))
  }

  function renderFutureDay({day, weatherCode, temperatureMinimum, temperatureMinimumUnits, temperatureMaximum, temperatureMaximumUnits, sunrise, sunset}){
    return (
      <>
        <h6>
          { (() => {
            return (day === ((todayLocalTime+0)%7)) ? 'Today': shortHandDay(day)       
          })()}
        </h6>
        <div className="weatherImageSession">
          <Image
            width={WEATHERICONWIDTH}
            src={weatherDescriptionImage(weatherCode, weatherTimeForImage).image}
            alt={weatherCode}
            />
          <div>
            {weatherDescriptionImage(weatherCode, weatherTimeForImage).description}
          </div>
        </div>
        <div className="weatherOtherInformationSession">
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
      <div className="weatherFutureMainSession">
        <div className="weatherFuturecast">
          {renderFutureDay(todayDay)}
        </div>
        <div className="weatherFuturecast">
          {renderFutureDay(futureFirstDay)}
        </div>
        <div className="weatherFuturecast">
          {renderFutureDay(futureSecondDay)}
        </div>
      </div>
    </Styles>
  )
}

export default WeatherFutureCast