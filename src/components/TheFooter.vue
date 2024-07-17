<script lang="ts">
import { socialLinks } from '../data/socialLinks'
// import { taiwanCitiesZH } from '../data/twCity'
import { useCityStore } from '../stores/useCityStore'
import { mapActions, mapState } from 'pinia'
import { getWeather36hr } from '../api/getWeatherData'

export default {
  data() {
    return {
      socialLinks: socialLinks,
      screenWidth: window.innerWidth,
      weatherElement: {
        wx: null,
        pop: null,
        minT: null,
        maxT: null
      }
    }
  },
  computed: {
    ...mapState(useCityStore, ['citySelected', 'cityOptions']),
    currentPath() {
      return this.$route.path
    }
  },
  methods: {
    ...mapActions(useCityStore, ['updateCitySelected']),
    handleCitySelect(selectedOption: any) {
      // this.citySelected = selectedOption
      this.updateCitySelected(selectedOption)
    },
    updateDimensions() {
      this.screenWidth = window.innerWidth
    },
    handleWeatherData(weatherElement: any, elName: string) {
      const { parameterName } = weatherElement.filter((data: any) => data.elementName === elName)[0]
        .time[0].parameter
      return parameterName
    },
    // ---------- data fetch ----------
    async fetchWeather36hr() {
      const data = await getWeather36hr(this.citySelected)
      // console.log(data)
      const weatherElement = data[0].weatherElement
      // console.log(weatherElement)
      const wx = this.handleWeatherData(weatherElement, 'Wx')
      const pop = this.handleWeatherData(weatherElement, 'PoP')
      const minT = this.handleWeatherData(weatherElement, 'MinT')
      const maxT = this.handleWeatherData(weatherElement, 'MaxT')
      this.weatherElement = { wx, pop, minT, maxT }
      // console.log(this.weatherElement)
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateDimensions)
    this.fetchWeather36hr()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  },
  watch: {
    citySelected(newCity, oldCity) {
      if (newCity !== oldCity) {
        this.fetchWeather36hr()
      }
    }
  }
}
</script>

<template>
  <footer
    class="h-[60px] md:h-[80px] w-full px-12 flex items-center"
    :class="
      currentPath === '/' && screenWidth > 768
        ? 'bg-dark md:bg-light justify-between'
        : 'bg-dark justify-center'
    "
  >
    <div
      v-if="currentPath === '/' && screenWidth > 768"
      class="bg-sky-1 w-1/2 h-full md:flex items-center justify-center gap-8 lg:w-1/3"
    >
      <h1 class="text-4xl xl:text-6xl font-extrabold">
        {{ weatherElement.minT }}-{{ weatherElement.maxT }}°C
      </h1>
      <div class="flex flex-col gap-2 items-center justify-center">
        <v-multi-select
          v-model="citySelected"
          :options="cityOptions"
          :searchable="false"
          :close-on-select="true"
          :hide-selected="true"
          :multiple="false"
          select-label=""
        >
        </v-multi-select>
        <div class="text-base font-medium">降雨機率: {{ weatherElement.pop }}%</div>
      </div>
    </div>
    <div class="flex gap-8">
      <a :href="props.href" class="" v-for="props in socialLinks" :key="props.id">
        <img
          v-if="currentPath === '/' && screenWidth > 768"
          :src="props.img"
          :alt="props.id"
          class="w-10 h-10 object-cover"
        />
        <img
          v-else
          :src="props.img_light"
          :alt="props.id"
          class="w-8 h-8 md:w-10 md:h-10 object-cover"
        />
      </a>
    </div>
  </footer>
</template>
