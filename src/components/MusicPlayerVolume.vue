<template>
  <div
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    class="flex items-center ml-2 w-[150px] relative mt-2 mb-[23px]"
  >
    <input
      type="range"
      ref="volume"
      v-model="currentVolume"
      class="mt-[24px] absolute rounded-full my-[7px] w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none cursor-pointer"
      :class="({ rangeDotHidden: !isHover }, { rangeDot: isHover })"
    />
    <div
      class="pointer-events-none mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0 bg-white"
      :style="`width: ${currentVolume}%;`"
    />
    <div
      class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

// Pinia
import { useSongStore } from "@/stores/song";
import { storeToRefs } from "pinia";
const useSong = useSongStore();

const { audio, currentVolume } = storeToRefs(useSong);

// Local state
let isHover = ref(false);
let volume = ref(null);

onMounted(() => {
  // listen to the value of volume and update the audio volume
  volume.value.addEventListener("input", (event) => {
    audio.value.volume = event.currentTarget.value / 100;
  });
});

watch(
  () => audio.value,
  () => {
    setTimeout(() => (audio.value.volume = currentVolume.value / 100), 200);
  }
);
</script>

<style lang="scss" scoped></style>
