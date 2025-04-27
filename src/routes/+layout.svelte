<script>
    import '../app.css'; // Import global styles
    import { onMount, onDestroy } from 'svelte';

    import Audioplayer from '../lib/Audioplayer/Audioplayer.svelte';

    let sidebarWidth = 300; // Initial width
    let isResizing = false;

    function handleMouseDown(event) {
        isResizing = true;
        // Add listeners to the window to track mouse move and up events
        // outside the resizer element itself.
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseMove(event) {
        if (!isResizing) return;

        // Calculate new width - prevent going too small or too large
        const newWidth = Math.max(200, Math.min(event.clientX, 600)); 
        sidebarWidth = newWidth;

        // Optional: Add user-select none to body to prevent text selection during drag
        document.body.style.userSelect = 'none';
    }

    function handleMouseUp() {
        if (isResizing) {
            isResizing = false;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            // Remove user-select none
            document.body.style.userSelect = '';
        }
    }


    // --- Keyboard Listener ---
    function handleKeyDown(event) {
        // Ignore if typing in an input/textarea
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }
        // Space bar toggles play/pause
        if (event.code === 'Space') {
            event.preventDefault(); // Prevent scrolling
            togglePlay();
        }
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    });

</script>

<!-- App Bar -->
<header class="app-bar">
    <div class="nav-buttons">
        <button title="Go back" disabled>&lt;</button>
        <button title="Go forward" disabled>&gt;</button>
    </div>
    <div class="search-bar">
        <input type="text" placeholder="What do you want to play?" />
    </div>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <div class="user-controls">
        <a href="#">Premium</a>
        <a href="#">Support</a>
        <a href="#">Download</a>
        <span class="separator">|</span>
        <button class="signup-btn">Sign up</button>
        <a href="/login" class="login-btn">Log in</a>
    </div>
</header>


<div class="container" style="--sidebar-width: {sidebarWidth}px;">
    <aside class="sidebar">
        <div class="logo">Sonic Web</div>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/library">Your Library</a></li>
            </ul>
        </nav>
        <div class="playlists">
            <h3>Your Library</h3>
            <div class="library-controls">
                <button class="active">Playlists</button>
                <button>Albums</button>
                <button>Artists</button>
            </div>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <ul>
                <li><a href="/playlist/liked">
                    <img src="/sample.jpg" alt="Liked Songs" class="sidebar-item-art">
                    Liked Songs <span class="subtext"> • 70 songs</span>
                </a></li>
                <li><a href="/album/mussorgsky-pictures">
                    <img src="/sample.jpg" alt="Mussorgsky" class="sidebar-item-art">
                    Mussorgsky: Pictures... <span class="subtext"> • Album • Modest Mussorgsky</span>
                </a></li>
                <li><a href="#">
                    <img src="/sample.jpg" alt="Mozart" class="sidebar-item-art">
                     Mozart: 16 Sonatas... <span class="subtext"> • Album • Wolfgang Amadeus Mozart</span>
                </a></li>
                 <li><a href="#">
                    <img src="/sample.jpg" alt="Bach" class="sidebar-item-art">
                    J.S. Bach: Mass in B Minor... <span class="subtext"> • Album • Johann Sebastian Bach</span>
                </a></li>
            </ul>
        </div>
    </aside>

    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div 
        class="resizer" 
        role="separator" 
        tabindex="0" 
        aria-valuenow={sidebarWidth}
        aria-valuemin="200"
        aria-valuemax="600"
        on:mousedown={handleMouseDown}
    ></div>

    <slot />

</div>

<Audioplayer />

<style>
    .container {
        grid-row: 2 / 3;
        grid-column: 1 / 2;
        display: grid;
        grid-template-columns: var(--sidebar-width) 5px 1fr;
        overflow: hidden;
    }

    :global(body) {
        display: grid;
        grid-template-rows: 60px 1fr;
        min-height: 100vh;
        margin: 0;
        background-color: #000;
        color: #fff;
        padding-bottom: 80px; 
        box-sizing: border-box;
    }

    :global(#svelte) {
        height: 100%;
        display: contents;
    }

    .resizer {
        background-color: #333;
        cursor: col-resize;
        height: 100%; 
        grid-row: 1 / -1; 
        grid-column: 2 / 3; 
        z-index: 6; 
    }

    .resizer:hover {
        background-color: #555;
    }

    .app-bar {
        grid-row: 1 / 2; 
        grid-column: 1 / 2;
        background-color: #101010; 
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 10;
    }

    .nav-buttons button {
        background-color: rgba(0,0,0,0.7);
        border: none;
        color: #fff;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        margin-right: 15px;
        cursor: pointer;
        font-size: 1.2em;
    }
    .nav-buttons button:disabled {
         opacity: 0.6;
         cursor: not-allowed;
    }

    .search-bar {
        flex-grow: 0.5; 
        max-width: 350px;
    }
    
    .search-bar input {
        width: 100%;
        padding: 8px 12px;
        border-radius: 20px;
        border: none;
        background-color: #242424;
        color: #fff;
    }
    .search-bar input::placeholder {
        color: #b3b3b3;
    }

    .user-controls {
        display: flex;
        align-items: center;
    }

    .user-controls a,
    .user-controls button {
        color: #b3b3b3;
        background: none;
        border: none;
        text-decoration: none;
        margin-left: 15px;
        font-size: 0.9em;
        font-weight: bold;
        cursor: pointer;
        transition: color 0.2s ease;
    }
    .user-controls a:hover,
    .user-controls button:hover {
        color: #fff;
    }
    .user-controls .separator {
         color: #b3b3b3;
         margin-left: 15px;
    }
    .user-controls .login-btn {
        
    }

    .user-controls a.login-btn,
    .user-controls button.login-btn { 
        background-color: #fff;
        color: #121212;
        padding: 10px 25px;
        border-radius: 20px;
        margin-left: 20px;
        text-decoration: none; 
        display: inline-block; 
    }
    .user-controls a.login-btn:hover,
     .user-controls button.login-btn:hover { 
         background-color: #f0f0f0;
         color: #121212;
     }
    .user-controls .signup-btn {
        
    }

    .sidebar {
        
         z-index: 5; 
         grid-row: 1 / -1; 
         grid-column: 1 / 2;
         background-color: #040404;
         padding: 0;
         overflow-y: auto;
    }
    .sidebar > div, .sidebar > nav {
        padding: 10px 20px;
    }
    .playlists {
        padding: 0;
    }
    .playlists h3 {
        padding: 10px 20px 0 20px;
        margin-bottom: 15px;
    }
    .library-controls, .library-filter {
        padding: 0 20px 10px 20px;
        display: flex;
        gap: 8px;
    }
    .library-controls button {
        background-color: #232323;
        border: none;
        color: #fff;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 0.85em;
        cursor: pointer;
    }
    .library-controls button.active {
        background-color: #333;
    }
    .library-filter {
         justify-content: space-between;
    }
     .library-filter button {
         background: none;
         border: none;
         color: #b3b3b3;
         font-size: 0.9em;
         cursor: pointer;
     }
      .library-filter button:hover {
          color: #fff;
      }
      .library-filter .search-icon {
          font-size: 1.2em;
      }

    .playlists ul {
        padding: 0 10px 0 20px;
        max-height: calc(100vh - 350px);
        overflow-y: auto;
    }

    .playlists ul li a {
        padding: 6px 10px 6px 0;
        border-radius: 4px;
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
    }
    .playlists ul li a:hover {
        background-color: #1a1a1a;
    }

    .sidebar-item-art {
        grid-row: 1 / 3;
        width: 48px;
        height: 48px;
        object-fit: cover;
        border-radius: 2px;
    }

    .playlists ul li a span {
        grid-column: 2 / 3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3;
    }
     .playlists ul li a .subtext {
         font-size: 0.8em;
         color: #b3b3b3;
     }

    
    :global(.main-content) { 
         grid-row: 1 / -1; 
         grid-column: 3 / 4; 
         overflow-y: auto; 
         padding: 20px;
         background-color: #121212;
     }

</style> 