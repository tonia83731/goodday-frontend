import { defineStore } from 'pinia'
import { taiwanCitiesZH } from '@/data/twCity'
export const useCityStore = defineStore('city', {
  state: () => ({
    citySelected: '臺北市',
    cityOptions: taiwanCitiesZH()
  }),
  actions: {
    updateCitySelected(city: string) {
      this.citySelected = city
    }
  }
})
