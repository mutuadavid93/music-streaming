<template>
  <div class="max-w-[1500px] mx-auto">
    <div class="px-8 mt-8 min-w-[800px] w-full">
      <div class="text-white text-xl font-semibold inline-block">
        Mixes inspired by...
        <div class="text-sm font-light text-[#A2A2AD]">
          Discover new tracks similar to your favourites
        </div>
      </div>

      <!-- Just a little space -->
      <div class="py-3"></div>

      <div class="flex justify-between w-full gap-8">
        <!-- Media Query -->
        <!-- If size is xl or greater use w-1/3 but any other time the width is half i.e. w-1/2 -->
        <div class="xl:w-1/3 w-1/2 text-white">
          <MixesInspiredBy
            class="pb-1.5"
            text="VAMPIRE (feat. LIL GNAR)"
            by="Ic3peak"
            to="/artist"
            image="https://picsum.photos/id/147/300/300"
          />
          <MixesInspiredBy
            class="pb-1.5"
            text="Dutchavelli"
            by="Rammstein"
            to="/artist"
            image="https://picsum.photos/id/166/300/300"
          />
          <MixesInspiredBy
            class="pb-1.5"
            text="Fallen Angel"
            by="Tyla Yaweh"
            to="/artist"
            image="https://picsum.photos/id/127/300/300"
          />
        </div>

        <!-- The section gets hidden at below certain width -->
        <div class="xl:block hidden xl:w-1/3">
          <MixesInspiredBy
            class="pb-1.5"
            text="Dystopia"
            by="Magadeath"
            to="/artist"
            image="https://picsum.photos/id/156/300/300"
          />
          <MixesInspiredBy
            class="pb-1.5"
            text="Bad Life"
            by="Sigrid"
            to="/artist"
            image="https://picsum.photos/id/157/300/300"
          />
          <MixesInspiredBy
            class="pb-1.5"
            text="Pink Pony Club"
            by="Chase Atlantic"
            to="/artist"
            image="https://picsum.photos/id/158/300/300"
          />
        </div>

        <div class="xl:block hidden xl:w-1/3">
          <MixesInspiredBy
            class="pb-1.5"
            text="Winter"
            by="Willow"
            to="/artist"
            image="https://picsum.photos/id/198/300/300"
          />
          <MixesInspiredBy
            class="pb-1.5"
            text="Rakuten"
            by="Bellowhead"
            to="/artist"
            image="https://picsum.photos/id/122/300/300"
          />
          <MixesInspiredBy
            class="pb-1.5"
            text="Green Lights"
            by="Oppxsite"
            to="/artist"
            image="https://picsum.photos/id/211/300/300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MixesInspiredBy from "@/components/MixesInspiredBy.vue";
</script>

<style lang="scss" scoped></style>
