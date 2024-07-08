<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { taiwanCitiesZH } from './data/twCity'
import { socialLinks } from './data/socialLinks'

export default {
  data() {
    return {
      cityOptions: taiwanCitiesZH(),
      citySelected: '臺北市',
      hamburgarToggle: false,
      socialLinks: socialLinks,
      screenWidth: window.innerWidth
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    }
  },
  methods: {
    handleHamburgerToggle() {
      this.hamburgarToggle = !this.hamburgarToggle
    },
    updateDimensions() {
      this.screenWidth = window.innerWidth
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateDimensions)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }
}
</script>

<template>
  <header
    class="bg-light fixed top-0 left-0 z-[999] h-[60px] leading-[60px] md:h-20 md:leading-[80px] px-4 w-full"
  >
    <div class="flex justify-between items-center w-full h-full">
      <RouterLink to="/">
        <div class="flex gap-1 items-center">
          <img src="./assets/icons/logo.png" alt="GOODDAY" class="w-7 h-7 md:w-8 md:h-8" />
          <div class="font-bold font-titan-one text-2xl md:text-3xl">GOODDAY</div>
        </div>
      </RouterLink>
      <button class="text-lg md:hidden" @click="handleHamburgerToggle" v-if="!hamburgarToggle">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
      <button class="text-lg md:hidden" @click="handleHamburgerToggle" v-else>
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
      <div class="hidden md:flex md:items-center md:gap-8 md:font-medium">
        <nav class="flex gap-2">
          <RouterLink
            to="/"
            :class="currentPath === '/' && 'font-extrabold underline underline-offset-4'"
            >回到首頁</RouterLink
          >
          <RouterLink
            to="/weather"
            :class="currentPath === '/weather' && 'font-extrabold underline underline-offset-4'"
            >天氣預報</RouterLink
          >
          <RouterLink
            to="/travel"
            :class="
              currentPath.includes('/travel') && 'font-extrabold underline underline-offset-4'
            "
            >觀光景點</RouterLink
          >
        </nav>
      </div>
    </div>
  </header>
  <div
    class="w-2/3 h-full bg-sky-3 fixed top-0 z-[600] transition ease-in"
    :class="hamburgarToggle ? 'left-0 opacity-100' : '-left-[100%] opacity-0'"
  >
    <!-- Modal Logo -->
    <div class="h-[60px] leading-[60px] text-light px-4 flex items-center">
      <div class="flex gap-1 items-center">
        <img src="./assets/icons/logo_light.png" alt="GOODDAY" class="w-7 h-7" />
        <div class="font-bold font-titan-one text-2xl md:text-3xl">GOODDAY</div>
      </div>
    </div>
    <div class="h-[calc(100vh-60px)] flex flex-col justify-between py-4">
      <!-- Modal Router -->
      <nav class="flex flex-col font-medium">
        <RouterLink to="/" class="p-4" :class="currentPath === '/' && 'bg-sky-4 text-light'"
          >回到首頁</RouterLink
        >
        <RouterLink
          to="/weather"
          class="p-4"
          :class="currentPath === '/weather' && 'bg-sky-4 text-light'"
          >天氣預報</RouterLink
        >
        <RouterLink
          to="/travel"
          class="p-4"
          :class="currentPath.includes('/travel') && 'bg-sky-4 text-light'"
          >觀光景點</RouterLink
        >
      </nav>
      <!-- Selected -->
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
    </div>
  </div>
  <!-- mt-[90px] mb-[120px] md:mt-[120px] md:mb-[150px] flex flex-col gap-8 w-full -->
  <main class="mt-[75px] mb-8 md:mt-[105px]">
    <RouterView />
  </main>
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
      <h1 class="text-6xl font-extrabold">30°C</h1>
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
        <div class="text-base font-medium">降雨機率: 30%</div>
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

<style scoped></style>
