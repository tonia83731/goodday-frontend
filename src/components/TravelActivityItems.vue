<script lang="ts">
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
export default {
  props: {
    ActivityID: String,
    ActivityName: String,
    Description: String,
    Class1: String,
    Class2: String,
    Phone: String,
    Organizer: String,
    StartTime: String,
    EndTime: String
  },
  data() {
    return {
      isExpanded: false
    }
  },
  computed: {
    startEvent() {
      return dayjs(this.StartTime).format('YYYY-MM-DD HH:mm')
    },
    endEvent() {
      return dayjs(this.EndTime).format('YYYY-MM-DD HH:mm')
    }
  },
  methods: {
    descriptionExpand() {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>
<!-- name & class * 1, time * 1, description * 2, organizer * 1, more  -->
<template>
  <div
    class="bg-moon-20 rounded-md px-2 md:px-8 py-1 grid grid-cols-8 md:grid-cols-7 text-xs items-center gap-0.5 md:gap-2"
  >
    <div class="flex flex-col gap-1 col-span-2 md:col-span-1">
      <div>{{ ActivityName }}</div>
      <div class="hidden md:flex md:gap-2">
        <p v-if="Class1" class="text-xs bg-sky-4 text-white rounded-sm px-2">{{ Class1 }}</p>
        <p v-if="Class2" class="text-xs bg-sky-4 text-white rounded-sm px-2">{{ Class2 }}</p>
      </div>
    </div>
    <div class="flex flex-col gap-1 justify-center items-center col-span-2 md:col-span-1">
      <div>{{ startEvent }}</div>
      <div>~ {{ endEvent }}</div>
    </div>
    <div class="col-span-3">
      <div :class="isExpanded ? '' : 'description-lime-clamp-2 overflow-ellipsis'">
        {{ Description }}
      </div>
      <button
        class="text-xs text-sky-4 underline underline-offset-2 hover:font-bold w-full text-start mt-1"
        @click="descriptionExpand()"
      >
        {{ isExpanded ? 'Close' : 'Expand' }}
      </button>
    </div>
    <div class="text-center hidden md:block">{{ Organizer }}</div>
    <button class="text-xs text-sky-4 underline underline-offset-2 hover:font-bold w-full">
      more
    </button>
  </div>
</template>
