<template>
  <div class="flex items-center w-full my-[20px]">
    <RouterLink
      :to="pageURL"
      :class="
        pageURL == route.path
          ? 'border-l-[#EF5465] text-[#EF5465]'
          : 'border-l-[#191922] text-[#FFFFFF]'
      "
      class="border-l-4 w-full hover:text-[#EF5465]"
      @mouseenter="($event) => isHover()"
      @mouseleave="($event) => isHover()"
    >
      <div class="flex items-center pl-3 mx-3 cursor-pointer">
        <img :width="iconSize" :src="`/images/icons/${icon}.png`" alt="" />
        <div class="pl-3.5 font-[600] text-[17px]">{{ name }}</div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { toRefs, ref, watchEffect } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  iconString: String,
  iconSize: Number,
  pageURL: String,
  name: String,
});

// Convert some props to refs
const { iconString, pageURL, name } = toRefs(props);

const icon = ref(null);

watchEffect(() => {
  // If we are in the current page and that menu is active i.e. red
  if (route.path == pageURL.value && icon.value == iconString.value + "-red") return;

  if (route.path == pageURL.value) {
    // Make the icon active
    icon.value = iconString.value + "-red";
  } else {
    // in-active
    icon.value = iconString.value + "-white";
  }
});

const isHover = () => {
  // Toggle on hover
  if (icon.value == iconString.value + "-red") {
    icon.value = iconString.value + "-white";
  } else if (icon.value == iconString.value + "-white") {
    icon.value = iconString.value + "-red";
  }
};
</script>
