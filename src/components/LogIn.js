// component that will be a login button
// user will log in with their spotify account
// and then we will get their data
// we will use the spotify web api to get the data

import React from "react";

const LogIn = () => {
  return (
    <div>
      <button className="login-button">
        <a href="#">Log In With Spotify</a>
      </button>
    </div>
  );
};

export default LogIn;
