<script lang="ts">
import TravelSpotItem from '../components/TravelSpotItems.vue'
import { dummyspot } from '../data/dummyspot'

export default {
  components: {
    TravelSpotItem
  },
  data() {
    return {
      travelSpotsData: dummyspot
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 md:grid md:grid-cols-2">
    <div class="" v-for="props in travelSpotsData" :key="props.ScenicSpotID">
      <TravelSpotItem v-bind="props" />
    </div>
  </div>
</template>
