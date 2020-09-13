import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { ButtonGroup, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'

import { weatherDescriptionImage, convertTemperatureUnits, convertTemperature } from '../lib/weatherHelper'
import { useWeather } from '../Hooks/WeatherContext'

const WEATHERSERVICE = 'https://yjymxw64uayrr4a6.anvil.app/_/private_api/CQ5QZK23NH3UZY7HIQCUN45R/'
const DEFINEDWEATHERNOWCAST = 'weather/nowcast'

const Styles = styled.div`
  .weatherNowcast{
    display: flex;
    color: black;
    font-size: x-small;
    border-top: groove;
    border-bottom: groove;
    align-items: flex-start;
    margin-top: .7rem;
    margin-left: .3rem;
  }
`

function WeatherNowCast() {
  const [weatherContext, setWeatherContext] = useWeather()
  const [weatherCode, setWeatherCode] = useState('clear')
  const [weatherDescription, setWeatherDescription] = useState(weatherDescriptionImage('clear').description)
  const [temperature, setTemperature] = useState(0)
  const [temperatureUnits, setTemperatureUnits] = useState('°C')
  const [feelsLikeTemperature, setFeelsLikeTemperature] = useState(0)
  const [feelsLikeTemperatureUnits, setFeelsLikeTemperatureUnits] = useState('°C')
  const [displayCelsius, setDisplayCelsius] = useState(true)
  const [sunrise, setSunrise] = useState(new Date())
  const [sunset, setSunset] = useState(new Date())
  const [pressure, setPressure] = useState('0 hPa')
  const [precipitationType, setPrecipitationType] = useState('none')
  const [precipitationValue, setPrecipitationValue] = useState('0 mm/hr')
  const [humidty, setHumidty] = useState('0%')
  const [windSpeed, setWindSpeed] = useState('0 m/s')
  const [observationTime, setObservationTime] = useState(new Date())

  function requestWeatherNowcast({latitude, longitude}) {
    fetch(`${WEATHERSERVICE}${DEFINEDWEATHERNOWCAST}/${latitude}/${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherCode(data.weather_code.value)
        setWeatherDescription(weatherDescriptionImage(data.weather_code.value).description)
        setTemperature(+data.temp.value)
        setTemperatureUnits(convertTemperatureUnits(data.temp.units))
        setDisplayCelsius((data.temp.units.toLowerCase() === 'c'))
        setFeelsLikeTemperature(+data.feels_like.value)
        setFeelsLikeTemperatureUnits(convertTemperatureUnits(data.feels_like.units))
        setSunrise(new Date(data.sunrise.value))
        setSunset(new Date(data.sunset.value))
        setPressure(`${data.baro_pressure.value} ${data.baro_pressure.units}`)
        setPrecipitationType(data.precipitation_type.value)
        setPrecipitationValue(`${data.precipitation.value} ${data.precipitation.units}`)
        setHumidty(`${data.humidity.value} ${data.humidity.units}`)
        setWindSpeed(`${data.wind_speed.value} ${data.wind_speed.units}`)
        setObservationTime(new Date(data.observation_time.value))
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
    setWeatherContext({...weatherContext, temperatureUnits: newUnits})
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Styles>
      <div style={{display: 'flex'}}>
        <div style= {{textAlign: 'center'}}>
          <div style={{width: '6rem'}}>
            <div style={{display: 'flex'}}>
              <OverlayTrigger placement='right' delay={{ show: 250, hide: 400 }}
                    overlay={renderImageTooltip}>
                <Image
                  width={'30rem'}
                  height={'30rem'}
                  src={weatherDescriptionImage(weatherCode).image}
                  alt={weatherCode}
                  style={{marginLeft: '1rem'}}
                  data-tip data-for="observationTimeToolTip"
                  />
                </OverlayTrigger >
                <div style= {{textAlign: 'center', fontSize: 'xx-small', color:'#22222c', alignSelf: 'center'}}>
                  {weatherDescription}
                </div>
            </div>
            <div>
              <div style={{color: '#98732dd1'}}>
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
          <div style={{marginLeft: '1rem'}}>
            <div>
              Precipitation: {precipitationType} {precipitationValue}
            </div>
            <div>
              Humidity: {humidty}
            </div>
            <div>
              Wind: {windSpeed}
            </div>
          </div>
        </div>
      </div>
    </Styles>
  )
}

export default WeatherNowCast