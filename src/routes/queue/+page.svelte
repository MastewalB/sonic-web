<script>
    import {
        currentTrack,
        currentContextTracks,
        currentTrackIndex,
        playQueue,
        setPlayerContext,
    } from "$lib/stores/playerStore";
    import { get } from "svelte/store";

    // Reactive declarations to easily access store values
    $: track = $currentTrack;
    $: contextTracks = $currentContextTracks;
    $: contextIndex = $currentTrackIndex;
    $: queue = $playQueue;

    // Compute the list of tracks coming up next
    $: nextUpTracks = contextTracks.slice(contextIndex + 1);

    function playTrackFromContext(index) {
        const originalIndex = contextTracks.findIndex(
            (t) => t === nextUpTracks[index],
        );
        if (originalIndex !== -1) {
            setPlayerContext(get(currentContextTracks), originalIndex);
        }
    }
</script>

<div class="queue-page main-content">
    <div class="queue-header">
        <button class="active">Queue</button>
        <button>Recently played</button>
        <div class="spacer"></div>
        <button class="clear-btn">Clear queue</button>
    </div>

    {#if track}
        <section class="now-playing-section">
            <h2>Now playing</h2>
            <div class="track-item now-playing">
                <span class="track-number">1</span>
                <img
                    src={track.image}
                    alt={track.title}
                    class="track-art-small"
                />
                <div class="track-title-artist">
                    <span class="track-title">{track.title}</span>
                    <span class="track-artist">{track.artist}</span>
                </div>
                <span class="track-album">{track.albumTitle || "Single"}</span>
                <span class="track-duration">{track.duration || "--:--"}</span>
            </div>
        </section>
    {/if}

    {#if nextUpTracks.length > 0}
        <section class="next-up-section">
            <h2>Next from: {$currentTrack?.albumTitle || "Album"}</h2>
            {#each nextUpTracks as nextTrack, index}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    class="track-item next-up"
                    on:click={() => playTrackFromContext(index)}
                >
                    <span class="track-number"
                        >{index + 1 + (contextIndex + 1)}</span
                    >
                    <img
                        src={nextTrack.image}
                        alt={nextTrack.title}
                        class="track-art-small"
                    />
                    <div class="track-title-artist">
                        <span class="track-title">{nextTrack.title}</span>
                        <span class="track-artist">{nextTrack.artist}</span>
                    </div>
                    <span class="track-album"
                        >{nextTrack.albumTitle || "Single"}</span
                    >
                    <span class="track-duration"
                        >{nextTrack.duration || "--:--"}</span
                    >
                </div>
            {/each}
        </section>
    {:else if track}
        <section class="no-next-up">
            <p>No tracks queued up next.</p>
            <button>Find Songs</button>
        </section>
    {/if}
</div>

<style>
    .queue-page {
        padding: 20px;
        color: #fff;
    }

    .queue-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 30px;
        border-bottom: 1px solid #2a2a2a;
        padding-bottom: 15px;
    }
    .queue-header button {
        background: none;
        border: none;
        color: #b3b3b3;
        font-size: 1em;
        font-weight: 500;
        cursor: pointer;
        padding: 5px 0;
    }
    .queue-header button.active {
        color: #fff;
        border-bottom: 2px solid #1ed760;
    }
    .queue-header .spacer {
        flex-grow: 1;
    }
    .queue-header .clear-btn {
        font-size: 0.85em;
        text-transform: uppercase;
    }
    .queue-header .clear-btn:hover {
        color: #fff;
    }

    h2 {
        font-size: 1.2em;
        margin-bottom: 15px;
    }

    .track-item {
        display: grid;
        grid-template-columns: 30px 40px 1fr auto auto;
        align-items: center;
        gap: 15px;
        padding: 8px 10px;
        border-radius: 4px;
        margin-bottom: 5px;
        font-size: 0.9em;
    }
    .track-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .track-item.next-up {
        cursor: pointer;
    }

    .track-number {
        text-align: center;
        color: #b3b3b3;
        font-size: 0.9em;
    }

    .track-art-small {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 2px;
    }

    .track-title-artist {
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .track-title {
        color: #fff;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .track-item.now-playing .track-title {
        color: #1ed760; /* Highlight playing track title */
    }
    .track-artist {
        font-size: 0.85em;
        color: #b3b3b3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .track-album {
        font-size: 0.9em;
        color: #b3b3b3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        justify-self: start; /* Align left in its column */
        padding-right: 15px; /* Space before duration */
    }
    .track-duration {
        font-size: 0.9em;
        color: #b3b3b3;
        justify-self: end;
    }

    .no-next-up {
        text-align: center;
        margin-top: 50px;
        color: #b3b3b3;
    }
    .no-next-up button {
        background-color: #fff;
        color: #000;
        border: none;
        padding: 10px 25px;
        border-radius: 20px;
        font-weight: bold;
        margin-top: 15px;
        cursor: pointer;
    }
</style>
