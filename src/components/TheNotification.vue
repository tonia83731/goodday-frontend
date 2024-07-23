<script lang="ts">
export default {
  props: {
    notification: {
      type: String,
      required: true
    },
    notiType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isNotiShowed: true
    }
  },
  methods: {
    handleIsNotiClose() {
      this.isNotiShowed = !this.isNotiShowed
    }
  }
}
</script>

<template>
  <div
    class="bg-brick text-light text-base px-4 py-0.5 rounded-sm flex justify-between items-center"
    :class="!isNotiShowed && 'hidden'"
  >
    <div class="flex gap-2 items-center">
      <div><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /></div>
      <div>{{ notiType === 'typhoon' ? '颱風警告' : '地震警告' }}: {{ notification }}</div>
    </div>
    <button @click="handleIsNotiClose"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
  </div>
</template>
