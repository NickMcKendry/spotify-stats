import React from "react";
import "./LogIn.css";

const LogIn = () => {
  return (
    <div>
      <div className="logo-container">
        <img
          className="App-logo"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
          alt="Spotify Logo"
        />
        <h1>Stats</h1>
      </div>
      <div className="content"></div>
      <button className="login-button" name="login">
        <a href="http://localhost:8888/login">Log In With Spotify</a>
      </button>
      <footer>
        <p>
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by{" Nick McKendry"}
        </p>
      </footer>
    </div>
  );
};

export default LogIn;
