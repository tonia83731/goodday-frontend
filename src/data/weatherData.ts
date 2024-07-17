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
import fog_rain from '../assets/weathers/fog_rain.png'
import snow_rain from '../assets/weathers/snow_rain.png'
import sun_fog_rain from '../assets/weathers/sun_fog_rain.png'
import sun_rain from '../assets/weathers/sun_rain.png'
import thunder_fog from '../assets/weathers/thunder_fog.png'

export const dummyWeatherData = [
  {
    id: 'SUNDAY',
    id_zh: '星期日',
    mintemp: 23,
    maxtemp: 33,
    rainPercentage: 10,
    description: 'Sunny'
  },
  {
    id: 'MONDAY',
    id_zh: '星期一',
    mintemp: 20,
    maxtemp: 30,
    rainPercentage: 30,
    description: 'Partly Cloudy'
  },
  {
    id: 'TUESDAY',
    id_zh: '星期二',
    mintemp: 18,
    maxtemp: 28,
    rainPercentage: 10,
    description: 'Sunny'
  },
  {
    id: 'WEDNESDAY',
    id_zh: '星期三',
    mintemp: 22,
    maxtemp: 32,
    rainPercentage: 20,
    description: 'Mostly Sunny'
  },
  {
    id: 'THURSDAY',
    id_zh: '星期四',
    mintemp: 19,
    maxtemp: 29,
    rainPercentage: 15,
    description: 'Partly Cloudy'
  },
  {
    id: 'FRIDAY',
    id_zh: '星期五',
    mintemp: 21,
    maxtemp: 31,
    rainPercentage: 25,
    description: 'Cloudy with a Chance of Rain'
  },
  {
    id: 'SATURDAY',
    id_zh: '星期六',
    mintemp: 17,
    maxtemp: 27,
    rainPercentage: 5,
    description: 'Clear Skies'
  }
]

// export const weatherImgData = [
//   {
//     code: [1],
//     img: sunny
//   },
//   {
//     code: [3, 4],
//     img: partly_cloudy
//   },
//   {
//     code: [2],
//     img: mostly_sunny
//   },
//   {
//     code: [5, 6, 7],
//     img: cloudy
//   },
//   {
//     code: [8, 9, 10, 11, 12, 13, 30],
//     img: rainy
//   },
//   {
//     code: [14],
//     img: showers
//   },
//   {
//     code: [15, 16, 17, 18, 34],
//     img: thunderstorms
//   },
//   {
//     code: [42],
//     img: snowy
//   },
//   // {
//   //   code: 'Windy',
//   //   img: windy
//   // },
//   {
//     code: [24, 25, 26, 27, 28],
//     img: foggy
//   },
//   {
//     code: [36],
//     img: thunder_fog
//   },
//   {
//     code: [35],
//     img: sun_fog_rain
//   },
//   {
//     code: [32, 38, 39, 40, 41],
//     img: fog_rain
//   },
//   {
//     code: [23, 37],
//     img: snow_rain
//   },
//   {
//     code: [19, 20, 21, 22, 29, 31, 33],
//     img: sun_rain
//   }
// ]
export const weatherImgData = new Map([
  ['1', sunny],
  ['2', mostly_sunny],
  ['3,4', partly_cloudy],
  ['5,6,7', cloudy],
  ['8,9,10,11,12,13,30', rainy],
  ['14', showers],
  ['15,16,17,18,34', thunderstorms],
  ['42', snowy],
  ['24,25,26,27,28', foggy],
  ['36', thunder_fog],
  ['35', sun_fog_rain],
  ['32,38,39,40,41', fog_rain],
  ['23,37', snow_rain],
  ['19,20,21,22,29,31,33', sun_rain]
])

export const getWeatherImageData = (code: string) => {
  const numberCode = +code
  for (const [key, value] of weatherImgData.entries()) {
    const codes = key.split(',').map(Number)
    if (codes.includes(numberCode)) return value
  }
  return ''
}
