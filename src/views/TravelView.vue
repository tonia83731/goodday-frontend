import { taiwanCitiesEN } from '../data/twCity';
<script lang="ts">
import { taiwanCitiesEN } from '../data/twCity'
export default {
  data() {
    return {
      cityOptions: taiwanCitiesEN(),
      citySelected: 'Taipei City',
      routelinks: [
        {
          id: 'spots',
          title: 'SPOTS',
          href: '/travel/spots'
        },
        {
          id: 'restaurants',
          title: 'RESTAURANTS',
          href: '/travel/restaurants'
        },
        {
          id: 'hotels',
          title: 'HOTELS',
          href: '/travel/hotels'
        },
        {
          id: 'activities',
          title: 'ACTIVITIES',
          href: '/travel/activities'
        }
      ]
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    }
  }
}
</script>

<template>
  <div class="container mx-auto flex flex-col gap-8">
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
    <nav
      class="font-titan-one text-xl grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1 text-center"
    >
      <RouterLink
        v-for="{ id, title, href } in routelinks"
        :key="id"
        :to="href"
        class="rounded-md drop-shadow-md bg-white w-full h-12 leading-[3rem] md:h-16 md:leading-[4rem]"
        :class="currentPath === href && 'border-2 border-sky-3 bg-sky-4-40'"
        >{{ title }}</RouterLink
      >
    </nav>
    <div class="">
      <RouterView />
    </div>
  </div>
</template>
