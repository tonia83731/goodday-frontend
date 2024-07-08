<script lang="ts">
import { dummyrest } from '../data/dummyrest'
import TravelRestItems from '../components/TravelRestItems.vue'

export default {
  components: {
    TravelRestItems
  },
  data() {
    return {
      travelRestData: dummyrest
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 md:grid md:grid-cols-2">
    <div class="" v-for="props in travelRestData" :key="props.RestaurantID">
      <TravelRestItems v-bind="props" />
    </div>
  </div>
</template>
