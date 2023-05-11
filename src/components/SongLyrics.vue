<template>
  <!-- h-[calc(100%-80px)], e.g. if the window height is 1000px, the element's height will be 920px,
  
  i.e. There will always be a 80px gap at the bottom of the element. 

  TIP: This gap will be occupied by the music player which has a height of 80px.
  Then #SongLyrics div will occupy the remaining dynamic space to the top.

  fixed: The element will be sticky and will not move when the user scrolls.

  mx-auto: The element will be centered horizontally.

  bg-gradient-to-r: The background will be a gradient from left to right.
  -->
  <!-- prettier-ignore -->
  <div
    id="SongLyrics"
    class="fixed w-full h-[calc(100%-80px)] 
    flex items-center mx-auto bg-gradient-to-r from-blue-400 
    to-transparent bg-purple-600 min-w-[1000px]"
  >
  
  <button 
    type="button"
    @click="$event => isLyrics = false"
    class="absolute top-0 m-8 p-2 bg-black bg-opacity-20 hover:bg-opacity-40 rounded-full"
  >
    <Close :size="30" fillColor="#FFFFFF" />
  </button>

  <div class="w-1/2 max-w-[400px] mx-auto relative flex items-center">
    <div class="absolute z-20 font-bold rounded-xl text-white text-[20px] py-1.5 px-3 m-1">
      {{ currentArtist.name }}
    </div>

    <div class="absolute right-0 z-20 font-bold rounded-xl text-white text-[20px] py-1.5 px-3 m-1">
      {{ currentTrack.name }}
    </div>

    <!-- NOTE: relative element can live inside a relative positioned parent -->
    <div class="relative">
      <img class="rounded-3xl shadow-2xl" :src="currentArtist.albumCover" />

      <!-- blur-2xl, apply a blur on this element -->
      <div class="absolute z-10 blur-2xl rounded-3xl top-0 w-full h-full bg-black bg-opacity-10"></div>
    </div>
  </div>

    <!-- The Actual Lyrics  -->

    <!-- 
      1. overflow-auto: if content exceeds space available it will create scrollbars.
      2. scrollbar-hide: hide the scrollbars when they appear but still be able to scroll.
      -->
    <div id="LyricsDiv" class="w-1/2 max-w-[600px] mx-auto relative 
    h-[calc(100%-1px)] overflow-auto scrollbar-hide">
      <div class="my-[90%]"></div>

      <div class="text-center text-[40px] font-semibold opacity-100" 
      v-for="res in lyrics[currentTrack.id]" :key="res"
      :class="snapToPosition(res)"
      v-show="res"
      >
        <LyricRow :time="res.time" :words="res.words" />
      </div>

      <div class="my-[90%]"></div>
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted } from "vue"; 
import LyricRow from "@/components/LyricRow.vue"; 
import Close from "vue-material-design-icons/Close.vue";

import artist from "@/artist.json";
import lyrics from "@/lyrics.json";

// Pinia
import { useSongStore } from "@/stores/song";
import { storeToRefs } from "pinia";
const useSong = useSongStore();

const { currentTrack, currentArtist, trackTime, isLyrics } = storeToRefs(useSong);

onMounted(() => {
  // Means we still have lyrics to show
  if (trackTime.value < lyrics[currentTrack.value.id][0].time) {
    // Scroll to the top with where it's scrollable
    document.querySelector("#LyricsDiv").scrollTop = 0;
  }
});

const snapToPosition = (res) => {
  // If the current track's lyrics' time is less than total tracktime
  // Then we still have lyrics to show
  if (res && res.time < trackTime.value) {
    let position = document.getElementById(res.time);
    if (position) {
      position.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }
};

// incase trackTime changes and it's less than the current track's lyrics' time
watch(
  () => trackTime.value,
  () => {
    setTimeout(() => {
      if (trackTime.value < lyrics[currentTrack.value.id][0].time) {
        // scroll the element with the ID "LyricsDiv" to the top
        document.querySelector("#LyricsDiv").scrollTop = 0;
      }
    }, 500);
  }
);

// if the current track changes, and the new track has lyrics, hide the lyrics' div
watch(
  () => currentTrack.value.id,
  (id) => {
    if (artist[id].lyrics) isLyrics.value = false;
  }
);
</script>

<style lang="scss" scoped></style>
