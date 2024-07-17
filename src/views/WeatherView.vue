<script lang="ts">
import { defineComponent } from 'vue'
// import { taiwanCitiesZH } from '../data/twCity'
import { getWeatherImageData } from '../data/weatherData'
import TheNotification from '../components/TheNotification.vue'
import { mapState, mapActions } from 'pinia'
import { useCityStore } from '../stores/useCityStore'
import { getSunRiseAndSet } from '../api/getSunData'
import { getWeather36hr, getWeatherWeek } from '../api/getWeatherData'
import { getEarthquake, getTyphoon } from '../api/getNotificationData'
import dayjs from 'dayjs'

type WeekWeatherDetailProps = {
  value: string
  measures: string
}
type WeekWeatherProps = {
  startTime: string
  weekday: string
  PoP12h: WeekWeatherDetailProps
  UVI: WeekWeatherDetailProps
  MaxT: WeekWeatherDetailProps
  MinT: WeekWeatherDetailProps
  Wx: WeekWeatherDetailProps
  WxImg: string
}
export default defineComponent({
  components: {
    TheNotification
  },
  data() {
    return {
      suntime_data: {
        sunrise: null,
        sunset: null
      },
      weatherElement: {
        wx: null,
        pop: null,
        minT: null,
        maxT: null
      },
      weekweather_data: [] as WeekWeatherProps[],
      earthquakeNoti: [],
      isNotiShowed: true,
      daysOfWeek: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    }
  },
  computed: { ...mapState(useCityStore, ['citySelected', 'cityOptions']) },
  methods: {
    ...mapActions(useCityStore, ['updateCitySelected']),
    handleCitySelect(selectedOption: any) {
      // this.citySelected = selectedOption
      this.updateCitySelected(selectedOption)
    },
    handleIsNotiClose() {
      this.isNotiShowed = !this.isNotiShowed
    },
    handleWeatherData(weatherElement: any, elName: string) {
      const { parameterName } = weatherElement.filter((data: any) => data.elementName === elName)[0]
        .time[0].parameter
      return parameterName
    },
    handleMatchingDate(entries: any, startTime: any, endTime: any) {
      return entries.find(
        (entry: any) => entry.startTime === startTime && entry.endTime === endTime
      )
    },
    mergeWeatherData(data: any) {
      const mergedData: WeekWeatherProps[] = []

      data[0].time.forEach((popEntry: any) => {
        // Find corresponding entries in other elements (Wx, MinT, UVI, MaxT)
        const wxEntry = this.handleMatchingDate(data[1].time, popEntry.startTime, popEntry.endTime)
        const minTEntry = this.handleMatchingDate(
          data[2].time,
          popEntry.startTime,
          popEntry.endTime
        )
        const uviEntry = this.handleMatchingDate(data[3].time, popEntry.startTime, popEntry.endTime)
        const maxTEntry = this.handleMatchingDate(
          data[4].time,
          popEntry.startTime,
          popEntry.endTime
        )

        if (wxEntry && minTEntry && uviEntry && maxTEntry) {
          // Merge data or create a new object with all values
          const weekday_code = dayjs(popEntry.startTime).day()
          const img_code = wxEntry.elementValue[1].value
          const wximg = getWeatherImageData(img_code)
          mergedData.push({
            startTime: popEntry.startTime,
            weekday: this.daysOfWeek[weekday_code],
            PoP12h: popEntry.elementValue[0],
            Wx: wxEntry.elementValue[0],
            WxImg: wximg,
            MinT: minTEntry.elementValue[0],
            UVI: uviEntry.elementValue[0],
            MaxT: maxTEntry.elementValue[0]
          })
        }
      })
      return mergedData
    },
    // ---------- data fetch ----------
    async fetchSunRiseAndSet() {
      const data = await getSunRiseAndSet(this.citySelected)
      const { time } = data[0]
      const { SunRiseTime, SunSetTime } = time[0]
      this.suntime_data = {
        sunrise: SunRiseTime,
        sunset: SunSetTime
      }
      // console.log('fetch')
    },
    async fetchWeather36hr() {
      const data = await getWeather36hr(this.citySelected)
      const weatherElement = data[0].weatherElement
      // console.log(weatherElement)
      const wx = this.handleWeatherData(weatherElement, 'Wx')
      const pop = this.handleWeatherData(weatherElement, 'PoP')
      const minT = this.handleWeatherData(weatherElement, 'MinT')
      const maxT = this.handleWeatherData(weatherElement, 'MaxT')
      this.weatherElement = { wx, pop, minT, maxT }
      // console.log(this.weatherElement)
    },
    async fetchWeatherWeek() {
      const res = await getWeatherWeek(this.citySelected)
      const datas = res[0].location[0].weatherElement
      const weather = this.mergeWeatherData(datas)
      console.log(weather)
      this.weekweather_data = weather
    },
    async fetchEarthquake() {
      const datas = await getEarthquake()
      // console.log(datas)
      this.earthquakeNoti = datas.map((item: any) => {
        return {
          reportcontent: item.ReportContent
        }
      })
      // console.log(this.earthquakeNoti)
    }
    // async fetchTyphoon() {
    //   const datas = await getTyphoon()
    //   const { fix } = datas[0].forecastData
    // }
  },
  mounted() {
    this.fetchSunRiseAndSet()
    this.fetchWeather36hr()
    this.fetchWeatherWeek()
    // this.fetchEarthquake()
  },
  watch: {
    citySelected(newCity, oldCity) {
      if (newCity !== oldCity) {
        this.fetchSunRiseAndSet()
        this.fetchWeather36hr()
        this.fetchWeatherWeek()
      }
    }
  }
})
</script>

<template>
  <div class="container max-w-[1280px] mx-auto px-2 xl:px-0 flex flex-col gap-8">
    <div class="w-full h-32 md:h-44 relative">
      <img
        src="../assets/images/weather_hero.png"
        alt="travel hero"
        class="w-full h-full object-cover object-center"
      />
      <h2 class="font-titan-one text-sky-1 absolute bottom-2 left-2 text-3xl md:text-6xl">
        WEATHER
      </h2>
    </div>
    <div class="md:grid md:grid-cols-3">
      <!-- v-model="citySelected" -->
      <v-multi-select
        :options="cityOptions"
        :searchable="false"
        :close-on-select="true"
        :hide-selected="true"
        :multiple="false"
        :modelValue="citySelected"
        @select="handleCitySelect"
      >
      </v-multi-select>
    </div>
    <!-- notification -->
    <div v-for="({ reportcontent }, index) in earthquakeNoti" :key="'earthquake-' + index">
      <TheNotification :notification="reportcontent" />
    </div>
    <!-- sunrise & sunset & current weather -->
    <div class="grid grid-cols-2 grid-rows-2 gap-2 md:grid-cols-4 md:grid-rows-1 md:gap-4">
      <div
        class="hidden col-span-2 text-dark bg-mustard rounded-md px-4 py-2 md:flex justify-between items-center"
      >
        <div class="flex flex-col gap-1.5">
          <h5 class="font-bold text-lg">目前天氣: {{ weatherElement.wx }}</h5>
          <div class="flex gap-1 items-center">
            <img src="../assets/icons/raining_icon.png" alt="raining" class="w-4 h-4" />
            <p class="text-sm">降雨機率 {{ weatherElement.pop }}%</p>
          </div>
        </div>
        <div class="font-bold text-2xl">{{ weatherElement.minT }}-{{ weatherElement.maxT }}°C</div>
      </div>
      <div class="text-light bg-dark rounded-md px-4 py-2">
        <div class="flex gap-2 items-center">
          <img src="../assets//icons/sunrise_icon.png" alt="sunrise" class="w-7 h-7" />
          <h5 class="font-bold text-lg">日出時間</h5>
        </div>
        <div class="font-bold text-2xl text-center">{{ suntime_data.sunrise }}</div>
      </div>
      <div class="text-light bg-dark rounded-md px-4 py-2">
        <div class="flex gap-2 items-center">
          <img src="../assets//icons/sunset_icon.png" alt="sunset" class="w-7 h-7" />
          <h5 class="font-bold text-lg">日落時間</h5>
        </div>
        <div class="font-bold text-2xl text-center">{{ suntime_data.sunset }}</div>
      </div>
      <div
        class="col-span-2 text-dark bg-mustard rounded-md px-2 py-1 flex justify-between items-center md:hidden"
      >
        <div class="flex flex-col gap-1.5">
          <h5 class="font-bold text-lg">目前天氣: {{ weatherElement.wx }}</h5>
          <div class="flex gap-1 items-center">
            <img src="../assets/icons/raining_icon.png" alt="raining percentage" class="w-3 h-3" />
            <p class="text-sm">降雨機率 {{ weatherElement.pop }}%</p>
          </div>
        </div>
        <div class="font-bold text-2xl">{{ weatherElement.minT }}-{{ weatherElement.maxT }}°C</div>
      </div>
    </div>
    <!-- weekly weather -->
    <div class="flex flex-col gap-3">
      <h4 class="font-bold font-titan-one text-dark text-xl md:text-2xl">WEEKLY WEATHER</h4>
      <div class="flex flex-col gap-1.5 md:grid md:grid-cols-4 md:gap-2 lg:grid lg:grid-cols-7">
        <div
          class="w-full h-16 md:h-96 bg-sky-1 rounded-md"
          v-for="{ startTime, weekday, PoP12h, UVI, MaxT, MinT, Wx, WxImg } in weekweather_data"
          :key="startTime"
        >
          <div
            class="flex justify-between items-center gap-2 px-4 py-1 md:flex-col md:gap-4 md:px-1 md:py-4"
          >
            <img :src="WxImg" :alt="Wx.value" class="w-14" />
            <div class="">
              <h5 class="text-lg font-medium">{{ weekday }}</h5>
              <div
                class="font-bold text-2xl flex items-center gap-1 md:flex-col md:gap-2 md:text-3xl"
              >
                <div class="">{{ MinT.value }} <span class="text-base">°C</span></div>
                <div class="md:rotate-90">-</div>
                <div class="">{{ MaxT.value }} <span class="text-base">°C</span></div>
              </div>
            </div>
            <div class="flex gap-1 items-center">
              <img src="../assets/icons/rain_icon_blue.png" alt="raining percentage" class="w-8" />
              <h5 class="text-sky-4" v-if="PoP12h.value.trim() !== ''">{{ PoP12h.value }} %</h5>
              <h5 class="text-sky-4" v-else>0 %</h5>
            </div>
            <div class="flex gap-3 items-center">
              <img src="../assets/icons/uv.png" alt="raining percentage" class="w-8" />
              <h5 class="text-brick">{{ UVI.value }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
