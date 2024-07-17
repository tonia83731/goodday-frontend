import axios from 'axios'
import dayjs from 'dayjs'
const weather_base_url = import.meta.env.VITE_APP_WEATHER_URL
const authorized_key = import.meta.env.VITE_APP_AUTHORIZE_KEY

const sun = import.meta.env.VITE_APP_SUN

export const getSunRiseAndSet = async (city: string) => {
  try {
    const date = dayjs().format('YYYY-MM-DD')
    const res = await axios.get(
      `${weather_base_url}/${sun}?Authorization=${authorized_key}&CountyName=${city}&Date=${date}`
    )
    // return res?.records.locations
    // console.log(res?.data.records.locations.location)
    return res?.data.records.locations.location
  } catch (error) {
    console.log(error)
  }
}
