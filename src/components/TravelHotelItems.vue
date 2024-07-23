<script lang="ts">
export default {
  props: {
    HotelID: String,
    HotelName: String,
    Description: String,
    WebsiteUrl: String,
    Picture: {
      PictureUrl1: String,
      PictureDescription1: String,
      PictureUrl2: String,
      PictureDescription2: String,
      PictureUrl3: String
    },
    Class: String,
    Phone: String,
    Address: String,
    Spec: String,
    ServiceInfo: String,
    ParkingInfo: String
  }
}
</script>

<template>
  <div class="bg-moon-20 rounded-md px-8 py-2 flex gap-4 h-full">
    <div class="w-24 h-24">
      <img
        v-if="Picture.PictureUrl1"
        :src="Picture.PictureUrl1"
        :alt="Picture.PictureDescription1"
        class="rounded-md w-full h-full object-cover object-center"
      />
      <img
        v-else
        src="../assets/images/default_img.jpg"
        alt="travel-default"
        class="rounded-md w-full h-full object-cover object-center"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <div class="flex flex-col gap-1">
        <h5 class="font-bold text-lg">{{ HotelName }}</h5>
        <div class="flex gap-2 justify-start items-center">
          <p class="text-xs bg-sky-4 text-white rounded-sm px-2">{{ Class }}</p>
          <a
            :href="'tel:' + Phone"
            class="text-base text-sky-4 underline underline-offset-2 opacity-50"
          >
            <font-awesome-icon :icon="['fas', 'square-phone']" />
          </a>
          <a
            :href="WebsiteUrl"
            class="text-base text-sky-4 underline underline-offset-2"
            target="_blank"
          >
            <font-awesome-icon :icon="['fas', 'link']" />
          </a>
        </div>
      </div>
      <div class="flex gap-1 items-center text-xs">
        <font-awesome-icon :icon="['fas', 'location-dot']" />
        <div>{{ Address }}</div>
      </div>
      <ul class="text-xs [&>li]:before:mr-1 [&>li]:before:content-['・']">
        <li v-if="ServiceInfo" className="flex">{{ ServiceInfo }}</li>
        <li v-if="ParkingInfo" className="flex">{{ ParkingInfo }}</li>
      </ul>
    </div>
  </div>
</template>
