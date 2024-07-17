<script lang="ts">
import { RouterView } from 'vue-router'
import { taiwanCitiesZH } from './data/twCity'
import { socialLinks } from './data/socialLinks'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
export default {
  components: {
    TheHeader,
    TheFooter
  },
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
  <TheHeader />
  <!-- mt-[90px] mb-[120px] md:mt-[120px] md:mb-[150px] flex flex-col gap-8 w-full -->
  <main class="mt-[75px] mb-8 md:mt-[105px] w-full h-full">
    <RouterView />
  </main>
  <TheFooter />
</template>

<style scoped></style>
