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

// define querystring
const querystring = require("querystring");

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

// define request
const request = require("request");

// define path
const path = require("path");

// define cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// define body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
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
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: "http://localhost:8888/callback",
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    const access_token = body.access_token;
    const refresh_token = body.refresh_token;

    res.redirect(
      "http://localhost:3000/profile?" +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token,
        })
    );
  });
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

app.get("/profile", (req, res) => {
  const access_token = req.query["access_token"];
  console.log(access_token);
  const options = {
    url: "https://api.spotify.com/v1/me",
    headers: {
      Authorization: "Bearer " + access_token,
    },
    json: true,
  };

  request.get(options, (error, response, body) => {
    console.log(body);
  });
});
