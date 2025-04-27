<script>
  // Mockup: Import icons if you have an icon library, or use text/SVG
  // import GoogleIcon from '../lib/icons/GoogleIcon.svelte';
</script>

<div class="login-container">
  <div class="logo">
    <!-- Replace with actual SVG logo if available -->
    <svg width="30" height="30" viewBox="0 0 168 168"><path fill="#1ED760" d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741C167.74.277 130.25.277 83.996.277zM122.16 120.78a5.216 5.216 0 01-7.351 1.711 64.841 64.841 0 00-61.667-35.409 64.833 64.833 0 00-61.67 35.409 5.222 5.222 0 01-7.351-1.711 5.219 5.219 0 011.711-7.354 75.308 75.308 0 0171.585-41.278 75.32 75.32 0 0171.588 41.278 5.219 5.219 0 011.711 7.354zm10.446-28.848a5.216 5.216 0 01-7.351 1.705 50.777 50.777 0 00-48.338-27.73 50.77 50.77 0 00-48.334 27.73 5.216 5.216 0 01-7.351-1.705 5.22 5.22 0 011.705-7.351 61.234 61.234 0 0158.208-33.38 61.23 61.23 0 0158.209 33.38 5.22 5.22 0 011.705 7.351zm.142-29.367a5.216 5.216 0 01-7.351 1.702 36.682 36.682 0 00-34.949-19.926 36.674 36.674 0 00-34.945 19.926 5.216 5.216 0 01-7.351-1.702 5.22 5.22 0 011.705-7.354 47.127 47.127 0 0145.013-25.709 47.13 47.13 0 0145.017 25.709 5.216 5.216 0 011.705 7.354z"/></svg>
  </div>
  <h1>Log in to Spotify</h1>

  <div class="social-logins">
    <button class="social-btn google">
      <!-- <GoogleIcon /> -->
      <span>G</span> Continue with Google
    </button>
    <button class="social-btn facebook">
      <span>f</span> Continue with Facebook
    </button>
    <button class="social-btn apple">
      <span></span> Continue with Apple
    </button>
  </div>

  <hr class="divider">

  <form class="login-form">
    <label for="email">Email or username</label>
    <input type="text" id="email" name="email" value="se.mastewal.belete@gmail.com">

    <!-- Optional: Password field if needed for your flow -->
    <!-- <label for="password">Password</label> -->
    <!-- <input type="password" id="password" name="password"> -->

    <button type="submit" class="continue-btn">Continue</button>
  </form>

  <hr class="divider">

  <p class="signup-link">
    Don't have an account? <a href="/signup">Sign up for Spotify</a>
  </p>

</div>

<style>
  .login-container {
    background-color: #181818; 
    padding: 40px 60px;
    border-radius: 8px;
    max-width: 450px;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    text-align: center;
  }

  .logo {
    margin-bottom: 20px;
  }
  .logo svg {
      width: 50px;
      height: 50px;
  }

  h1 {
    font-size: 2em;
    margin-bottom: 30px;
  }

  .social-logins {
    width: 100%;
    margin-bottom: 20px;
  }

  .social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 25px;
    border: 1px solid #535353;
    background-color: transparent;
    color: #fff;
    font-size: 0.9em;
    font-weight: bold;
    cursor: pointer;
    transition: border-color 0.2s ease;
  }
  .social-btn:hover {
      border-color: #fff;
  }
  .social-btn span {
      margin-right: 10px;
      font-size: 1.2em; /* Adjust icon size */
  }
  .social-btn.google span { color: #DB4437; } 
  .social-btn.facebook span { color: #4267B2; } 
  .social-btn.apple span { color: #fff; } 


  .divider {
    border: none;
    border-top: 1px solid #2a2a2a;
    width: 100%;
    margin: 30px 0;
  }

  .login-form {
    width: 100%;
    text-align: left;
  }

  .login-form label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 0.9em;
  }

  .login-form input {
    width: 100%;
    padding: 14px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #535353;
    background-color: #121212; 
    color: #fff;
    font-size: 1em;
    box-sizing: border-box;
  }
  .login-form input:focus {
      border-color: #fff;
      outline: none;
  }

  .continue-btn {
    width: 100%;
    padding: 14px;
    border-radius: 25px;
    border: none;
    background-color: #1ED760; /* Spotify green */
    color: #121212;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  .continue-btn:hover {
      background-color: #1fdf64;
  }

  .signup-link {
    color: #a7a7a7;
    font-size: 0.9em;
  }
  .signup-link a {
    color: #fff;
    text-decoration: underline;
  }
  .signup-link a:hover {
      color: #1ED760;
  }

</style> 