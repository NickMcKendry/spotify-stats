// Express server on 8888
const express = require("express");
const app = express();
const port = 8888;

// define cors
const cors = require("cors");
app.use(cors());

// define dotenv
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID);

// define querystring
const querystring = require("querystring");

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

// define request
const request = require("request");

// define path
const path = require("path");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Setup login route
app.get("/login", (req, res) => {
  const scopes = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientId,
        scope: scopes,
        redirect_uri: "http://localhost:8888/callback",
      })
  );
});

// Setup callback route
app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  res.send(code);
});

// Setup refresh token route
app.get("/refresh_token", (req, res) => {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});
