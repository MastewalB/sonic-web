<script>
    import { createEventDispatcher, tick } from "svelte";
    import { trackIndex, isPlaying, playQueue, state } from "./store.js";
    import { displayDuration } from "./utils.js";

    const dispatch = createEventDispatcher();

    export const playbackloop = {
        repeat: "repeat",
        repeatAll: "repeat-all",
        noRepeat: "no-repeat",
    };

    export let volume = 1;
    export let shuffle = false;
    export let loop = "repeat-all";

    // Initialize from localStorage
    if (typeof window !== "undefined") {
        const storedVolume = +localStorage.getItem("volume");
        if (!isNaN(storedVolume)) volume = storedVolume;

        shuffle = localStorage.getItem("shuffle") === "true" || false;
        loop = localStorage.getItem("loop") || "repeat-all";
    }


    /**@type {HTMLAudioElement}*/
    export let audio = {};

    let duration = 0;

    $: trackprogress = 0;

    $: currentTrack = playQueue[$trackIndex];

    $: {
        // Change the state to repeat or not
        state.set(loop);
        if (typeof window != "undefined") {
            localStorage.setItem("loop", loop.toString());
        }
    }

    $: {
        // set the audio volume
        audio.volume = volume;
        if (typeof window != "undefined") {
            localStorage.setItem("volume", volume.toString());
        }
    }

    let previousTrackIndex = -1;

    $: if (
        audio &&
        $playQueue.length > 0 &&
        $trackIndex >= 0 &&
        $trackIndex !== previousTrackIndex
    ) {
        tick().then(() => {
            console.log("Audio source changed:", $playQueue[$trackIndex]);
            console.log({
                trackIndex: $trackIndex,
                state: $state,
                shuffle: shuffle,
            });
            audio.src = $playQueue[$trackIndex]?.audioSrc;
            if ($isPlaying) {
                audio.load();

                previousTrackIndex = $trackIndex;
                audio.play().catch((e) => {
                    console.error("Error trying to play audio:", e);
                });
            }
        });
    }

    //Loads the metadata
    function loadedMetadata(e) {
        duration = audio.duration;
        audio.volume = volume;
        dispatch("loadedmetadata", e);
    }
    // runs every time audio currentTime changes
    function timeUpdate(e) {
        trackprogress = audio.currentTime ?? 0;
        dispatch("timeupdate", e);
    }
    // runs after an audio has finished playing
    function ended(e) {
        //Repeat all audio one after another
        if ($state === "repeat-all") {
            // if shuffle is true play audio of any random number track
            if (shuffle)
                trackIndex.set(Math.floor(Math.random() * playQueue.length));
            else playNext();
        }
        // Repeat the same audio
        else if ($state === "repeat") audio.play();
        // Stop playing
        else isPlaying.set(false);

        dispatch("ended", e);
    }

    function togglePlay() {
        if ($trackIndex) {
            // Only toggle if a track is loaded
            isPlaying.set((playing) => !playing);
        }
    }

    function changeVolume(e) {
        volume = +e.target.value ?? 1;
    }

    // change loop to repeat, no repeat or repeat all
    function changeState() {
        if (loop === "no-repeat") loop = "repeat";
        else if (loop === "repeat") loop = "repeat-all";
        else loop = "no-repeat";
    }

    function mute() {
        if (audio.volume != 0) volume = 0;
        else volume = 1;
    }

    function onSeek(e) {
        audio.currentTime = +e.target.value || 0;
        trackprogress = audio.currentTime ?? 0;
    }

    // play previous track
    function playPrevious() {
        if ($trackIndex - 1 < 0) trackIndex.set(0);
        else trackIndex.set($trackIndex - 1);
    }
    // play next track
    function playNext() {
        if ($trackIndex < $playQueue.length - 1)
            trackIndex.set($trackIndex + 1);
        else trackIndex.set(0);
    }
    // enable/disable shuffle
    function setShuffle() {
        shuffle = !shuffle;
        localStorage.setItem("shuffle", shuffle.toString());
    }

    //Event dispatch
    const canplay = (e) => dispatch("canplay", e);
    const canplaythrough = (e) => dispatch("canplaythrough", e);
    const durationchange = (e) => dispatch("durationchange", e);
    const loadeddata = (e) => dispatch("loadeddata", e);
    const playing = (e) => dispatch("playing", e);
    const stalled = (e) => dispatch("stalled", e);
    const ratechange = (e) => dispatch("ratechange", e);
    const suspend = (e) => dispatch("suspend", e);
    const waiting = (e) => dispatch("waiting", e);
    const volumechange = (e) => dispatch("volumechange", e);
</script>

<audio
    bind:this={audio}
    class="d-none"
    prefetch="auto"
    on:loadedmetadata={loadedMetadata}
    on:timeupdate={timeUpdate}
    on:ended={ended}
    on:canplay={canplay}
    on:canplaythrough={canplaythrough}
    on:durationchange={durationchange}
    on:loadeddata={loadeddata}
    on:playing={playing}
    on:stalled={stalled}
    on:ratechange={ratechange}
    on:suspend={suspend}
    on:waiting={waiting}
    on:volumechange={volumechange}
>
</audio>

<footer class="player">
    <div class="now-playing-info">
        {#if $currentTrack}
            {@const imageSrc = $currentTrack.image}
            {#if imageSrc}
                <img
                    src={imageSrc}
                    alt="{$currentTrack.title} cover"
                    class="player-track-art"
                />
            {:else}
                <div class="player-track-art placeholder">?</div>
                <!-- Placeholder if no image -->
            {/if}
            <div class="player-track-details">
                <span class="player-track-title">{$currentTrack.title}</span>
                <span class="player-track-artist">{$currentTrack.artist}</span>
            </div>
            <!-- <button 
                title={$isLiked ? 'Remove from Your Library' : 'Save to Your Library'}
                class="like-btn {$isLiked ? 'liked' : ''}" 
                on:click={toggleLike}
            >
                {#if $isLiked}♥{:else}♡{/if}
            </button> -->
        {/if}
    </div>

    <div class="player-controls-center">
        <div class="player-controls-buttons">
            <!-- <button title="Shuffle" class="shuffle-btn {$shuffle ? 'active' : ''}" on:click={toggleShuffle}>🔀</button> -->
            <button
                title="Previous"
                on:click={playPrevious}
                disabled={!$trackIndex}>⏮</button
            >
            <button
                title={$isPlaying ? "Pause" : "Play"}
                on:click={togglePlay}
                disabled={!$trackIndex}
                class="play-pause-btn"
            >
                {#if $isPlaying}⏸{:else}▶{/if}
            </button>
            <button title="Next" on:click={playNext}>⏭</button>
            <!-- <button title="Repeat" class="repeat-btn {$repeat !== 'off' ? 'active' : ''}" on:click={toggleRepeat}>
                {#if $repeat === 'track'}🔁¹{:else}🔁{/if}
            </button> -->
        </div>
        <div class="playback-bar">
            <span class="time current">{displayDuration(trackprogress)}</span>
            <input
                type="range"
                min="0"
                max={duration || 1}
                value={trackprogress}
                on:input={onSeek}
                class="progress-slider"
                style="--progress: {(trackprogress / (duration || 1)) * 100}%"
            />
            <span class="time total">{displayDuration(duration)}</span>
        </div>
    </div>

    <div class="player-extra-controls">
        <button title="Lyrics">🎤</button>
        <a href="/queue" title="Queue">☰</a>
        <!-- Link to queue page -->
        <button title="Connect to a device">💻</button>
        <div class="volume-control">
            <button title="Volume">🔊</button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                bind:value={volume}
                on:input={changeVolume}
                class="volume-slider"
                style="--volume: {volume * 100}%"
            />
        </div>
    </div>
</footer>

<style>
    .player {
        /* grid-row: 3 / 4; Removed */
        /* grid-column: 1 / 2; Removed */
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000; /* Ensure high z-index */
        background-color: #181818;
        height: 80px;
        border-top: 1px solid #282828;
        display: grid;
        grid-template-columns: minmax(180px, 1fr) 2fr minmax(180px, 1fr);
        align-items: center;
        padding: 0 20px;
        gap: 20px;
    }

    .now-playing-info {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0; /* Prevent overflow issues */
        justify-content: flex-start;
    }

    .player-track-art {
        width: 56px;
        height: 56px;
        object-fit: cover;
        border-radius: 4px;
    }

    .player-track-details {
        display: flex;
        flex-direction: column;
        overflow: hidden; /* Hide overflowing text */
    }

    .player-track-title,
    .player-track-artist {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .player-track-title {
        color: #fff;
        font-size: 0.9em;
    }

    .player-track-artist {
        color: #b3b3b3;
        font-size: 0.8em;
    }

    .player-controls-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .player-controls-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        width: 100%;
    }

    .player-controls-buttons button {
        background: none;
        border: none;
        color: #b3b3b3;
        font-size: 1.2em;
        cursor: pointer;
        transition: color 0.2s ease;
    }
    .player-controls-buttons button:hover:not(:disabled) {
        color: #fff;
    }
    .player-controls-buttons button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    .player-controls-buttons .play-pause-btn {
        /* font-size: 1em; */
        background-color: #fff;
        color: #000;
        border-radius: 50%;
        width: 1.5em;
        height: 1.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        place-items: center;
        /* line-height: 1; */
    }
    .player-controls-buttons .play-pause-btn:hover:not(:disabled) {
        transform: scale(1.05);
        background-color: #f0f0f0;
    }

    /*
     .shuffle-btn.active,
    .repeat-btn.active {
        color: #1ED760;
    }
    */

    .playback-bar {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        max-width: 700px; /* Increased width */
    }

    .playback-bar .time {
        font-size: 0.75em;
        color: #b3b3b3;
        min-width: 30px; /* Prevent resizing */
        text-align: center;
    }

    .playback-bar .progress-slider {
        flex-grow: 1;
        cursor: pointer;
        /* Basic slider reset */
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 4px;
        background: #4d4d4d;
        border-radius: 2px;
        outline: none;
        --track-color: #fff; /* Color for the filled part */
    }

    .playback-bar .progress-slider:hover {
        --track-color: #1ed760;
    }
    .playback-bar .progress-slider:disabled {
        cursor: not-allowed;
    }

    /* Track styling */
    .playback-bar .progress-slider {
        background: linear-gradient(
            to right,
            var(--track-color) 0%,
            var(--track-color) var(--progress, 0%),
            #4d4d4d var(--progress, 0%),
            #4d4d4d 100%
        );
    }

    /* Thumb styling (basic) */
    .playback-bar .progress-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 12px; /* Initially hidden */
        height: 12px;
        background: #fff;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0; /* Hide thumb by default */
        transition: opacity 0.1s ease-in-out;
    }
    .playback-bar .progress-slider::-moz-range-thumb {
        width: 12px;
        height: 12px;
        background: #fff;
        border-radius: 50%;
        cursor: pointer;
        border: none;
        opacity: 0;
        transition: opacity 0.1s ease-in-out;
    }

    /* Show thumb on hover */
    .playback-bar:hover .progress-slider::-webkit-slider-thumb,
    .playback-bar:hover .progress-slider::-moz-range-thumb {
        opacity: 1;
    }

    .player-extra-controls {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #b3b3b3;
        gap: 15px;
    }

    .player-extra-controls button {
        background: none;
        border: none;
        color: #b3b3b3;
        font-size: 1.1em;
        cursor: pointer;
    }
    .player-extra-controls button:hover {
        color: #fff;
    }

    .volume-control {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .volume-control .volume-slider {
        /* Basic slider reset */
        -webkit-appearance: none;
        appearance: none;
        width: 80px; /* Adjust width */
        height: 4px;
        background: #4d4d4d;
        border-radius: 2px;
        outline: none;
        cursor: pointer;
        --track-color: #fff;
    }
    .volume-control:hover .volume-slider {
        --track-color: #1ed760;
    }

    /* Volume Track styling */
    .volume-control .volume-slider {
        background: linear-gradient(
            to right,
            var(--track-color) 0%,
            var(--track-color) var(--volume, 80%),
            #4d4d4d var(--volume, 80%),
            #4d4d4d 100%
        );
    }

    /* Volume Thumb styling (basic) */
    .volume-control .volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 12px;
        height: 12px;
        background: #fff;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.1s ease-in-out;
    }
    .volume-control .volume-slider::-moz-range-thumb {
        width: 12px;
        height: 12px;
        background: #fff;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.1s ease-in-out;
    }
    /* Show Volume thumb on hover */
    .volume-control:hover .volume-slider::-webkit-slider-thumb,
    .volume-control:hover .volume-slider::-moz-range-thumb {
        opacity: 1;
    }

    .like-btn {
        background: none;
        border: none;
        color: #b3b3b3;
        font-size: 1.2em;
        margin-left: 10px;
        cursor: pointer;
    }
    .like-btn:hover {
        color: #fff;
    }
    .like-btn.liked {
        color: #1ed760; /* Spotify Green */
    }

    .player-track-art.placeholder {
        background-color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
    }
</style>
