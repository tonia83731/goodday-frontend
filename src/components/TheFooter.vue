<script lang="ts">
import { socialLinks } from '../data/socialLinks'
import { taiwanCitiesZH } from '../data/twCity'

export default {
  data() {
    return {
      cityOptions: taiwanCitiesZH(),
      citySelected: '臺北市',
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
