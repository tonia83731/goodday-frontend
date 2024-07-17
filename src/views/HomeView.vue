<script lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import hero_1 from '../assets/images/home_hero/hero_1.jpg'
import hero_2 from '../assets/images/home_hero/hero_2.jpg'
import hero_3 from '../assets/images/home_hero/hero_3.jpg'
import hero_4 from '../assets/images/home_hero/hero_4.jpg'
import hero_5 from '../assets/images/home_hero/hero_5.jpg'
import { getWeatherData } from '../data/weatherData'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import { useCityStore } from '../stores/useCityStore'
import { mapState, mapActions } from 'pinia'
import { getWeather36hr } from '../api/getWeatherData'

export default {
  name: 'HomeView',
  components: {
    Carousel,
    Slide,
    Pagination
  },
  data() {
    return {
      // cityOptions: taiwanCitiesZH(),
      // citySelected: '臺北市',
      currWeatherData: getWeatherData()[1],
      weatherElement: {
        wx: null,
        pop: null,
        minT: null,
        maxT: null
      },
      currTime: new Date(),
      timer: null as number | null,
      currSlides: 0,
      travelData: [
        {
          id: 'hero_1',
          img: hero_1
        },
        {
          id: 'hero_2',
          img: hero_2
        },
        {
          id: 'hero_3',
          img: hero_3
        },
        {
          id: 'hero_4',
          img: hero_4
        },
        {
          id: 'hero_5',
          img: hero_5
        }
      ]
    }
  },
  methods: {
    ...mapActions(useCityStore, ['updateCitySelected']),
    handleCitySelect(selectedOption: any) {
      // this.citySelected = selectedOption
      this.updateCitySelected(selectedOption)
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.currTime = new Date()
      }, 1000)
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    // handleSlideStart(data) {
    //   console.log(data)
    // }
    handlePrevSlide() {
      ;(this.$refs as any).carousel.prev()
    },
    handleNextSlide() {
      ;(this.$refs as any).carousel.next()
    },
    slideTo(num: number) {
      ;(this.$refs as any).carousel.slideTo(num - 1)
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
    this.startTimer()
    this.fetchWeather36hr()
  },
  beforeUnmount() {
    this.stopTimer()
  },
  computed: {
    ...mapState(useCityStore, ['citySelected', 'cityOptions']),
    currDateFormat() {
      return dayjs(this.currTime).format('YYYY-MM-DD')
    },
    currTimeFormat() {
      return dayjs(this.currTime).format('HH:mm:ss')
    }
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
  <!-- mobile -->
  <div class="flex flex-col gap-8 w-full md:hidden">
    <div class="flex flex-col gap-4">
      <carousel :items-to-show="1">
        <slide v-for="slide in travelData" :key="slide.id">
          <img :src="slide.img" :alt="slide.id" class="w-full h-80 object-cover object-center" />
        </slide>

        <template #addons>
          <!-- <navigation /> -->
          <pagination />
        </template>
      </carousel>
      <div class="text-base font-medium px-4 text-center">
        體驗台灣旅行的樂趣！從熱鬧的夜市和壯麗的景觀，到友善的當地人和豐富的文化，每一刻在台灣都保證帶來快樂和難忘的回憶。
      </div>
    </div>
    <div class="px-4">
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
    <div class="bg-sky-1 rounded py-4 px-2 mx-2 flex flex-col gap-2 justify-between items-center">
      <div class="flex justify-between text-xl font-bold gap-2">
        <h5 class="flex gap-1 items-center">
          <img src="../assets/icons/time_icon.png" alt="time" class="w-6 h-6" />
          <div class="">現在時間</div>
        </h5>
        <div>{{ currDateFormat }}, {{ currTimeFormat }}</div>
      </div>
      <img
        :src="currWeatherData.img"
        :alt="currWeatherData.description"
        class="w-20 h-20 mx-auto"
      />
      <div class="font-bold text-4xl flex items-center justify-center gap-1">
        <div class="">{{ weatherElement.minT }} <span class="text-base">°C</span></div>
        <div class="">-</div>
        <div class="">{{ weatherElement.maxT }} <span class="text-base">°C</span></div>
      </div>
      <h5 class="text-sky-4 text-lg">降雨機率: {{ weatherElement.pop }} %</h5>
    </div>
  </div>
  <!-- desktop -->
  <div class="hidden md:flex md:flex-col md:gap-8 md:justify-center md:h-[calc(100vh-280px)]">
    <div class="grid grid-cols-2 gap-8 items-center 2xl:grid-cols-3">
      <div class="flex flex-col gap-4 items-start w-4/5 mx-auto 2xl:col-span-2">
        <h1 class="text-6xl font-titan-one">GOODDAY</h1>
        <p class="text-lg font-medium w-4/5 2xl:hidden">
          體驗台灣旅行的樂趣！從熱鬧的夜市和壯麗的景觀，到友善的當地人和豐富的文化，每一刻在台灣都保證帶來快樂和難忘的回憶。
        </p>
        <div class="hidden 2xl:block text-lg font-medium w-4/5">
          體驗台灣旅行的樂趣，絕對是一次難忘的冒險。台灣擁有多樣化的景觀和文化，不論是熱愛自然、喜歡美食，還是對歷史文化充滿興趣的旅客，都能在這裡找到心之所向。
          <br />台灣的夜市是許多遊客的最愛，這裡不僅是品嚐各式各樣美食的天堂，更是了解台灣夜生活的絕佳去處。從士林夜市到饒河街觀光夜市，各種小吃讓人垂涎欲滴，如蚵仔煎、鹽酥雞、珍珠奶茶等，滿足你的味蕾。
          <br />除了美食，台灣擁有壯麗的自然景觀。你可以登上台北的象山欣賞城市全景，或是前往阿里山看日出，甚至可以在花蓮的太魯閣國家公園感受大自然的鬼斧神工。無論你走到哪裡，台灣的山水都會讓你驚嘆不已。
          <br />台灣人民的友善和熱情也讓人印象深刻。無論是在路邊攤位買東西，還是向當地人問路，你總能感受到他們的熱情和好客之心。此外，台灣豐富的文化和歷史遺產，如台南的古蹟和台北的故宮博物院，更讓人深刻體會到這塊土地的魅力。
          <br />總之，台灣旅行的每一刻都充滿驚喜和快樂，這裡的每一處風景和每一個笑臉，都會成為你最珍貴的回憶。
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex gap-6">
          <button class="" @click="handlePrevSlide">
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
          </button>
          <div class="flex gap-4 text-lg">
            <button
              class="w-9 h-9 flex justify-center items-center rounded-full"
              :class="currSlides === num - 1 ? 'bg-sky-2' : ''"
              v-for="num in 5"
              :key="num"
              @click="slideTo(num)"
            >
              0{{ num }}
            </button>
          </div>
          <button class="" @click="handleNextSlide">
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </button>
        </div>
        <carousel
          :items-to-show="1.5"
          class=""
          v-model="currSlides"
          ref="carousel"
          :wrap-around="true"
        >
          <slide v-for="slide in travelData" :key="slide.id">
            <div class="px-4 w-full h-[450px]">
              <img
                :src="slide.img"
                :alt="slide.id"
                class="w-full h-full object-cover object-center"
              />
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>
