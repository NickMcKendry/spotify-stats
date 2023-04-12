import react from "react";

const Navigation = () => {
  return (
    <header className="header">
      <nav className="navigation">
        <ul>
          <li>
            <div className="logo-container">
              <img
                className="App-logo"
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
                alt="Spotify Logo"
              />
              <h1>Stats</h1>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/">Log In</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
