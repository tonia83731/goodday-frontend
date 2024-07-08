<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { taiwanCitiesZH } from './data/twCity'

export default {
  data() {
    return {
      cityOptions: taiwanCitiesZH(),
      citySelected: '臺北市',
      hamburgarToggle: false
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
    }
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
  <main
    class="mt-[90px] mb-[120px] md:mt-[120px] md:mb-[150px] flex flex-col justify-between w-full"
  >
    <RouterView />
  </main>
</template>

<style scoped></style>
