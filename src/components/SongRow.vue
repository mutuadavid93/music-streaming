<template>
  <li
    @mouseenter="($event) => (isHover = true)"
    @mouseleave="($event) => (isHover = false)"
    class="flex items-center justify-between p-2 hover:bg-[#979797] hover:bg-opacity-5"
  >
    <!-- TIP: Also div can be inside an li element -->
    <div class="flex items-center">
      <div class="relative">
        <div
          v-if="isHover"
          class="p-1 mt-[2px] ml-[3px] absolute rounded-full bg-white cursor-pointer"
        >
          <Play
            fillColor="#EF5465"
            v-if="!isPlaying"
            @click="($event) => useSong.playOrPauseThisSong(artist, track)"
          />
          <Play
            fillColor="#EF5465"
            v-else-if="isPlaying && currentTrack.name !== track.name"
            @click="($event) => useSong.loadSong(artist, track)"
          />
        </div>

        <!-- We have the correct track thus we can add a pause btn on it -->
        <div
          v-if="track && currentTrack && currentTrack.name === track.name"
          class="p-1 mt-[2px] ml-[3px] absolute rounded-full bg-white cursor-pointer"
        >
          <Pause
            v-if="!isHover && isPlaying"
            fillColor="#EF5465"
            :size="25"
            @click="($event) => useSong.playOrPauseSong()"
          />
        </div>
        <div
          @mouseenter="($event) => (isHoverGif = true)"
          @mouseleave="($event) => (isHoverGif = false)"
          v-if="isPlaying && track && currentTrack && currentTrack.name === track.name"
          class="p-1 mt-[2px] ml-[3px] absolute rounded-full bg-white cursor-pointer"
        >
          <!-- Means we song is playing -->
          <img v-if="!isHoverGif" src="/images/audio-wave.gif" />
          <Pause
            v-if="isHoverGif"
            fillColor="#EF5465"
            :size="25"
            @click="($event) => useSong.playOrPauseSong()"
          />
        </div>

        <img width="37" :src="artist.albumCover" class="border border-[#494949]" />
      </div>

      <!-- Display the actual track -->
      <div
        v-if="track"
        :class="
          track && currentTrack && currentTrack.name === track.name
            ? 'text-[#EF5464]'
            : 'text-[#D4D4D4]'
        "
        class="text-sm pl-4 hover:underline cursor-pointer"
      >
        {{ track.id }}. {{ track.name }}
      </div>
    </div>

    <div class="flex items-center">
      <!-- rotate-45, make the child element tilted at 45 degrees -->
      <div
        v-if="track.lyrics"
        @click="($event) => openLyrics(track, artist)"
        class="rotate-45 rounded-full p-1.5 mr-3 hover:bg-[#979797] hover:bg-opacity-20 cursor-pointer"
      >
        <MicrophoneVariant fillColor="#CCCCCC" :size="21" />
      </div>
      <div
        class="rounded-full p-1.5 mr-3 hover:bg-[#979797] hover:bg-opacity-20 cursor-pointer"
      >
        <HeartOutline fillColor="#CCCCCC" :size="21" />
      </div>
      <div
        class="rounded-full p-1.5 mr-3 hover:bg-[#979797] hover:bg-opacity-20 cursor-pointer"
      >
        <DotsHorizontal fillColor="#CCCCCC" :size="21" />
      </div>
      <div
        v-if="isTrackTime"
        :class="
          track && currentTrack && currentTrack.name === track.name
            ? 'text-[#EF5464]'
            : 'text-[#D4D4D4]'
        "
        class="text-[13px] pl-10 font-[200] text-[#D4D4D4]"
      >
        {{ isTrackTime }}
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, toRefs, onMounted } from "vue";
import artist from "@/artist.json";

import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import HeartOutline from "vue-material-design-icons/HeartOutline.vue";
import MicrophoneVariant from "vue-material-design-icons/MicrophoneVariant.vue";

// Pinia
import { useSongStore } from "@/stores/song";
import { storeToRefs } from "pinia";

const useSong = useSongStore();
const { audio, isPlaying, currentTrack, isLyrics } = storeToRefs(useSong);

let isHover = ref(false);
let isHoverGif = ref(false);
let isTrackTime = ref("00:00");

const props = defineProps({
  track: {
    type: Object,
    required: true,
  },
});
// Convert the props to local state
const { track } = toRefs(props);

onMounted(() => {
  // get the duration of the song
  const audioMeta = new Audio(track.value.path);
  audioMeta.addEventListener("loadedmetadata", () => {
    const duration = audioMeta.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    isTrackTime.value = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  });
});

const openLyrics = (track, artist) => {
  // if the audio exists and isn't paused and we have correct track
  if (audio.value && !audio.value.paused && track.id === currentTrack.value.id) {
    isLyrics.value = true;
  } else if (audio.value && audio.value.paused && track.id === currentTrack.value.id) {
    // if the audio exists and is paused and we have correct track
    // then play the song
    useSong.playOrPauseSong();
    isLyrics.value = true;
  } else {
    // TODO: Can be refactored to use async await instead of timeout
    useSong.playOrPauseThisSong(artist, track);

    // wait for 500ms then show the lyrics.
    setTimeout(() => {
      isLyrics.value = true;
    }, 500);
  }
};
</script>

<style lang="scss" scoped></style>
