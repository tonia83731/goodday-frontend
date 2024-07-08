import sunny from '../assets/weathers/sunny.png'
import cloudy from '../assets/weathers/cloudy.png'
import foggy from '../assets/weathers/foggy.png'
import mostly_sunny from '../assets/weathers/mostly_sunny.png'
import partly_cloudy from '../assets/weathers/partly_cloudy.png'
import rainy from '../assets/weathers/rainy.png'
import showers from '../assets/weathers/showers.png'
import snowy from '../assets/weathers/snowy.png'
import thunderstorms from '../assets/weathers/thunderstorms.png'
import windy from '../assets/weathers/windy.png'
export const dummyWeatherData = [
  {
    id: 'SUNDAY',
    mintemp: 23,
    maxtemp: 33,
    rainPercentage: 10,
    description: 'Sunny'
  },
  {
    id: 'MONDAY',
    mintemp: 20,
    maxtemp: 30,
    rainPercentage: 30,
    description: 'Partly Cloudy'
  },
  {
    id: 'TUESDAY',
    mintemp: 18,
    maxtemp: 28,
    rainPercentage: 10,
    description: 'Sunny'
  },
  {
    id: 'WEDNESDAY',
    mintemp: 22,
    maxtemp: 32,
    rainPercentage: 20,
    description: 'Mostly Sunny'
  },
  {
    id: 'THURSDAY',
    mintemp: 19,
    maxtemp: 29,
    rainPercentage: 15,
    description: 'Partly Cloudy'
  },
  {
    id: 'FRIDAY',
    mintemp: 21,
    maxtemp: 31,
    rainPercentage: 25,
    description: 'Cloudy with a Chance of Rain'
  },
  {
    id: 'SATURDAY',
    mintemp: 17,
    maxtemp: 27,
    rainPercentage: 5,
    description: 'Clear Skies'
  }
]

export const weatherImgData = [
  {
    title: 'Sunny',
    img: sunny // Replace with actual image path or URL
  },
  {
    title: 'Clear Skies',
    img: sunny // Replace with actual image path or URL
  },
  {
    title: 'Partly Cloudy',
    img: partly_cloudy
  },
  {
    title: 'Mostly Sunny',
    img: mostly_sunny
  },
  {
    title: 'Cloudy with a Chance of Rain',
    img: mostly_sunny
  },
  {
    title: 'Cloudy',
    img: cloudy
  },
  {
    title: 'Rainy',
    img: rainy
  },
  {
    title: 'Showers',
    img: showers
  },
  {
    title: 'Thunderstorms',
    img: thunderstorms
  },
  {
    title: 'Snowy',
    img: snowy
  },
  {
    title: 'Windy',
    img: windy
  },
  {
    title: 'Foggy',
    img: foggy
  }
]

export const getWeatherData = () => {
  return dummyWeatherData.map((weather) => {
    const imgInfo = weatherImgData.find((img) => img.title === weather.description)
    return {
      ...weather,
      img: imgInfo?.img
    }
  })
}
