import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { Button } from 'react-bootstrap'
import { showAlertMessage } from '../../lib/notificationsHelper'

import useLocalStorage from '../../hooks/useLocalStorage'
import { useWeather } from '../../hooks/WeatherContext'

import WetherNowCast from './WetherNowCast'
import WeatherFutureCast from './WeatherFutureCast'

const DECIMALREGEX = /^-?\d*\.?\d*$/;

const WEATHERSERVICE = 'https://yjymxw64uayrr4a6.anvil.app/CQ5QZK23NH3UZY7HIQCUN45R/_/api/'
const DEFINEDWEATHERCITIES = 'weather/cities'
const REFRESHWEATHERCITIES = 12

const Styles = styled.div`
  background-color: white;
  opacity: 1;
  width: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 38rem;
  margin-left: 1rem;

  .title {
    font-size: larger;
    color: orange;
  }

  .latlon {
    width: 3.9rem;
    text-align: right;
  }

  .weatherSession{
    display: flex;
  }
  
  .weatherTitle{
    align-self: center;
    margin-left: 0.3rem;
  }

  .weatherSelector {
    display: flex;
    font-size: small;
    align-items: center;
    margin-left: 0.2rem;
  }

  .weatherDropDown {
    width: 9.5rem;
  }

  .latitudeLatlonMarginSession {
    margin-left: 0.2rem;
  }

  .latitudeLatlonSession {
    display: flex;
    margin-top: 0.2rem;
  }

  .latitudeLatlonButton {
    align-items: top;
    width: 10rem;
  }
`

function Weather() {
  const [lastTimeWeatherCityGet, setLastTimeWeatherCityGet] = useLocalStorage('lastTimeWeatherCityGet', new Date())
  const [definedWeatherCities, setDefinedWeatherCities] = useLocalStorage('definedWeatherCities', null)
  const [latitude, setLatitude]= useLocalStorage('latitude', 0)
  const [longitude, setLongitude] = useLocalStorage('longitude', 0)
  const [weatherCity, setWeatherCity] = useLocalStorage('weatherCity', JSON.stringify({'lat': latitude, 'lon': longitude}))
  const [otherLatLon, setOtherLatLon] = useLocalStorage('otherLatLon', JSON.stringify({'lat': latitude, 'lon': longitude}))
  const [disabledLatitudeLongitude, setDisabledLatitudeLongitude] = useState((weatherCity===otherLatLon) ? false : true)
  const [weatherContext, setWeatherContext] = useWeather()

  let optionItems = []

  function showGeolocationWarningMessage(message, width) {
    showAlertMessage({type:'warning', title: 'Warning', message, width, duration: 1500})
  }

  function showCanUseGeolocationMessage(width) {
    const message = 'Click Geolocation button  Or  Enter latitude & longitude'
    showAlertMessage({type:'info', title: 'Information', message, width, duration: 5000})
  }

  function buildCitiesList(weatherCities) {
    optionItems = []
    if (weatherCities && (weatherCities.length > 0)) {
      optionItems = 
        weatherCities.map((cityInformation) => {
            const {name, point} = cityInformation
            const cityName = name.split('_').pop()
            return (<option key={cityName} value={JSON.stringify(point)}>{cityName.replace(/([A-Z])/g, ' $1').trim()}</option>)
          })
      }
    optionItems.sort(function (a, b) {
        if (a.key < b.key) {
          return -1
        } else if (a.key > b.key){
          return 1
        }
        return 0
    })
    optionItems.push(<option key={'Other'} value={otherLatLon}>{'Other'}</option>)
  }

  function requestDefinedWeatherCities() {
    fetch(`${WEATHERSERVICE}${DEFINEDWEATHERCITIES}`)
      .then((response) => response.json())
      .then((data) => {
        setDefinedWeatherCities(data)
        buildCitiesList(data)
      })
      .catch((err) => console.log(err))
  }

  function requestUpdateWeatherCities() {
    setDefinedWeatherCities([])  // cleanup the old news
    setLastTimeWeatherCityGet(new Date())
    requestDefinedWeatherCities()
  }

  function checkDisabledLatitudeLongitude(weatherCityValue) {
    const checkDisabledLatitudeLongitude = JSON.stringify(weatherCityValue)===JSON.stringify(otherLatLon) ? false : true
    setDisabledLatitudeLongitude(checkDisabledLatitudeLongitude)
  }

  const handleCityChange = (event) => {
    const {lat, lon} = JSON.parse(event.target.value)
    if ((lat === 0) && (lon === 0)) {
      showCanUseGeolocationMessage(230)
    }
    setWeatherCity(event.target.value)
    setLatitude((+lat).toFixed(4))
    setLongitude((+lon).toFixed(4))
    checkDisabledLatitudeLongitude(event.target.value)
    setWeatherContext(weatherContext => ({...weatherContext, latitude: (+lat).toFixed(4), longitude: (+lon).toFixed(4)}))
  }

  const handleLatitudeChange = (event) => {
    if(event.target.value.match(DECIMALREGEX)) {
      const newLatitude = event.target.value
      if ((newLatitude < -59.9) || (newLatitude > 59.9)) {
        showGeolocationWarningMessage('Support latitude range is between -59.9 to 59.9', 278)
        return 
      }
      setLatitude(event.target.value)
      setOtherLatLon(JSON.stringify({'lat': newLatitude, 'lon': longitude}))
      setWeatherCity(JSON.stringify({'lat': newLatitude, 'lon': longitude}))
      setWeatherContext(weatherContext => ({...weatherContext, latitude: newLatitude, longitude}))
    }
  }

  const handleLongitudeChange = (event) => {
    if(event.target.value.match(DECIMALREGEX)) {
      const newLongitude = event.target.value
      if ((newLongitude < -180) || (newLongitude > 180)) {
        showGeolocationWarningMessage('Support longitude range is between -180 to 180', 278)
        return 
      }
      setLongitude(event.target.value)
      setOtherLatLon(JSON.stringify({'lat': latitude, 'lon': newLongitude}))
      setWeatherCity(JSON.stringify({'lat': latitude, 'lon': newLongitude}))
      setWeatherContext(weatherContext => ({...weatherContext, latitude, longitude: newLongitude}))
    }
  }

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      showGeolocationWarningMessage('Geolocation is not supported by this browser', 335)
      return 
    }
    navigator.geolocation.getCurrentPosition((position)=> {
      const lat = position.coords.latitude.toFixed(4)
      const lon = position.coords.longitude.toFixed(4)
      setLatitude(lat)
      setLongitude(lon)
      setOtherLatLon(JSON.stringify({'lat': lat, 'lon': lon}))
      setWeatherCity(JSON.stringify({'lat': lat, 'lon': lon}))
      
      if ((weatherContext.latitude !== lat) || (weatherContext.longitude !== lat)) {
        setWeatherContext(weatherContext => ({...weatherContext, latitude: lat, longitude: lon}))
      }
    })
  }
  
  useEffect(() => {
    const gapNewsGetTime = new Date(new Date() - new Date(lastTimeWeatherCityGet))
    const diffDay = gapNewsGetTime.getUTCDate() - 1
    const diffHour = gapNewsGetTime.getUTCHours()
    if (!definedWeatherCities || diffDay || diffHour >= REFRESHWEATHERCITIES) {    
      requestUpdateWeatherCities()
    }
    checkDisabledLatitudeLongitude(weatherCity)
  })

  buildCitiesList(definedWeatherCities)

  return (
    <Styles>
        <h3 className='title'>
          <div>
            <div className="weatherSession">
              <div className="weatherTitle">Weather</div>
              <div className="weatherSelector">
                <div>
                  <select
                    className='form-control weatherDropDown'
                    onChange={handleCityChange}
                    value={weatherCity}
                    >
                    {optionItems}
                  </select>
                </div>
                <div className="latitudeLatlonMarginSession">
                  <div className="latitudeLatlonSession">
                    <div>
                      <label>
                        <input name='latitude' value={latitude} className='latlon' disabled={disabledLatitudeLongitude} onChange={handleLatitudeChange}/>
                        °N
                      </label>
                    </div>
                    <div className="latitudeLatlonMarginSession" >
                      <label>
                        <input name='longitude' value={longitude} className='latlon' disabled={disabledLatitudeLongitude} onChange={handleLongitudeChange}/>
                        °E
                      </label>
                    </div>
                  </div>
                  <div>
                    <Button variant='outline-primary' size='sm' className="latitudeLatlonButton" disabled={ disabledLatitudeLongitude } onClick={ handleGeolocation }>
                      Your Geolocation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <WetherNowCast />
            <WeatherFutureCast />
          </div>
        </h3>
    </Styles>
  )
}

export default Weather