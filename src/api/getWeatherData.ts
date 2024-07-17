import axios from 'axios'
import dayjs from 'dayjs'

const weather_base_url = import.meta.env.VITE_APP_WEATHER_URL
const authorized_key = import.meta.env.VITE_APP_AUTHORIZE_KEY

const weather_week = import.meta.env.VITE_APP_WEATHER_WEEK
const weather_36hr = import.meta.env.VITE_APP_WEATHER_36HR

export const getWeatherWeek = async (city: string) => {
  try {
    const res = await axios.get(
      `${weather_base_url}/${weather_week}?Authorization=${authorized_key}&locationName=${city}`
    )
    // return res?.records.locations
    console.log(res)
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
