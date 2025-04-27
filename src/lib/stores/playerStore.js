import { writable, get } from 'svelte/store';

// Store for the currently selected track details
export const currentTrack = writable(null); // Initially null (no track selected)
// Example value: { title: 'Song Title', artist: 'Artist Name', image: '/path/to/image.jpg', durationSeconds: 319 }

// Store for playback state
export const isPlaying = writable(false);
export const currentTime = writable(0); // Current playback time in seconds
export const duration = writable(0); // Actual duration from audio element
export const volume = writable(0.8); // Volume 0 to 1
export const isLiked = writable(false); // Placeholder for track like status
export const shuffle = writable(false); // Placeholder for shuffle state
export const repeat = writable('off'); // Placeholder for repeat state ('off', 'context', 'track')

// Queue & Context
export const currentContextTracks = writable([]); // Array of track objects in current context
export const currentTrackIndex = writable(-1);    // Index in currentContextTracks
export const playQueue = writable([]);           // Explicit play queue (for future use)

// --- Actions ---

// Sets the current playing context (e.g., an album)
export function setPlayerContext(tracks, startIndex = 0) {
    currentContextTracks.set(tracks);
    currentTrackIndex.set(startIndex);
    currentTrack.set(tracks[startIndex] || null);
    isPlaying.set(true);
    currentTime.set(0);
    isLiked.set(false); // Reset like status for new track
    // Reset queue for simplicity, could be smarter
    playQueue.set([]);
}

// Plays the next track in the current context or queue blink
export function playNext() {
    const tracks = get(currentContextTracks);
    let currentIndex = get(currentTrackIndex);
    const repeatMode = get(repeat);
    const shuffleMode = get(shuffle);

    if (!tracks || tracks.length === 0) return;

    if (repeatMode === 'track') {
        currentTime.set(0); // Replay current track
        isPlaying.set(true); // Ensure playback starts if paused
        return;
    }

    let nextIndex;
    if (shuffleMode) {
        nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
        nextIndex = currentIndex + 1;
    }

    if (nextIndex >= tracks.length) {
        if (repeatMode === 'context') {
            nextIndex = 0; // Loop back to start
        } else {
            // Reached end, stop playback (or handle queue)
            isPlaying.set(false);
            // Optionally reset:
            // currentTrack.set(null);
            // currentTrackIndex.set(-1);
            return;
        }
    }
    
    setPlayerContext(tracks, nextIndex); // Use setPlayerContext to update state consistently
}

// Plays the previous track
export function playPrevious() {
    const tracks = get(currentContextTracks);
    let currentIndex = get(currentTrackIndex);
    const repeatMode = get(repeat);
    const shuffleMode = get(shuffle);

    if (!tracks || tracks.length === 0) return;

    let prevIndex;
    if (shuffleMode) {
        prevIndex = Math.floor(Math.random() * tracks.length);
    } else {
        prevIndex = currentIndex - 1;
    }

    if (prevIndex < 0) {
        if (repeatMode === 'context') {
            prevIndex = tracks.length - 1; // Loop to end
        } else {
            prevIndex = 0; // Go to start or stay at start
            currentTime.set(0); // Reset time if staying at start
            // Don't change track index if not looping
            if (currentIndex <= 0) return;
        }
    }

    setPlayerContext(tracks, prevIndex);
} 