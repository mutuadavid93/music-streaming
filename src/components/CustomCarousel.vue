<template>
  <div>
    <div class="flex justify-between pb-5 ml-8 mr-6">
      <RouterLink
        to="/artist"
        @mouseenter="($event) => (isHoverCategory = true)"
        @mouseleave="($event) => (isHoverCategory = false)"
        :class="isHoverCategory ? 'hover:text-[#EF5465]' : 'text-white'"
        class="flex items-center font-semibold text-xl cursor-pointer"
      >
        {{ category }}
        <ChevronRight
          :fillColor="isHoverCategory ? '#EF5465' : '#FFFFFF'"
          :size="25"
          class="mt-1"
        />
      </RouterLink>

      <!-- Prev and Next buttons -->
      <div class="flex items-center">
        <button
          @click="($event) => slideTo(false)"
          type="button"
          class="rounded-full p-2 hover:bg-[#2B2B2B]"
        >
          <ChevronLeft fillColor="#FFFFFF" :size="30" />
        </button>
        <!-- Some Horizontal space -->
        <div class="px-2"></div>
        <button
          @click="($event) => slideTo(true)"
          type="button"
          class="rounded-full p-2 hover:bg-[#2B2B2B]"
        >
          <ChevronRight fillColor="#FFFFFF" :size="30" />
        </button>
      </div>
    </div>

    <!-- Actual Carousel. NOTE: snapAlign="start" means centred -->
    <Carousel
      class="mr-8"
      ref="carousel"
      v-model="currentSlide"
      :itemsToShow="4"
      :itemsToScroll="4"
      :transition="800"
      snapAlign="start"
    >
      <!-- items-baseline i.e. everything gets aligned to the top -->
      <Slide
        v-for="slide in data"
        :key="slide.song"
        class="flex items-baseline"
      >
        <SliderItem :slide="slide" />
      </Slide>
    </Carousel>
  </div>
</template>

<script setup>
import { toRefs, ref } from "vue";
import { RouterLink } from "vue-router";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

// Bring in the Vue3 Carousel component
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import SliderItem from "./SliderItem.vue";

let currentSlide = ref(0);
let isHoverCategory = ref(false);

const props = defineProps({
  category: String,
  data: Array,
});

const { category, data } = toRefs(props);

const slideTo = (val) => {
  if (val && currentSlide.value <= 7) {
    let res = currentSlide.value + 4;
    if (res <= 12) {
      currentSlide.value = currentSlide.value + 4;
    } else if (res > 12) {
      currentSlide.value = 12;
    }
  } else if (!val) {
    let res = currentSlide.value - 4;
    if (res > 0) {
      currentSlide.value = currentSlide.value - 4;
    } else if (res < 1) {
      currentSlide.value = 0;
    }
  }
};
</script>
