import React from 'react';
import {useDataLayerValue} from '../../../state/DataLayer';
import {useSoundLayerValue} from '../../../state/SoundLayer';
import SpotifyWebApi from 'spotify-web-api-js';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import './SidebarOption.css';

const spotify = new SpotifyWebApi();

function SidebarOption({ title, Icon, playlistId, isPlaylist }) {
	const [{ active_tab, current_playing_playlist }, dispatch] = useDataLayerValue();
	const [{ playing, repeat }, soundDispatch] = useSoundLayerValue();

	let classNames = (title == active_tab ? 'active sidebarOption' : 'sidebarOption');

	if(isPlaylist) classNames =  `${classNames} isPlaylist`;

	const navigateClient = () => {
		if(title == 'Home') return goBackToHome();
		else if(playlistId) return getPlaylistData();
		else if(title == 'Your Library') return goToLibrary();
	}

	const getPlaylistData = () => {

		if(!playlistId) return;

		spotify.getPlaylist(playlistId, {market:'IL'}).then((playlist_items) => {
			dispatch({
				type: 'SET_CURRENT_DISPLAYED_PLAYLIST',
				playlist_items
			})

			dispatch({
				type: 'SET_ACTIVE_TAB',
				active_tab:(playlist_items?.name || '')
			})
		});
	}

	const  goToLibrary = () => {
		spotify.getUserPlaylists().then((library_playlists) => {
			dispatch({
				type:'SET_CURRENT_DISPLAYED_PLAYLIST',
				playlist_items:[]
			})

			dispatch({
				type:'SET_LIBRARY_PLAYLIST',
				library_playlists:library_playlists
			})

			dispatch({
				type: 'SET_ACTIVE_TAB',
				active_tab:'Your Library'
			})
		});
	}

	const goBackToHome = () => {
		dispatch({
			type:'SET_CURRENT_DISPLAYED_PLAYLIST',
			playlist_items:[]
		})

		dispatch({
			type: 'SET_ACTIVE_TAB',
			active_tab:'Home'
		})
	}

	return (
		<div onClick={navigateClient} className={classNames}>
			{Icon ? (
				<span>
					<Icon className="sidebarOption__icon" />
					<h4>{title}</h4>
					{playing && playlistId == current_playing_playlist.id ? (
						<VolumeUpIcon />
					) : ''}
				</span>
			) : (
				<p>{title}</p>
			)}
		</div>
	)
}

export default SidebarOption
