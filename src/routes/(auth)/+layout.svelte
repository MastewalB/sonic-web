<div class="auth-layout">
  <slot />
</div>

<style>
  .auth-layout {
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Align form to top */
    min-height: 100vh;
    background-color: #121212; /* Dark background */
    padding-top: 5vh; /* Add some padding from the top */
  }
  /* Ensure body takes full height for centering */
  :global(body) {
      min-height: 100vh;
      margin: 0;
      font-family: 'Montserrat', sans-serif;
      background-color: #121212;
  }
  :global(#svelte) {
      height: 100%;
      display: contents;
  }
</style> 