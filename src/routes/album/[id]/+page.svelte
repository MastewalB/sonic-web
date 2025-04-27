<script>
  import { onMount } from 'svelte';

  import { trackIndex, setPlayerContext } from '$lib/Audioplayer/store.js';
  import { fly } from 'svelte/transition';

  export let data;
  let y = 0;
  let scrollContainer;

  function handleScroll() {
    y = scrollContainer.scrollTop;
  }

  const album = data;

  // --- State ---
  let showMoreMenu = false;

  // --- Functions ---
  function playTrack(trackIndex) {
    setPlayerContext(album.tracks, trackIndex); // Set context in store
  }

  function playAlbum() {
    playTrack(0); // Start playing from the first track
  }

  function toggleLikeAlbum() {
    // Placeholder: Add logic to like/unlike the whole album
    console.log('Toggle album like');
  }

  function toggleMoreMenu() {
    showMoreMenu = !showMoreMenu;
  }

  function closeMenu() {
    // Helper to close menu when clicking away
    showMoreMenu = false;
  }

  onMount(() => {
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  });
</script>


<div class="scroll-container" bind:this="{scrollContainer}">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="album-page" on:click|capture={closeMenu} role="button" tabindex="0">
    <header class="album-header" style="background: linear-gradient(rgba(0,0,0,0.6), #121212), #3a3a2a;">
      <div class="album-header-content">
        <img src={album.imageUrl} alt="{album.title} cover" class="album-art">
        <div class="album-info">
          <span class="type">Album</span>
          <h1 class="album-title">{album.title}</h1>
          <p class="details">{album.detailsLine}</p>
        </div>
      </div>
    </header>

    {#if y > 325}
      <div class="mini-bar">
        <button class="play-btn small" title="Play" on:click={playAlbum}>▶</button>
        <span class="mini-bar-title">{album.title} ScrollY : {y}</span>
      </div>
      {/if}

    <div class="album-controls">
      <button class="play-btn large" title="Play" on:click={playAlbum}>▶</button>
      <button title="Download" class="icon-btn disabled">↓</button>
      <div class="more-menu-container">
        <button title="More options" class="options-btn icon-btn" on:click|stopPropagation={toggleMoreMenu}>...</button>
        {#if showMoreMenu}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="more-menu" transition:fly={{ y: -5, duration: 150 }} on:click|stopPropagation>
            <button>Remove from Your Library</button>
            <button>Add to queue</button>
            <button>Go to artist radio</button>
            <button class="has-submenu">Add to playlist ▶</button>
            <button class="has-submenu">Share ▶</button>
          </div>
        {/if}
      </div>
    </div>

    <div class="track-list-container">
      <section class="track-list">
        <div class="track-header" class:sticky-track-header={true}>
          <span>#</span>
          <span>Title</span>
          <span>🕒</span>
        </div>
        {#each album.tracks as track, index}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div 
            class="track-item" 
            class:playing={index === $trackIndex} 
            on:click={() => playTrack(index)}
            on:dblclick={() => playTrack(index)}
          >
            <span class="track-number">{index + 1}</span>
            <div class="track-title-artist">
              <span class="track-title">{track.title}</span>
              <span class="track-artist">{track.artist}</span>
            </div>
            <span class="track-duration">{track.duration}</span>
          </div>
        {/each}
      </section>
    </div>
  </div>
</div>

<style>
  .scroll-container {
    background: #121212;
    color: white;
    position: relative;
    overflow-y: auto;
    height: 100%;
  }

  .album-page {
    display: flex;
    flex-direction: column;
    background: #121212;
    color: white;
  }

  .album-header {
    z-index: 10;
    background: linear-gradient(rgba(0, 0, 0, 0.6), #121212), #3a3a2a;
    padding: 2rem 1rem;
    transition: all 0.3s ease;
  }

  .album-header-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .album-art {
    width: 200px;
    height: 200px;
    object-fit: cover;
    transition: width 0.3s ease, height 0.3s ease;
  }

  .album-info {
    flex: 1;
    text-align: left;
    transition: font-size 0.3s ease;
  }

  .album-title {
    font-size: clamp(3rem, 5vw, 4rem);
    font-weight: 900;
    margin: 0 0 10px 0;
    line-height: 1.2;
    transition: font-size 0.3s ease;
  }

  .mini-bar {
    position: fixed;
  top: 60px;
  height: 3rem;;
  width: 100%;
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Align to the left as in the image */
    background: #121212;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #333;
    gap: 1rem; /* Add spacing between play button and title */
}

.mini-bar-title {
    font-size: 1.4rem; /* Smaller font size to match the image */
    font-weight: 600;
    color: white;
}

  .track-header {
    position: sticky;
    top: 64px; /* Adjust based on mini bar height */
    background: #121212;
    z-index: 5;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #333;
  }

  .sticky-track-header {
    position:sticky;
    top: 0;
  }

  .track-list-container {
    flex: 1;
  }

  .album-info .type {
    font-size: 0.8em;
    font-weight: bold;
    text-transform: uppercase;
    display: block;
    margin: 0 0 10px 0;
  }

  .album-info h1 {
    font-size: clamp(5em, 6vw, 4.5em); /* Responsive font size */
    font-weight: 900;
    margin: 0 0 10px 0;
    line-height: 1;
  }

  .album-info .details {
    font-size: 0.9em;
    color: #b3b3b3;
    margin: 0;
  }

  .album-controls {
    padding: 24px 20px;
    display: flex;
    align-items: center;
    gap: 24px;
    flex-shrink: 0;
  }

  .play-btn.large {
    font-size: 2rem;
    margin-top: 1rem;
    background: green;
    border: none;
    border-radius: 9999px;
    width: 64px;
    height: 64px;
    color: white;
    cursor: pointer;
  }

  .play-btn.small {
    font-size: 1rem; /* Smaller to match the image */
    background: #1db954; /* Spotify green */
    border: none;
    border-radius: 9999px;
    width: 32px; /* Smaller size */
    height: 32px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

  .play-btn.large:hover {
    transform: scale(1.05);
    background-color: #1fdf64;
  }


  .icon-btn {
    background: none;
    border: none;
    color: #b3b3b3;
    font-size: 1.8em;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }

  .icon-btn:hover:not(.disabled) {
    color: #fff;
  }

  .icon-btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .options-btn {
    font-weight: bold;
    letter-spacing: 1px;
  }

  .more-menu-container {
    position: relative; /* For menu positioning */
  }

  .more-menu {
    position: absolute;
    bottom: 100%; /* Position above button */
    left: 0;
    background-color: #282828;
    border-radius: 4px;
    padding: 5px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
    z-index: 100;
    min-width: 180px;
    margin-bottom: 10px; /* Space from button */
  }

  .more-menu button {
    display: block;
    width: 100%;
    padding: 10px 12px;
    background: none;
    border: none;
    color: #b3b3b3;
    text-align: left;
    font-size: 0.9em;
    border-radius: 2px;
  }

  .more-menu button:hover {
    background-color: #3e3e3e;
    color: #fff;
  }

  .more-menu button.has-submenu {
    display: flex;
    justify-content: space-between;
  }

  .track-list {
    display: flex;
    flex-direction: column;
  }

  .track-list-container {
    flex: 1; /* Take remaining space */
    padding: 1rem;
  }

  .track-header,
  .track-item {
    display: grid;
    grid-template-columns: 30px 1fr auto;
    align-items: center;
    gap: 15px;
    padding: 8px 10px;
    color: #b3b3b3;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.9em;
  }

  .track-header {
    font-size: 0.8em;
    border-bottom: 1px solid #2a2a2a;
    position: sticky; /* Keep header visible */
    top: 64px; /* Adjust based on mini bar height */
    background-color: #121212; /* Match main content bg */
    z-index: 1;
  }

  .track-item {
    display: grid;
    grid-template-columns: 40px 1fr 50px;
    align-items: center;
    padding: 8px 16px;
    cursor: pointer;
    border-bottom: 1px solid #222;
    transition: background 0.2s;
  }

  .track-item:hover {
    background: #1e1e1e;
  }

  .track-item:hover .track-title {
    color: #fff;
  }

  .track-number {
    text-align: right;
  }

  .track-title-artist {
    display: flex;
    flex-direction: column;
  }

  .track-title {
    color: #fff;
    font-weight: 500;
    margin-bottom: 3px;
  }

  .track-artist {
    font-size: 0.85em;
    color: #b3b3b3;
  }

  .track-duration {
    justify-self: end; /* Align duration to the right */
    font-size: 0.85em;
  }

  .track-item.playing .track-title {
    color: #1ED760; /* Spotify Green for playing track */
  }

  .track-item.playing .track-number {
    color: #1ED760; /* Also color number */
  }
</style>