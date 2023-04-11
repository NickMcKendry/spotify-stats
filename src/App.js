import "./App.css";

import LogIn from "./components/LogIn";

function App() {
  return (
    <div className="App" style={{ textAlign: "center" }}>
      <header className="App-header">
        <img
          className="App-logo"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
          alt="Spotify Logo"
        />
        <h1>Stats</h1>
      </header>
      <LogIn />
    </div>
  );
}

export default App;
