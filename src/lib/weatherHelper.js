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

function isNowDay(){
  const hour = new Date().getHours()
  return (hour > 4 && hour < 18)
}

export function weatherDescriptionImage(weatherCode) {
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

export function convertTemperatureUnits(units) {
  if (units.toLowerCase() === 'c') {
    return '°C'
  } else if (units.toLowerCase() === 'f') {
    return '°F'
  } else {
    return units
  }
}

export function shortHandDay(day) {
  var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return weekday[day]
}

export function convertTemperature(value, isToFahrenheit) {
  return isToFahrenheit ? ((value * 1.8) + 32) : ((value - 32) * 0.5556)
}