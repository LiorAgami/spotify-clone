import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './containers/Login/Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./containers/Player/Player";
import {useDataLayerValue} from './state/DataLayer';

const spotify = new SpotifyWebApi();

function App() {
	const [{user, token}, dispatch] = useDataLayerValue();

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

			spotify.getUserPlaylists().then((playlists) => {

				dispatch({
					type: 'SET_PLAYLISTS',
					playlists
				})
			});

			spotify.getPlaylist('37i9dQZEVXcGT4LTcEgTYQ').then((discover_weekly) => {

				dispatch({
					type: 'SET_DISCOVER_WEEKLY',
					discover_weekly
				})
			});

			spotify.getFeaturedPlaylists().then((featured_playlists) => {

				dispatch({
					type: 'SET_FEATURED_PLAYLISTS',
					featured_playlists
				})
			});

			spotify.getMyRecentlyPlayedTracks().then((recent_played) => {

				dispatch({
					type: 'SET_RECENT_PLAYED_PLAYLISTS',
					recent_played
				})
			});
		}
	}, []);

	return (
		//BEM
		<div className="app">
			{
				token ? (
					<Player spotify={spotify}/>
				) : (
					<Login/>
				)
			}
		</div>

	);
}

export default App;
