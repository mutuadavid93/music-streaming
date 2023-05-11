import { defineStore } from "pinia";
import artist from "@/artist.json";

export const useSongStore = defineStore("song", {
  state: () => ({
    // Defaults
    isPlaying: false,
    audio: null,
    currentArtist: null,
    currentTrack: null,
    trackTime: null,
    currentVolume: 80,
    isLyrics: false, // is the lyrics page open or not
    lyricsPosition: "0:00",
  }),
  actions: {
    loadSong(artist, track) {
      this.currentArtist = artist;
      this.currentTrack = track;

      // If there is an audio object, pause it and remove the src
      if (this.audio && this.audio.src) {
        this.audio.pause();
        this.isPlaying = false;
        this.audio.src = "";
      }

      // Else if there isn't an audio object, create one
      this.audio = new Audio();
      this.audio.src = track.path;

      // Add a timeout thus it doesn't break
      setTimeout(() => {
        this.isPlaying = true;
        this.audio.play();
      }, 200);
    },

    playOrPauseSong() {
      if (this.audio.paused) {
        this.isPlaying = true;
        this.audio.play();
      } else {
        this.isPlaying = false;
        this.audio.pause();
      }
    },

    playOrPauseThisSong(artist, track) {
      if (!this.audio || !this.audio.src || this.currentTrack.id !== track.id) {
        // load a brand new song
        this.loadSong(artist, track);
        return;
      }

      // Else play or pause the song
      this.playOrPauseSong();
    },

    prevSong(currentTrack) {
      let track = artist.tracks[currentTrack.id - 2]; // -2 because we're not counting the current track
      this.loadSong(artist, track);
    },

    nextSong(currentTrack) {
      // Go back to the start if it's the last track
      if (currentTrack.id === artist.tracks.length) {
        let track = artist.tracks[0];
        this.loadSong(artist, track);
      } else {
        // Else go to the next track
        let track = artist.tracks[currentTrack.id];
        this.loadSong(artist, track);
      }
    },

    playFromFirst() {
      this.resetState();
      let track = artist.tracks[0];
      this.loadSong(artist, track);
    },

    resetState() {
      this.isPlaying = false;
      this.audio = null;
      this.currentArtist = null;
      this.currentTrack = null;
      this.trackTime = null;
      this.currentVolume = 80;
    },
  },
  persist: true,
});
