<script lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import hero_1 from '../assets/images/home_hero/hero_1.jpg'
import hero_2 from '../assets/images/home_hero/hero_2.jpg'
import hero_3 from '../assets/images/home_hero/hero_3.jpg'
import { taiwanCitiesZH } from '../data/twCity'
import { getWeatherData } from '../data/weatherData'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'

export default {
  name: 'HomeView',
  components: {
    Carousel,
    Slide,
    Pagination
  },
  data() {
    return {
      cityOptions: taiwanCitiesZH(),
      citySelected: '臺北市',
      currWeatherData: getWeatherData()[1],
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
        }
      ]
    }
  },
  methods: {
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
    }
  },
  mounted() {
    this.startTimer()
  },
  beforeUnmount() {
    this.stopTimer()
  },
  computed: {
    currDateFormat() {
      return dayjs(this.currTime).format('YYYY-MM-DD')
    },
    currTimeFormat() {
      return dayjs(this.currTime).format('HH:mm:ss')
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
          <img :src="slide.img" :alt="slide.id" class="w-full h-60 object-cover object-center" />
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
        v-model="citySelected"
        :options="cityOptions"
        :searchable="false"
        :close-on-select="true"
        :hide-selected="true"
        :multiple="false"
        select-label=""
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
        <div class="">{{ currWeatherData.mintemp }} <span class="text-base">°C</span></div>
        <div class="">-</div>
        <div class="">{{ currWeatherData.maxtemp }} <span class="text-base">°C</span></div>
      </div>
      <h5 class="text-sky-4 text-lg">降雨機率: {{ currWeatherData.rainPercentage }} %</h5>
    </div>
  </div>
  <!-- desktop -->
  <div class="hidden md:flex md:flex-col md:gap-8">
    <div class="grid grid-cols-2 gap-8 items-center">
      <div class="flex flex-col gap-4 items-start w-4/5 mx-auto">
        <h1 class="text-6xl font-titan-one">GOODDAY</h1>
        <p class="text-lg font-medium w-4/5">
          體驗台灣旅行的樂趣！從熱鬧的夜市和壯麗的景觀，到友善的當地人和豐富的文化，每一刻在台灣都保證帶來快樂和難忘的回憶。
        </p>
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
              v-for="num in 3"
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
            <div class="px-4 h-[450px]">
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
