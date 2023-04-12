import React, { useEffect, useState } from "react";
import querystring from "querystring";

function Profile() {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const parsedQuery = querystring.parse(window.location.search.substring(1));
    if (parsedQuery.access_token) {
      setAccessToken(parsedQuery.access_token);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      // Fetch username and profile picture and set them in state

      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.useState({ user: data });
        });
    }
  }, [accessToken]);

  return (
    <div>
      <div className="logo-container">
        <img
          className="App-logo"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
          alt="Spotify Logo"
        />
        <h1>Stats</h1>

        <div className="content">
          <div className="profile">
            <img src={user?.images[0].url} alt="Profile" />
            <h2>{user?.display_name}</h2>

            <div className="profile-info">
              <p>
                <strong>Followers:</strong> {user?.followers.total}
              </p>

              <p>
                <strong>Country:</strong> {user?.country}
              </p>

              <p>
                <strong>Product:</strong> {user?.product}
              </p>

              <p>
                <strong>Spotify URI:</strong> {user?.uri}
              </p>

              <p>
                <strong>Spotify URL:</strong> {user?.external_urls.spotify}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
