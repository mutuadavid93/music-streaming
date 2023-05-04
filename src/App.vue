<script setup>
import { RouterView } from "vue-router";

// Icons
import Magnify from "vue-material-design-icons/Magnify.vue";
import Bell from "vue-material-design-icons/Bell.vue";
import SideMenuItem from "@/components/SideMenuItem.vue";
</script>

<template>
  <!-- Top Nav -->
  <div
    id="TopNav"
    class="fixed right-0 flex items-center justify-between w-[calc(100%-240px)] h-[56px] border-b border-b-[#32323D]"
  >
    <div class="flex items-center w-full">
      <Magnify class="pl-6 mt-1 pr-2" fillColor="#7E7E88" :size="22" />
      <input
        type="text"
        class="p-1 bg-transparent outline-none font-[300] placeholder-[#BEBEC7] text-[#FFFFFF] w-full max-w-xl"
        placeholder="Search"
      />
    </div>

    <div class="flex items-center pr-10">
      <div class="mr-4 p-1 hover:bg-gray-600 rounded-full cursor-pointer">
        <Bell fillColor="#FFFFFF" :size="20" />
      </div>
      <img
        src="https://yt3.ggpht.com/yti/AHyvSCDKOQ3lxeNSnUyu823Rn1KPMPA8EFigKDIbjvIMrw=s88-c-k-c0x00ffffff-no-rj-mo"
        alt="Avatar"
        class="rounded-full w-[33px]"
      />
    </div>
  </div>

  <!-- Side Nav -->
  <div
    id="SideNav"
    class="fixed w-[240px] bg-[#191922] h-[100vh] border-r border-r-[#32323D]"
  >
    <div class="w-full pl-6 pt-3 cursor-pointer">
      <RouterLink to="/" class="text-[#FFFFFF]">
        <img width="130" src="/images/deezer-logo.png" alt="" />
      </RouterLink>
    </div>

    <!-- Just a space -->
    <div class="mt-[53px]"></div>

    <!-- Menu Section -->
    <SideMenuItem iconString="music" :iconSize="20" pageURL="/" name="Music" />
    <SideMenuItem
      iconString="podcast"
      :iconSize="20"
      pageURL="/podcasts"
      name="Podcasts"
    />
    <SideMenuItem iconString="explore" :iconSize="20" pageURL="/artist" name="Explore" />
    <SideMenuItem
      iconString="favourite"
      :iconSize="20"
      pageURL="/favourite"
      name="Favourite"
    />

    <div class="text-[#A2A2AD] font-light text-[12px] pl-[62px] mt-[25px]">
      <div class="py-[9px] hover:text-[#EF5465] cursor-pointer">Favourite tracks</div>
      <div class="py-[9px] hover:text-[#EF5465] cursor-pointer">Playlist</div>
      <div class="py-[9px] hover:text-[#EF5465] cursor-pointer">Albums</div>
      <div class="py-[9px] hover:text-[#EF5465] cursor-pointer">Artists</div>
      <div class="py-[9px] hover:text-[#EF5465] cursor-pointer">Podcasts</div>
    </div>
  </div>

  <!-- The Box -->
  <div
    id="TheBox"
    class="fixed w-[calc(100%-240px)] h-[calc(100%-56px)] ml-[240px] mt-[56px] overflow-x-auto"
  >
    <!-- <RouterView /> -->
  </div>
</template>
