import { twCityDistricts } from '@/data/twCityDistricts'
export const handleCityOptions = () => {
  const datas = twCityDistricts.map(({ city }) => {
    return city
  })
  return datas
}
