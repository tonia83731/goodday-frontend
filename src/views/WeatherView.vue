<script lang="ts">
import { defineComponent } from 'vue'
import { taiwanCitiesZH } from '../data/twCity'
import { getWeatherData } from '../data/weatherData'

export default defineComponent({
  data() {
    return {
      cityOptions: taiwanCitiesZH(),
      citySelected: '臺北市',
      isNotiShowed: true,
      weatherData: getWeatherData()
    }
  },
  methods: {
    handleIsNotiClose() {
      this.isNotiShowed = !this.isNotiShowed
    }
  }
})
</script>

<template>
  <div class="container mx-auto flex flex-col gap-8">
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
    <!-- notification -->
    <div
      class="bg-brick text-light text-base px-4 py-0.5 rounded-sm flex justify-between items-center"
      :class="!isNotiShowed && 'hidden'"
    >
      <div class="flex gap-2 items-center">
        <div><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /></div>
        <div>Earthquake alert: There was an earthquake at 13:00</div>
      </div>
      <button @click="handleIsNotiClose"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
    </div>
    <!-- sunrise & sunset & current weather -->
    <div class="grid grid-cols-2 grid-rows-2 gap-2 md:grid-cols-4 md:grid-rows-1 md:gap-4">
      <div
        class="hidden col-span-2 text-dark bg-mustard rounded-md px-4 py-2 md:flex justify-between items-center"
      >
        <div class="flex flex-col gap-1.5">
          <h5 class="font-bold text-lg">目前天氣</h5>
          <div class="flex gap-1 items-center">
            <img src="../assets/icons/raining_icon.png" alt="raining" class="w-4 h-4" />
            <p class="text-sm">降雨機率 30%</p>
          </div>
        </div>
        <div class="font-bold text-2xl">30°C</div>
      </div>
      <div class="text-light bg-dark rounded-md px-4 py-2">
        <div class="flex gap-2 items-center">
          <img src="../assets//icons/sunrise_icon.png" alt="sunrise" class="w-7 h-7" />
          <h5 class="font-bold text-lg">日出時間</h5>
        </div>
        <div class="font-bold text-2xl text-center">06:00</div>
      </div>
      <div class="text-light bg-dark rounded-md px-4 py-2">
        <div class="flex gap-2 items-center">
          <img src="../assets//icons/sunset_icon.png" alt="sunset" class="w-7 h-7" />
          <h5 class="font-bold text-lg">日落時間</h5>
        </div>
        <div class="font-bold text-2xl text-center">18:30</div>
      </div>
      <div
        class="col-span-2 text-dark bg-mustard rounded-md px-2 py-1 flex justify-between items-center md:hidden"
      >
        <div class="flex flex-col gap-1.5">
          <h5 class="font-bold text-lg">目前天氣</h5>
          <div class="flex gap-1 items-center">
            <img src="../assets/icons/raining_icon.png" alt="raining percentage" class="w-3 h-3" />
            <p class="text-sm">降雨機率 30%</p>
          </div>
        </div>
        <div class="font-bold text-2xl">30°C</div>
      </div>
    </div>
    <!-- weekly weather -->
    <div class="flex flex-col gap-3">
      <h4 class="font-bold font-titan-one text-dark text-xl md:text-2xl">WEEKLY WEATHER</h4>
      <div class="flex flex-col gap-1.5 md:grid md:grid-cols-4 md:gap-2 lg:grid lg:grid-cols-7">
        <div
          class="w-full h-16 md:h-80 bg-sky-1 rounded-md"
          v-for="props in weatherData"
          :key="props.id"
        >
          <div
            class="flex justify-between items-center gap-2 px-4 py-1 md:flex-col md:gap-4 md:px-1 md:py-4"
          >
            <img :src="props.img" :alt="props.description" class="w-14" />
            <div class="">
              <h5 class="text-lg font-medium">{{ props.id_zh }}</h5>
              <div
                class="font-bold text-2xl flex items-center gap-1 md:flex-col md:gap-2 md:text-3xl"
              >
                <div class="">{{ props.mintemp }} <span class="text-base">°C</span></div>
                <div class="md:rotate-90">-</div>
                <div class="">{{ props.maxtemp }} <span class="text-base">°C</span></div>
              </div>
            </div>
            <div class="flex gap-1 items-center">
              <img src="../assets/icons/rain_icon_blue.png" alt="raining percentage" class="w-8" />
              <h5 class="text-sky-4">{{ props.rainPercentage }} %</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
