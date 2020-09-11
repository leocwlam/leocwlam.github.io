import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { ButtonGroup, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useWeather } from '../Hooks/WeatherContext'

import rain_heavy from '../assets/icons/wether/rain_heavy.svg'
import rain from '../assets/icons/wether/rain.svg'
import rain_light from '../assets/icons/wether/rain_light.svg'
import freezing_rain_heavy from '../assets/icons/wether/freezing_rain_heavy.svg'
import freezing_rain from '../assets/icons/wether/freezing_rain.svg'
import freezing_rain_light from '../assets/icons/wether/freezing_rain_light.svg'
import freezing_drizzle from '../assets/icons/wether/freezing_drizzle.svg'
import drizzle from '../assets/icons/wether/drizzle.svg'
import ice_pellets_heavy from '../assets/icons/wether/ice_pellets_heavy.svg'
import ice_pellets from '../assets/icons/wether/ice_pellets.svg'
import ice_pellets_light from '../assets/icons/wether/ice_pellets_light.svg'
import snow_heavy from '../assets/icons/wether/snow_heavy.svg'
import snow from '../assets/icons/wether/snow.svg'
import snow_light from '../assets/icons/wether/snow_light.svg'
import flurries from '../assets/icons/wether/flurries.svg'
import tstorm from '../assets/icons/wether/tstorm.svg'
import fog_light from '../assets/icons/wether/fog_light.svg'
import fog from '../assets/icons/wether/fog.svg'
import cloudy from '../assets/icons/wether/cloudy.svg'
import mostly_cloudy from '../assets/icons/wether/mostly_cloudy.svg'
import partly_cloudy_day from '../assets/icons/wether/partly_cloudy_day.svg'
import partly_cloudy_night from '../assets/icons/wether/partly_cloudy_night.svg'
import mostly_clear_day from '../assets/icons/wether/mostly_clear_day.svg'
import mostly_clear_night from '../assets/icons/wether/mostly_clear_night.svg'
import clear_day from '../assets/icons/wether/clear_day.svg'
import clear_night from '../assets/icons/wether/clear_night.svg'


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
function isNowDay(){
  const hour = new Date().getHours()
  return (hour > 4 && hour < 18)
}

function weatherDescriptionImage(weatherCode) {
  switch(weatherCode) {
    case 'rain_heavy':
      return {description: 'Substantial rain', image: rain_heavy}
    case 'rain':
      return {description: 'Rain', image: rain}
    case 'rain_light':
      return {description: 'Light rain', image: rain_light}
    case 'freezing_rain_heavy':
      return {description: 'Substantial freezing rain', image: freezing_rain_heavy}
    case 'freezing_rain':
      return {description: 'Freezing rain', image: freezing_rain}
    case 'freezing_rain_light':
      return {description: 'Light freezing rain', image: freezing_rain_light}
    case 'freezing_drizzle':
      return {description: 'Light freezing rain falling in fine pieces', image: freezing_drizzle}
    case 'drizzle':
      return {description: 'Light rain falling in very fine drops', image: drizzle}
    case 'ice_pellets_heavy':
      return {description: 'Substantial ice pellets', image: ice_pellets_heavy}
    case 'ice_pellets':
      return {description: 'Ice pellets', image: ice_pellets}
    case 'ice_pellets_light':
      return {description: 'Light ice pellets', image: ice_pellets_light}
    case 'snow_heavy':
      return {description: 'Substantial snow', image: snow_heavy}
    case 'snow':
      return {description: 'Snow', image: snow}
    case 'snow_light':
      return {description: 'Light snow', image: snow_light}
    case 'flurries':
      return {description: 'Flurries', image: flurries}
    case 'tstorm':
      return {description: 'Thunderstorm conditions', image: tstorm}
    case 'fog_light':
      return {description: 'Light fog', image: fog_light}
    case 'fog':
      return {description: 'Fog', image: fog}
    case 'cloudy':
      return {description: 'Cloudy', image: cloudy}
    case 'mostly_cloudy':
      return {description: 'Mostly cloudy', image: mostly_cloudy}
    case 'partly_cloudy':
      return {description: 'Partly cloudy', image: isNowDay() ? partly_cloudy_day : partly_cloudy_night}
    case 'mostly_clear':
      return {description: 'Mostly clear', image: isNowDay() ? mostly_clear_day : mostly_clear_night }
    case 'clear':
      return {description: 'Clear, sunny', image: isNowDay() ? clear_day : clear_night}
    default:
      return {description: '-', image: clear_day}
  }
}

function WeatherNowCast() {
  const [weatherContext, ] = useWeather()
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

  function convertTemperature(value, isToFahrenheit) {
    return isToFahrenheit ? ((value * 1.8) + 32) : ((value - 32) * 0.5556)
  }

  function convertTemperatureUnits(units) {
    if (units.toLowerCase() === 'c') {
      return '°C'
    } else if (units.toLowerCase() === 'f') {
      return '°F'
    } else {
      return units
    }
  }

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
    setTemperature(convertTemperature(temperature, isToFahrenheit))
    setTemperatureUnits(convertTemperatureUnits(isToFahrenheit ? 'F' : 'C'))
    setFeelsLikeTemperature(convertTemperature(feelsLikeTemperature, isToFahrenheit))
    setFeelsLikeTemperatureUnits(convertTemperatureUnits(isToFahrenheit ? 'F' : 'C'))
    setDisplayCelsius(!isToFahrenheit)
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