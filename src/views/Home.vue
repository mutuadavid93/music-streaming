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

    <div class="px-8 mt-8 min-w-[800px]">
      <div class="text-white text-xl font-semibold inline-block">Made for you</div>

      <div class="py-3"></div>

      <div class="flex justify-start gap-7">
        <MultiArtistSelect
          class="w-1/4"
          text="Featuring Bring Me the Horizon, Our Last Night, Bad Omens, The Retaliators"
          to="/artist"
          category="daily"
          :images="{
            one: 'https://picsum.photos/id/45/300/300',
            two: 'https://picsum.photos/id/55/300/300',
            three: 'https://picsum.photos/id/54/300/300',
            four: 'https://picsum.photos/id/76/300/300',
          }"
        />
        <MultiArtistSelect
          class="w-1/4"
          category="daily"
          text="Featuring Metallica, Jessye Norman, Dresdner Philharmonie, San Francisco Symphony"
          to="/artist"
          :images="{
            one: 'https://picsum.photos/id/123/300/300',
            two: 'https://picsum.photos/id/141/300/300',
            three: 'https://picsum.photos/id/111/300/300',
            four: 'https://picsum.photos/id/212/300/300',
          }"
        />
        <MultiArtistSelect
          class="w-1/4"
          category="daily"
          text="Featuring Panter, Alden Karik, Arturiko, Krista Masalta"
          to="/artist"
          :images="{
            one: 'https://picsum.photos/id/65/300/300',
            two: 'https://picsum.photos/id/98/300/300',
            three: 'https://picsum.photos/id/78/300/300',
            four: 'https://picsum.photos/id/74/300/300',
          }"
        />
        <MultiArtistSelect
          class="w-1/4"
          category="daily"
          text="Featuring Machine Gun Kelly, Girlfriends, Mod Sun, Chri$tian Gate$"
          to="/artist"
          :images="{
            one: 'https://picsum.photos/id/242/300/300',
            two: 'https://picsum.photos/id/121/300/300',
            three: 'https://picsum.photos/id/221/300/300',
            four: 'https://picsum.photos/id/188/300/300',
          }"
        />
      </div>
    </div>

    <div class="px-8 mt-8 min-w-[800px]">
      <div class="py-3"></div>
      <p class="text-center pb-6 text-[#D1D1D6] text-sm">
        Unlock Flow by selecting your favourite artists for improved recommendations.
      </p>

      <div class="flex justify-center gap-7 w-full">
        <div class="flex items-center justify-center relative">
          <!-- HINT: The tip is z-index, width and left measurements. Thus they appear each behind and overlapping  -->
          <img
            width="100"
            class="absolute -left-36 rounded-full z-0 cursor-pointer"
            src="https://picsum.photos/id/188/300/300"
          />
          <img
            width="115"
            class="absolute -left-[80px] rounded-full z-10 cursor-pointer"
            src="https://picsum.photos/id/66/300/300"
          />
          <img
            width="160"
            class="rounded-full z-20 cursor-pointer"
            src="https://picsum.photos/id/120/300/300"
          />
          <img
            width="115"
            class="absolute -right-[80px] rounded-full z-10 cursor-pointer"
            src="https://picsum.photos/id/141/300/300"
          />
          <img
            width="100"
            class="absolute -right-36 rounded-full z-0 cursor-pointer"
            src="https://picsum.photos/id/222/300/300"
          />
        </div>
      </div>
      
      <div class="w-full flex justify-center p-3">
        <button
          type="button"
          class="text-white text-[15px] font-semibold rounded-full bg-[#EF5465] hover:bg-[#D8384A] px-8 py-2 text-center"
        >
          ADD ARTISTS
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import MixesInspiredBy from "@/components/MixesInspiredBy.vue";
import MultiArtistSelect from "@/components/MultiArtistSelect.vue";
</script>

<style lang="scss" scoped></style>
