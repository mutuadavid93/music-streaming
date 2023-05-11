<template>
  <!-- TIP: #time below is what snapToPosition() uses to query the selector -->
  <div
    :id="time"
    class="my-10 text-white opacity-100"
    :class="{ 'opacity-30': lyricsPosition !== time }"
  >
    <div v-if="words === 'INSTRAMENTAL SECTION'">
      <GuitarElectric :size="200" class="mx-auto" />
    </div>
    <div v-if="words !== 'INSTRAMENTAL SECTION'">{{ words }}</div>
  </div>
</template>

<script setup>
import { toRefs, watch } from "vue";
import lyrics from "@/lyrics.json";
import GuitarElectric from "vue-material-design-icons/GuitarElectric.vue";

// Pinia
import { useSongStore } from "@/stores/song";
import { storeToRefs } from "pinia";
const useSong = useSongStore();

// Global state
const { currentTrack, trackTime, lyricsPosition } = storeToRefs(useSong);

const props = defineProps({
  time: { type: String },
  words: { type: String },
});

// Local state from props
const { time, words } = toRefs(props);

// if the trackTime changes
watch(
  () => trackTime.value,
  (tracktime) => {
    setTimeout(() => {
      // loop through the lyrics of the current track and find the time that matches the new tracktime
      // and set the lyricsPosition to that time
      lyrics[currentTrack.value.id].forEach((res) => {
        if (res.time === tracktime) {
          lyricsPosition.value = res.time;
        }
      });
    }, 1000);
  }
);
</script>

<style lang="scss" scoped></style>
