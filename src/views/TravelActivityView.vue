<script lang="ts">
import { dummyacti } from '../data/dummyacti'
import TravelActivityItems from '@/components/TravelActivityItems.vue'

export default {
  components: {
    TravelActivityItems
  },
  data() {
    return {
      travelActiData: dummyacti
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="font-bold text-center bg-sky-2 grid grid-cols-8 md:grid-cols-7 px-2 md:px-8 py-2 rounded-md"
    >
      <div class="col-span-2 md:col-span-1">Name</div>
      <div class="col-span-2 md:col-span-1">Date</div>
      <div class="col-span-3">Description</div>
      <div class="hidden md:block">Organizer</div>
      <div></div>
    </div>
    <div class="flex flex-col gap-4">
      <div v-for="props in travelActiData" :key="props.ActivityID">
        <TravelActivityItems v-bind="props" />
      </div>
    </div>
  </div>
</template>
