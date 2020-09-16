import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { ButtonGroup, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'

import { weatherDescriptionImage, convertTemperatureUnits, convertTemperature, localeDateTime, gmtOffset, locationInformationTime } from '../lib/weatherHelper'

import useLocalStorage from '../Hooks/UseLocalStorage'
import { useWeather } from '../Hooks/WeatherContext'

const WEATHERSERVICE = 'https://yjymxw64uayrr4a6.anvil.app/_/private_api/CQ5QZK23NH3UZY7HIQCUN45R/'
const DEFINEDWEATHERNOWCAST = 'weather/nowcast'

const WEATHERICONWIDTH = '30rem'

const Styles = styled.div`
  .weatherNowSession {
    display: flex;
    text-align: center;
  }

  .weatherNowcast {
    display: flex;
    color: black;
    font-size: x-small;
    border-top: groove;
    border-bottom: groove;
    align-items: flex-start;
    margin-top: .7rem;
    margin-left: .3rem;
    text-align: left;
  }

  .weatherImage {
    display: flex;
    margin-left: 1rem;
  }

  .weatherImageDescription {
    text-align: center;
    font-size: xx-small;
    color: #22222c;
    align-self: center;
  }

  .weatherTemperature {
    color: #98732dd1;
  }

  .weatherDescriptionSecondSession {
    margin-left: 1rem;
  }
`

function WeatherNowCast() {
  const [weatherContext, setWeatherContext] = useWeather()
  const [ , setLocalTemperatureUnits] = useLocalStorage('temperatureUnits', '°C')
  const [weatherCode, setWeatherCode] = useState('clear')
  const [weatherDescription, setWeatherDescription] = useState(weatherDescriptionImage('clear', new Date()).description)
  const [temperature, setTemperature] = useState(0)
  const [temperatureUnits, setTemperatureUnits] = useState(weatherContext.temperatureUnits)
  const [feelsLikeTemperature, setFeelsLikeTemperature] = useState(0)
  const [feelsLikeTemperatureUnits, setFeelsLikeTemperatureUnits] = useState(weatherContext.temperatureUnits)
  const [displayCelsius, setDisplayCelsius] = useState(weatherContext.temperatureUnits === convertTemperatureUnits('C'))
  const [sunrise, setSunrise] = useState(new Date())
  const [sunset, setSunset] = useState(new Date())
  const [pressure, setPressure] = useState('0 hPa')
  const [precipitationType, setPrecipitationType] = useState('none')
  const [precipitationValue, setPrecipitationValue] = useState('0 mm/hr')
  const [humidty, setHumidty] = useState('0%')
  const [windSpeed, setWindSpeed] = useState('0 m/s')
  const [observationTime, setObservationTime] = useState(new Date())
  const [weatherTimeForImage, setWeatherTimeForImage] = useState(new Date())

  function setRenderTemperature(sourceTemperature, sourceTemperatureUnits) {
    if (displayCelsius) {
      setTemperatureUnits(convertTemperatureUnits('C'))
      setTemperature((sourceTemperatureUnits.toLowerCase() === 'c') ? sourceTemperature : convertTemperature(sourceTemperature, true))
    } else {
      setTemperatureUnits(convertTemperatureUnits('F'))
      setTemperature((sourceTemperatureUnits.toLowerCase() === 'c') ? convertTemperature(sourceTemperature, true) : sourceTemperature)
    }
  }

  function setRenderFeelsLikeTemperature(sourceTemperature, sourceTemperatureUnits) {
    if (displayCelsius) {
      setFeelsLikeTemperatureUnits(convertTemperatureUnits('C'))
      setFeelsLikeTemperature((sourceTemperatureUnits.toLowerCase() === 'c') ? sourceTemperature : convertTemperature(sourceTemperature, true))
    } else {
      setFeelsLikeTemperatureUnits(convertTemperatureUnits('F'))
      setFeelsLikeTemperature((sourceTemperatureUnits.toLowerCase() === 'c') ? convertTemperature(sourceTemperature, true) : sourceTemperature)
    }
  }

  function requestWeatherNowcast({latitude, longitude}) {
    fetch(`${WEATHERSERVICE}${DEFINEDWEATHERNOWCAST}/${latitude}/${longitude}`)
      .then((response) => response.json())
      .then(async (data) => {
        const offSetSeconds = await gmtOffset(latitude, longitude)
        const informationTime = await locationInformationTime(latitude, longitude)
        setWeatherTimeForImage(informationTime)
        setWeatherCode(data.weather_code.value)
        setWeatherDescription(weatherDescriptionImage(data.weather_code.value, informationTime).description)
        setRenderTemperature(+data.temp.value, data.temp.units)
        setRenderFeelsLikeTemperature(+data.feels_like.value, data.feels_like.units)
        setSunrise(localeDateTime(new Date(data.sunrise.value), offSetSeconds/3600))
        setSunset(localeDateTime(new Date(data.sunset.value), offSetSeconds/3600))
        setPressure(`${data.baro_pressure.value} ${data.baro_pressure.units}`)
        setPrecipitationType(data.precipitation_type.value)
        setPrecipitationValue(`${data.precipitation.value} ${data.precipitation.units}`)
        setHumidty(`${data.humidity.value} ${data.humidity.units}`)
        setWindSpeed(`${data.wind_speed.value} ${data.wind_speed.units}`)
        setObservationTime(localeDateTime(new Date(data.observation_time.value), offSetSeconds/3600))
      })
      .catch((err) => console.log(err))
  }

  function handleTemperatureConvert(isToFahrenheit) {
    if ((isToFahrenheit && temperatureUnits === convertTemperatureUnits('F')) ||
      (!isToFahrenheit && temperatureUnits === convertTemperatureUnits('C')))
      return

    const newUnits = isToFahrenheit ? 'F' : 'C'
    setTemperature(convertTemperature(temperature, isToFahrenheit))
    setTemperatureUnits(convertTemperatureUnits(newUnits))
    setFeelsLikeTemperature(convertTemperature(feelsLikeTemperature, isToFahrenheit))
    setFeelsLikeTemperatureUnits(convertTemperatureUnits(newUnits))
    setDisplayCelsius(!isToFahrenheit)
    setLocalTemperatureUnits(convertTemperatureUnits(newUnits))
    setWeatherContext({...weatherContext, temperatureUnits: convertTemperatureUnits(newUnits)})
  }

  function renderImageTooltip(props) {
    return (
    <Tooltip id="image-tooltip" {...props}>
      {`Updated at ${observationTime.toLocaleString()}`}
    </Tooltip>
    )
  }

  useEffect(() => {
    // console.log(weatherContext)
    requestWeatherNowcast(weatherContext)
  }, [weatherContext]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Styles>
      <div className="weatherNowSession">
        <div>
          <div style={{width: '6rem'}}>
            <div className="weatherImage">
              <OverlayTrigger placement='right' delay={{ show: 250, hide: 400 }}
                    overlay={renderImageTooltip}>
                <Image
                  width={WEATHERICONWIDTH}
                  src={weatherDescriptionImage(weatherCode, weatherTimeForImage).image}
                  alt={weatherCode}
                  data-tip data-for="observationTimeToolTip"
                  />
                </OverlayTrigger >
                <div className="weatherImageDescription">
                  {weatherDescription}
                </div>
            </div>
            <div>
              <div className="weatherTemperature">
                {temperature.toFixed(2)}{convertTemperatureUnits(temperatureUnits)}
              </div>
              <ButtonGroup size='sm' toggle={true}>
                <Button active={displayCelsius} onClick={() => handleTemperatureConvert(false)}>{convertTemperatureUnits('C')}</Button>
                <Button active={!displayCelsius} onClick={() => handleTemperatureConvert(true)}>{convertTemperatureUnits('F')}</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div className='weatherNowcast'>
          <div>
            <div>
              Feels Like: {feelsLikeTemperature.toFixed(2)}{convertTemperatureUnits(feelsLikeTemperatureUnits)}
            </div>
            <div>
              Sunrise: {sunrise.toLocaleString()}
            </div>
            <div>
              Sunset: {sunset.toLocaleString()}
            </div>
            <div>
              pressure: {pressure}
            </div>
          </div>
          <div className="weatherDescriptionSecondSession">
            <div>
              Humidity: {humidty}
            </div>
            <div>
              Wind: {windSpeed}
            </div>
            <div>
              Precipitation: {precipitationType} {precipitationValue}
            </div>
          </div>
        </div>
      </div>
    </Styles>
  )
}

export default WeatherNowCast