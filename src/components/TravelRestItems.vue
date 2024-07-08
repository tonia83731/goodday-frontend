<script lang="ts">
export default {
  props: {
    RestaurantID: String,
    RestaurantName: String,
    Description: String,
    Picture: {
      PictureUrl1: String,
      PictureDescription1: String
    },
    Class: String,
    Phone: String,
    OpenTime: String,
    Address: String
  }
}
</script>

<template>
  <div class="bg-moon-20 rounded-md px-8 py-2 flex gap-4">
    <img
      :src="Picture.PictureUrl1"
      :alt="Picture.PictureDescription1"
      class="rounded-md w-24 h-24 object-cover object-center"
    />
    <div class="flex flex-col gap-2">
      <div class="flex flex-col gap-1">
        <h5 class="font-bold text-lg">{{ RestaurantName }}</h5>
        <div class="flex gap-2 justify-start items-center">
          <p class="text-xs bg-sky-4 text-white rounded-sm px-2">{{ Class }}</p>
          <a :href="'tel:' + Phone" class="text-base text-sky-4 underline underline-offset-2">
            <font-awesome-icon :icon="['fas', 'square-phone']" />
          </a>
        </div>
      </div>
      <div class="text-xs description-lime-clamp-2">
        {{ Description }}
      </div>
      <button
        class="text-xs text-sky-4 underline underline-offset-2 hover:font-bold w-full text-end"
      >
        more
      </button>
    </div>
  </div>
</template>
