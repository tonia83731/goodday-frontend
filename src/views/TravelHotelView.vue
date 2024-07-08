<script lang="ts">
import { dummyhotel } from '../data/dummyhotel'
import TravelHotelItems from '../components/TravelHotelItems.vue'

export default {
  components: {
    TravelHotelItems
  },
  data() {
    return {
      travelHotelData: dummyhotel
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 md:grid md:grid-cols-2">
    <div class="" v-for="props in travelHotelData" :key="props.HotelID">
      <TravelHotelItems v-bind="props" />
    </div>
  </div>
</template>
