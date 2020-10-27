import React, { useEffect, useState } from 'react';
import {useDataLayerValue} from './state/DataLayer';
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromUrl } from './spotify';
import Login from './containers/Login/Login';
import Player from "./containers/Player/Player";
import './App.css';


const spotify = new SpotifyWebApi();

function App() {
	const [{ token }, dispatch] = useDataLayerValue();

	useEffect(() => {
		const hash = getTokenFromUrl();
		window.location.hash = "";

		const _token = hash.access_token;

		if(_token) {

			dispatch({
				type:'SET_TOKEN',
				token: _token
			})

			spotify.setAccessToken(_token);

			spotify.getMe().then((user) => {

				dispatch({
					type: 'SET_USER',
					user
				})
			});

			spotify.getUserPlaylists({market:'IL'}).then((playlists) => {

				dispatch({
					type: 'SET_PLAYLISTS',
					playlists
				})
			})

			spotify.getMyTopArtists().then((top_artists) => {

				dispatch({
					type: 'SET_TOP_ARTISTS',
					top_artists
				})
			});

			spotify.getPlaylist('37i9dQZEVXcGT4LTcEgTYQ', {market:'IL'}).then((discover_weekly) => {

				dispatch({
					type: 'SET_DISCOVER_WEEKLY',
					discover_weekly
				})
			});

			spotify.getFeaturedPlaylists({limit:10, market:'IL'}).then((featured_playlists) => {

				dispatch({
					type: 'SET_FEATURED_PLAYLISTS',
					featured_playlists
				})
			});

			spotify.getMyRecentlyPlayedTracks({limit:10, market:'IL'}).then((recent_played) => {

				dispatch({
					type: 'SET_RECENT_PLAYED_PLAYLISTS',
					recent_played
				})
			});
		}
	}, []);

	return (
		<div className="app">
			{token ? (
				<Player spotify={spotify}/>
			) :(
				 <Login/>
			)}
		</div>
	);
}

export default App;
