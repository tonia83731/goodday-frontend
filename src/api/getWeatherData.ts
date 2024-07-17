import axios from 'axios'
import dayjs from 'dayjs'

const weather_base_url = import.meta.env.VITE_APP_WEATHER_URL
const authorized_key = import.meta.env.VITE_APP_AUTHORIZE_KEY

const weather_week = import.meta.env.VITE_APP_WEATHER_WEEK
const weather_36hr = import.meta.env.VITE_APP_WEATHER_36HR

function getTimeBasedOnCurrent() {
  const now = dayjs()
  const sixAm = now.set('hour', 6).set('minute', 0).set('second', 0)
  const sixPm = now.set('hour', 18).set('minute', 0).set('second', 0)

  const timeToUse = now.isBefore(sixPm) ? sixAm : sixPm
  return timeToUse.format('HH:mm:ss')
}
function getNextSevenDays() {
  const now = dayjs()
  const timeToUse = getTimeBasedOnCurrent()
  let dates = ''

  for (let i = 0; i <= 7; i++) {
    // dates.push(`${now.add(i, 'day').format('YYYY-MM-DD')} ${timeToUse}`)
    const addData =
      i === 7
        ? `${now.add(i, 'day').format('YYYY-MM-DD')}T${timeToUse}`
        : `${now.add(i, 'day').format('YYYY-MM-DD')}T${timeToUse},`
    dates += addData
  }

  return dates
}
export const getWeatherWeek = async (city: string) => {
  try {
    const getStartDates = getNextSevenDays()
    const res = await axios.get(
      `${weather_base_url}/${weather_week}?Authorization=${authorized_key}&locationName=${city}&elementName=MinT,MaxT,UVI,Wx,PoP12h&startTime=${getStartDates}`
    )
    // return res?.records.locations
    // console.log(res?.data.records.locations.location)
    return res?.data.records.locations
  } catch (error) {
    console.log(error)
  }
}

export const getWeather36hr = async (city: string) => {
  try {
    const timeFrom = dayjs().subtract(8, 'hours').format('YYYY-MM-DDTHH:mm:ss')
    const timeTo = dayjs().subtract(2, 'hours').format('YYYY-MM-DDTHH:mm:ss')
    const res = await axios.get(
      `${weather_base_url}/${weather_36hr}?Authorization=${authorized_key}&locationName=${city}`
    )
    // &timeFrom=${timeFrom}&timeTo=${timeTo}
    // return res?.records.locations
    // console.log(res?.data.records.location)
    return res?.data.records.location
  } catch (error) {
    console.log(error)
  }
}
