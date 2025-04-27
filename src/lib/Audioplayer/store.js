import { writable } from "svelte/store";

export const trackIndex = writable(-1);
export const isPlaying = writable(false);
export const state = writable("repeat-all");
export const playQueue = writable([]);

export function setPlayerContext(tracks, index) {
    trackIndex.set(index);
    state.set("repeat-all");
    playQueue.set(tracks);
    isPlaying.set(true);
}