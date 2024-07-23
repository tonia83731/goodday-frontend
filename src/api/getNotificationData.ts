import axios from 'axios'
import dayjs from 'dayjs'
const weather_base_url = import.meta.env.VITE_APP_WEATHER_URL
const authorized_key = import.meta.env.VITE_APP_AUTHORIZE_KEY

const earthquake = import.meta.env.VITE_APP_EARTHQUAKE
const typhoon = import.meta.env.VITE_APP_TYPHOON

export const getEarthquake = async () => {
  try {
    const timeFrom = dayjs().subtract(3, 'days').format('YYYY-MM-DD') + 'T00:00:00'
    const timeTo = dayjs().format('YYYY-MM-DD') + 'T23:59:59'
    const res = await axios.get(
      `${weather_base_url}/${earthquake}?Authorization=${authorized_key}&timeFrom=${timeFrom}&timeTo=${timeTo}`
    )
    // console.log(res?.data.records.Earthquake)
    return res?.data.records.Earthquake
  } catch (error) {
    console.log(error)
  }
}

export const getTyphoon = async () => {
  try {
    const timeFrom = dayjs().format('YYYY-MM-DD') + 'T00:00:00'
    const timeTo = dayjs().format('YYYY-MM-DD') + 'T23:59:59'
    const res = await axios.get(
      `${weather_base_url}/${typhoon}?Authorization=${authorized_key}&dataset=forecastData&tau=6&timeFrom=${timeFrom}&timeTo=${timeTo}`
    )
    // console.log(res?.data.records.Earthquake)
    return res?.data.records.tropicalCyclones.tropicalCyclone
  } catch (error) {
    console.log(error)
  }
}
