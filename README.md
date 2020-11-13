# Spotify Clone


This Spotify Clone App was built for fun and for learning new technologies and techniques.

It includes the following technologies: React, React Hooks, React Context Api, Rxjs, Material-ui and  [Spotify Developers API](https://developer.spotify.com/documentation/web-api/) , [Spotify Web API JS](https://github.com/JMPerez/spotify-web-api-js).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Features

* Play short audio tracks.
* Control playback (pause, volume, shuffle, etc).
* See your recently played tracks, your top artists and public playlists.
* Search for tracks, albums, artists and playlists - (currently in development).
* Mobile version - (currently in development).


## Try it out
https://lior-dev.com/spotify-clone

**Warning:** This App requires users to authenticate with a valid Spotify Premium subscription - it doesn't have any permissions which can harm the logged in account!

## How to Run locally

You'll need a [Spotify Client ID](https://developer.spotify.com/dashboard/applications).

```bash
$ git clone https://github.com/LiorAgami/spotify-clone.git
$ cd spotify-clone-app
$ npm i
```

You will have to change the following variables in spotify.js file:
```
redirectUri="http://localhost:3000/"
clientid="YOUR_CLIENT_ID"
```

Now run:
```bash
$ npm start
```
and visit http://localhost:3000.
 
## Screenshots
![home](images/home.png?raw=true "Home")
![playlist](images/playlist.png?raw=true "Playlist")
![genres](images/genres.png?raw=true "Genres")

