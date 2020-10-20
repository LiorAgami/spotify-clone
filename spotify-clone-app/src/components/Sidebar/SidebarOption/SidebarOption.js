import React from 'react';
import './SidebarOption.css';
import {useDataLayerValue} from '../../../state/DataLayer';
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function SidebarOption({title, active, Icon, playlistId, isPlaylist}) {
	const [{active_tab} , dispatch] = useDataLayerValue();

	let classNames = (title == active_tab ? 'active sidebarOption' : 'sidebarOption');
	if(isPlaylist) classNames =  `${classNames} isPlaylist`;

	function navigateClient(){
		if(title =='Home') return goBackToHome();
		if(playlistId) return getPlaylistData();
		// if(title == 'Your Library') return goToLibrary();
	}

	function getPlaylistData(){

		if(!playlistId) return;

		spotify.getPlaylist(playlistId).then((playlist_items) => {
			dispatch({
				type: 'SET_CURRENT_PLAYLIST',
				playlist_items
			})

			dispatch({
				type: 'SET_ACTIVE_TAB',
				active_tab:(playlist_items?.name || '')
			})
		});
	}

	// function goToLibrary(){
	// 	spotify.getUserPlaylists().then((library_playlists) => {
	// 		dispatch({
	// 			type:'SET_CURRENT_PLAYLIST',
	// 			playlist_items:[]
	// 		})

	// 		dispatch({
	// 			type:'SET_LIBRARY_PLAYLIST',
	// 			library_playlists:library_playlists
	// 		})

	// 		dispatch({
	// 			type: 'SET_ACTIVE_TAB',
	// 			active_tab:'Your Library'
	// 		})
	// 	});
	// }

	function goBackToHome(){
		dispatch({
			type:'SET_CURRENT_PLAYLIST',
			playlist_items:[]
		})

		dispatch({
			type: 'SET_ACTIVE_TAB',
			active_tab:'Home'
		})
	}

	return (
		<div onClick={navigateClient} className={classNames}>
			{Icon && <Icon className="sidebarOption__icon"/>}
			{Icon ? <h4>{title}</h4> : <p>{title}</p>}
		</div>
	)
}

export default SidebarOption
