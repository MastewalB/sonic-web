<script>
    import "../app.css"; // Import global styles
    import { onMount, onDestroy } from "svelte";

    import Audioplayer from "../lib/Audioplayer/Audioplayer.svelte";

    let sidebarWidth = 300; // Initial width
    let isResizing = false;

    function handleMouseDown(event) {
        isResizing = true;
        // Add listeners to the window to track mouse move and up events
        // outside the resizer element itself.
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseMove(event) {
        if (!isResizing) return;

        // Calculate new width - prevent going too small or too large
        const newWidth = Math.max(300, Math.min(event.clientX, 450));
        sidebarWidth = newWidth;

        // Optional: Add user-select none to body to prevent text selection during drag
        document.body.style.userSelect = "none";
    }

    function handleMouseUp() {
        if (isResizing) {
            isResizing = false;
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            // Remove user-select none
            document.body.style.userSelect = "";
        }
    }

    // --- Keyboard Listener ---
    function handleKeyDown(event) {
        // Ignore if typing in an input/textarea
        if (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
        ) {
            return;
        }
        // Space bar toggles play/pause
        // if (event.code === 'Space') {
        //     event.preventDefault(); // Prevent scrolling
        //     togglePlay();
        // }
    }

    onMount(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    });
</script>

<!-- App Bar -->
<header class="app-bar">
    <div class="nav-buttons">
        <a href="/" title="Home">
            <img src="/favicon.png" alt="" style="width: 35px; height: 35px;" />
        </a>
    </div>
    <div class="search-bar">
        <input type="text" placeholder="What do you want to play?" />
    </div>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <div class="user-controls">
        <a href="#">Support</a>
        <a href="#">Download</a>
        <span class="separator">|</span>
        <button class="signup-btn">Sign up</button>
        <a href="/login" class="login-btn">Log in</a>
    </div>
</header>

<div class="container" style="--sidebar-width: {sidebarWidth}px;">
    <aside class="sidebar">
        <div class="playlists">
            <h3>Your Library</h3>
            <div class="library-controls">
                <button class="active">Playlists</button>
                <button>Albums</button>
            </div>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <ul>
                <li>
                    <a href="/playlist/liked">
                        <img
                            src="/sample.jpg"
                            alt="Liked Songs"
                            class="sidebar-item-art"
                        />
                        <span class="library-item-title"> Liked Songs</span>
                        <span class="subtext"> • 70 songs</span>
                    </a>
                </li>
                <li>
                    <a href="/album/mussorgsky-pictures">
                        <img
                            src="/sample.jpg"
                            alt="Mussorgsky"
                            class="sidebar-item-art"
                        />
                        <span class="library-item-title"
                            >Mussorgsky: Pictures At An Exhibition</span
                        >
                        <span class="subtext">
                            • Album • Modest Mussorgsky</span
                        >
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img
                            src="/sample.jpg"
                            alt="Mozart"
                            class="sidebar-item-art"
                        />
                        <span class="library-item-title"
                            >Mozart: 16 Sonatas</span
                        >
                        <span class="subtext">
                            • Album • Wolfgang Amadeus Mozart</span
                        >
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img
                            src="/sample.jpg"
                            alt="Bach"
                            class="sidebar-item-art"
                        />
                        <span class="library-item-title">
                            J.S. Bach: Mass in B Minor</span
                        ><span class="subtext">
                            • Album • Johann Sebastian Bach</span
                        >
                    </a>
                </li>
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
        /* overflow: hidden; */
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

    .search-bar {
        flex-grow: 0.5;
        max-width: 450px;
    }

    .search-bar input {
        font-size: 1rem;
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

    .user-controls a.login-btn {
        background-color: #fff;
        color: #121212;
        padding: 10px 25px;
        border-radius: 20px;
        margin-left: 20px;
        text-decoration: none;
        display: inline-block;
    }
    .user-controls a.login-btn:hover {
        background-color: #f0f0f0;
        color: #121212;
    }

    .sidebar {
        z-index: 5;
        grid-row: 1 / -1;
        grid-column: 1 / 2;
        background-color: #040404;
        padding: 0;
        overflow-y: auto;
    }
    .sidebar > div {
        padding: 10px 10px;
    }
    .playlists {
        padding: 0;
    }
    .playlists h3 {
        padding: 1px 2px 10px 2px;
        margin-bottom: 5px;
        font-size: 1.3em;
        font-weight: 1000;
    }

    .library-controls button {
        background-color: #1a1a1a;
        border: none;
        color: #fff;
        padding: 8px 12px;
        border-radius: 15px;
        font-size: 0.85em;
        font-weight: 500;
        cursor: pointer;
    }
    .library-controls button.active {
        background-color: #fff;
        color: #101010;
        font-weight: 500;
    }

    .playlists ul {
        padding: 0 1px 0 1px;
        max-height: calc(100vh - 350px);
        overflow-y: auto;
    }

    .playlists ul li a {
        padding: 6px 1px 5px 0;
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
        padding-right: 10px;
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
    .playlists ul li a .library-item-title {
        font-size: 1em;
        color: #fff;
        font-weight: 500;
    }
    .playlists ul li a .subtext {
        font-size: 0.8em;
        font-weight: 500;
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
