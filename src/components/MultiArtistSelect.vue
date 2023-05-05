<template>
  <div>
    <RouterLink :to="to" class="relative">
      <div
        class="flex justify-center items-center contrast-[2] brightness-[0.87] rounded-md aspect-square overflow-hidden"
        @mouseenter="($event) => (isHover = true)"
        @mouseleave="($event) => (isHover = false)"
      >
        <!-- Overlay -->
        <div
          :class="
            isHover
              ? 'transition ease-in duration-150 bg-opacity-20'
              : 'transition ease-out duration-150 bg-opacity-5'
          "
          class="absolute w-full h-full bg-black z-10 rounded-md"
        />

        <!-- All below img elements shall appear inside the .aspect-square container div. 
          NOTE: They must be absolute, and use top, bottom, left, right to position them.
          -->
        <img :src="images.one" class="absolute contrast-[0.55] right-0 top-0 w-1/2" />
        <img :src="images.two" class="absolute contrast-[0.55] left-0 top-0 w-1/2" />
        <img
          :src="images.three"
          class="absolute contrast-[0.55] right-0 bottom-0 w-1/2"
        />
        <img :src="images.four" class="absolute contrast-[0.55] left-0 bottom-0 w-1/2" />

        <div class="absolute z-10 p-2 rounded-full bg-white inline-block">
          <Play :size="33" fillColor="#7E7E88" />
        </div>

        <div
          class="absolute z-30 flex items-center bottom-1 left-0 h-7 ml-1 bg-black rounded-full px-2 bg-opacity-10"
        >
          <img
            width="30"
            src="/images/deezer-sound-icon.png"
            class="pr-2 opacity-[0.75] brightness-[1.2]"
          />
          <div class="text-white font-bold text-[21px]">{{ category }}</div>
        </div>
      </div>
    </RouterLink>

    <!-- Create some space -->
    <div class="h-2"></div>

    <RouterLink :to="to">
      <div class="hover:underline text-gray-200 font-light text-sm">{{ text }}</div>
    </RouterLink>
  </div>
</template>

<script setup>
import { toRefs, ref } from "vue";
import { RouterLink } from "vue-router";
import Play from "vue-material-design-icons/Play.vue";

let isHover = ref(false);

const props = defineProps({ category: String, images: Object, text: String, to: String });
// Convert some props to refs
const { categories, images, text, to } = toRefs(props);
</script>
