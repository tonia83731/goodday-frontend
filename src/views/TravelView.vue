<script lang="ts">
// import { taiwanCitiesZH } from '../data/twCity'
import { useCityStore } from '../stores/useCityStore'
import { mapState, mapActions } from 'pinia'
export default {
  data() {
    return {
      // cityOptions: taiwanCitiesZH(),
      // citySelected: '臺北市',
      routelinks: [
        {
          id: 'spots',
          title: 'SPOTS',
          title_zh: '觀光景點',
          href: '/travel/spots'
        },
        {
          id: 'restaurants',
          title: 'RESTAURANTS',
          title_zh: '觀光餐廳',
          href: '/travel/restaurants'
        },
        {
          id: 'hotels',
          title: 'HOTELS',
          title_zh: '觀光旅館',
          href: '/travel/hotels'
        },
        {
          id: 'activities',
          title: 'ACTIVITIES',
          title_zh: '觀光活動',
          href: '/travel/activities'
        }
      ]
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
    }
  }
}
</script>

<template>
  <div class="container mx-auto px-2 xl:px-0 flex flex-col gap-8 max-w-[1280px]">
    <div class="w-full h-32 md:h-44 relative">
      <img
        src="../assets/images/travel_hero.png"
        alt="travel hero"
        class="w-full h-full object-cover object-center"
      />
      <h2 class="font-titan-one text-sky-1 absolute bottom-2 left-2 text-3xl md:text-6xl">
        TRAVEL
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
    <nav
      class="font-noto-san text-xl grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1 text-center"
    >
      <RouterLink
        v-for="{ id, title_zh, href } in routelinks"
        :key="id"
        :to="href"
        class="rounded-md drop-shadow-md w-full h-12 leading-[3rem] md:h-16 md:leading-[4rem]"
        :class="
          currentPath === href
            ? 'border-2 border-sky-3 bg-sky-4-40 font-extrabold'
            : 'bg-white font-semibold'
        "
        >{{ title_zh }}</RouterLink
      >
    </nav>
    <div class="">
      <RouterView />
    </div>
  </div>
</template>
