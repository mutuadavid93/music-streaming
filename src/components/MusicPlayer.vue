<template>
  <div
    id="MusicPlayer"
    v-if="audio"
    class="fixed flex min-w-[1000px] items-center justify-between bottom-0 
    w-full z-50 h-[80px] bg-[#23232D] border-t border-t-[#383838]"
  >
    <div class="flex items-center w-2/12">
      <div class="flex items-center justify-center h-[30px] pl-4">
        <!-- disable since there is nothing before it -->
        <button
          type="button"
          class="mx-2 p-2"
          :disabled="currentTrack.id === 1"
          :class="{ 'rounded-full hover:bg-[#363636]': currentTrack.id !== 1 }"
          @click="($event) => useSong.prevSong(currentTrack)"
        >
          <SkipBackward
            :size="25"
            :fillColor="currentTrack.id == 1 ? '#747474' : '#FFFFFF'"
          />
        </button>

        <button
          type="button"
          class="p-2 rounded-full hover:bg-[#363636]"
          @click="($event) => useSong.playOrPauseThisSong(currentArtist, currentTrack)"
        >
          <Play v-if="!isPlaying" :size="45" fillColor="#FFFFFF" />
          <Pause v-else fillColor="#FFFFFF" :size="45" />
        </button>
        <button
          type="button"
          class="mx-2 p-2 rounded-full hover:bg-[#363636]"
          @click="($event) => useSong.nextSong(currentTrack)"
        >
          <SkipForward :size="25" fillColor="#FFFFFF" />
        </button>
      </div>
    </div>

    <div class="mb-2.5 w-full max-w-[50%] mx-10">
      <!-- TIP: relative elements can as well be flexed -->
      <div class="flex items-center justify-between pl-1 relative top-1 mx-7">
        <div class="flex items-center">
          <div class="bg-[#2E2E39] py-0.5 px-1 text-[10px] text-[#72727D]">ALBUM</div>
          <div class="text-white text-[14px] font-[300] ml-3">
            {{ currentTrack.name }}
          </div>
          <div class="text-white relative -top-1 left-[6px]">.</div>
          <div class="text-white text-[14px] font-[300] ml-3">
            {{ currentArtist.name }}
          </div>
        </div>

        <div class="flex items-center">
          <div
            class="p-1.5 ml-2 hover:bg-[#5A5A5A] hover:bg-opacity-50 rounded-full cursor-pointer"
          >
            <Plus :size="20" fillColor="#FFFFFF" />
          </div>
          <div
            class="p-1.5 ml-2 hover:bg-[#5A5A5A] hover:bg-opacity-50 rounded-full cursor-pointer"
          >
            <HeartOutline :size="20" fillColor="#FFFFFF" />
          </div>
          <div
            class="p-1.5 ml-2 hover:bg-[#5A5A5A] hover:bg-opacity-50 rounded-full cursor-pointer"
          >
            <Tune :size="20" fillColor="#FFFFFF" />
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <div
          v-if="isTrackTimeCurrent"
          class="text-[#8A8A8A] text-[10px] pr-2 relative -bottom-[5px]"
        >
          {{ isTrackTimeCurrent }}
        </div>

        <!-- Seeker Container -->
        <div
          ref="seekerContainer"
          class="w-full relative mt-2 mb-3"
          @mouseenter="($event) => (isHover = true)"
          @mouseleave="($event) => (isHover = false)"
        >
          <!-- TIP: `appearance-none` is a CSS class or property that is commonly used 
        to remove the default appearance or styling of form elements -->
          <!-- prettier-ignore -->
          <input type="range"
            ref="seeker"
            v-model="range"
            class="absolute rounded-full my-[7px] w-full h-0 z-40 
            appearance-none bg-opacity-100 focus:outline-none cursor-pointer"
            :class="{'rangeDotHidden': !isHover}, {'rangeDot': isHover}"
          />
          <div
            class="pointer-events-none rounded-full absolute z-10 inset-y-0 left-0 w-0"
            :style="`width: ${range}%; background-color: ${randColor.color};`"
            :class="isHover ? 'h-[4px] mt-[5px]' : 'h-[2px] mt-[6px]'"
          />
          <div
            :class="isHover ? 'h-[4px] mt-[5px]' : 'h-[2px] mt-[6px]'"
            class="absolute z-[-0] inset-y-0 left-0 w-full bg-[#C4C4C4] rounded-full"
          />
        </div>

        <div
          v-if="isTrackTimeTotal"
          class="text-[#8a8a8a] text-[10px] pl-2 relative -bottom-[5px]"
        >
          {{ isTrackTimeTotal }}
        </div>
      </div>
    </div>

    <!-- justify-end, horizontally align flex container items to the end of the container. -->
    <div class="flex items-center w-1/4 justify-end pr-6">
      <div class="flex items-center">
        <div
          class="p-2 ml-2 hover:bg-[#5A5A5A] hover:bg-opacity-50 rounded-full cursor-pointer"
        >
          <PictureInPictureBottomRight class="block" :size="17" fillColor="#FFFFFF" />
        </div>
        <div
          class="p-2 ml-2 hover:bg-[#5A5A5A] hover:bg-opacity-50 rounded-full cursor-pointer"
        >
          <ShuffleVariant class="block" :size="17" fillColor="#FFFFFF" />
        </div>

        <div
          class="relative"
          @mouseenter="($event) => (isVolumeHover = true)"
          @mouseleave="($event) => (isVolumeHover = false)"
        >
          <div
            class="p-2 ml-2 hover:bg-[#5A5A5A] hover:bg-opacity-50 rounded-full cursor-pointer"
          >
            <VolumeHigh
              v-if="currentVolume > 0"
              class="block"
              :size="17"
              fillColor="#FFFFFF"
            />
            <VolumeMute v-else class="block" :size="17" fillColor="#FFFFFF" />
          </div>

          <!-- shadow-xl, apply box shadow to an element.
          Making the element appear elevated or floating above the background. -->
          <div
            class="absolute -top-12 -left-20 p-2 px-4 bg-[#2A2A37] rounded-xl shadow-xl"
            v-show="isVolumeHover"
          >
            <MusicPlayerVolume />
          </div>
        </div>

        <div
          class="p-2 ml-2 hover:bg-[#5A5A5A] hover:bg-opacity-50 rounded-full cursor-pointer"
        >
          <Tune class="block" :size="17" fillColor="#FFFFFF" />
        </div>
      </div>

      <div class="flex items-center ml-6 border-l border-l-[#363636]">
        <img class="rounded-sm ml-6" width="28" :src="currentArtist.albumCover" />
        <div class="text-xs ml-1.5 text-white font-light">Queue</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

import MusicPlayerVolume from "@/components/MusicPlayerVolume.vue";

import ShuffleVariant from "vue-material-design-icons/ShuffleVariant.vue";
import HeartOutline from "vue-material-design-icons/HeartOutline.vue";
import MicrophoneVariant from "vue-material-design-icons/MicrophoneVariant.vue";
import Plus from "vue-material-design-icons/Plus.vue";
import Tune from "vue-material-design-icons/Tune.vue";
import PictureInPictureBottomRight from "vue-material-design-icons/PictureInPictureBottomRight.vue";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import SkipBackward from "vue-material-design-icons/SkipBackward.vue";
import SkipForward from "vue-material-design-icons/SkipForward.vue";
import VolumeHigh from "vue-material-design-icons/VolumeHigh.vue";
import VolumeMute from "vue-material-design-icons/VolumeMute.vue";

import lyrics from "@/lyrics.json";

import uniqolor from "uniqolor";

// Pinia
import { useSongStore } from "@/stores/song";
import { storeToRefs } from "pinia";
const useSong = useSongStore();

// Global State
const {
  isPlaying,
  audio,
  currentArtist,
  currentTrack,
  trackTime,
  currentVolume,
  isLyrics,
} = storeToRefs(useSong);

// Colors
let randColor = ref("");
randColor.value = uniqolor.random();

// Local state
let isHover = ref(false);
let isVolumeHover = ref(false);
let isTrackTimeCurrent = ref("0:00");
let isTrackTimeTotal = ref("0:00");
let seeker = ref(null);
let seekerContainer = ref(null);
let range = ref(0);

onMounted(() => {
  // If there is an audio file loaded
  if (audio.value) {
    setTimeout(() => {
      timeupdate();
      loadmetadata();
    }, 300);
  }

  if (currentTrack.value) {
    seeker.value.addEventListener("change", function () {
      // Update time and audio value
      const time = audio.value.duration * (seeker.value.value / 100);

      // TIP: since we are watching the audio value, it will invoke timeUpdate() and loadMetaData()
      // which will trigger timeupdate and loadedmetadata events respectively.
      audio.value.currentTime = time;
    });

    // When you click on the seeker, pause the audio
    seeker.value.addEventListener("mousedown", function () {
      audio.value.pause();
      isPlaying.value = false;
    });

    // When you let go of the mouse button, play the audio
    seeker.value.addEventListener("mouseup", function () {
      audio.value.play();
      isPlaying.value = true;
    });

    // HINT: A seeker lives inside a seeker container.
    seekerContainer.value.addEventListener("click", function (event) {
      const clickPosition =
        (event.pageX - seekerContainer.value.offsetLeft) /
        seekerContainer.value.offsetWidth;
      const time = audio.value.duration * clickPosition;

      audio.value.currentTime = time;
      seeker.value.value = (100 / audio.value.duration) * audio.value.currentTime;
    });
  }
});

const timeupdate = () => {
  // The timeupdate event is fired when the time indicated by the currentTime
  // attribute has been updated.
  audio.value.addEventListener("timeupdate", function () {
    var minutes = Math.floor(audio.value.currentTime / 60);
    var seconds = Math.floor(audio.value.currentTime - minutes * 60);

    // NOTE: if seconds value is less than 10, add a 0 in front of it e.g. "1" becomes "01"
    // but "11" stays as "11"
    isTrackTimeCurrent.value = minutes + ":" + seconds.toString().padStart(2, "0");

    // Update the same time for song global store i.e. sync them
    trackTime.value = isTrackTimeCurrent.value;

    // Get the value for the range slider
    range.value = (100 / audio.value.duration) * audio.value.currentTime;

    // Update the seeker position.
    // HINT: The seeker is the dot on the range slider. And is an HTML element
    seeker.value.value = range.value;
  });
};

const loadmetadata = () => {
  audio.value.addEventListener("loadedmetadata", function () {
    // TIP: The duration and dimensions of the media and tracks are now known.
    const duration = audio.value.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    isTrackTimeTotal.value = minutes + ":" + seconds.toString().padStart(2, "0");
  });
};

// Watch the audio value, if it changes we invoke the timeUpdate and loadMetaData functions
watch(
  () => audio.value,
  () => {
    timeupdate();
    loadmetadata();
  }
);

watch(
  () => isTrackTimeCurrent.value,
  (time) => {
    // if the track time currently is the same as the total track time
    if (time && time == isTrackTimeTotal.value) {
      // Then that song is complete, so we move to the next song
      useSong.nextSong(currentTrack.value);
    }
  }
);

// Watch for track change. If the track changes generate a new color
watch(
  () => currentTrack.value.id,
  () => {
    randColor.value = uniqolor.random();

    // If lyrics have been loaded for this song, then we can show them
    if (currentTrack.value.lyrics) {
      isLyrics.value = true;
      return;
    }

    // Else don't open lyrics panel
    isLyrics.value = false;
  }
);
</script>

<style>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
}

.rangeDot[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background-color: white;
  border-radius: 100%;
  width: 12px;
  height: 12px;
}
</style>
