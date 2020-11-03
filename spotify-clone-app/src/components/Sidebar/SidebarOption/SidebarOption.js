import React from 'react';
import {useDataLayerValue} from '../../../state/DataLayer';
import {useSoundLayerValue} from '../../../state/SoundLayer';
import SpotifyWebApi from 'spotify-web-api-js';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import './SidebarOption.css';

const spotify = new SpotifyWebApi();

function SidebarOption({ page, title, Icon, playlistId, isPlaylist }) {
	const [{ active_page, current_playing_playlist }, dispatch] = useDataLayerValue();
	const [{ playing, repeat }, soundDispatch] = useSoundLayerValue();

	let classNames = (page == active_page ? 'active sidebarOption' : 'sidebarOption');

	if(isPlaylist) classNames =  `${classNames} isPlaylist`;

	const navigateClient = () => {
		if(page == 'Home') return goBackToHome();
		else if(page == 'Playlist') return getPlaylistData();
		else if(page == 'Library') return goToLibrary();
		else if(page == 'Search') return goToSearch();
	}

	const getPlaylistData = () => {

		if(!playlistId) return;

		spotify.getPlaylist(playlistId, {market:'IL'}).then((playlist_items) => {
			dispatch({
				type: 'SET_CURRENT_DISPLAYED_PLAYLIST',
				playlist_items
			})

			dispatch({
				type: 'SET_ACTIVE_PAGE',
				active_page: 'Playlist'
			})
		});
	}

	const  goToLibrary = () => {
		spotify.getUserPlaylists().then((library_playlists) => {
			dispatch({
				type:'SET_LIBRARY_PLAYLIST',
				library_playlists:library_playlists
			})

			dispatch({
				type: 'SET_ACTIVE_PAGE',
				active_page:'Library'
			})
		});
	}

	const goBackToHome = () => {
		dispatch({
			type: 'SET_ACTIVE_PAGE',
			active_page:'Home'
		})
	}

	const goToSearch = () => {
		dispatch({
			type: 'SET_ACTIVE_PAGE',
			active_page:'Search'
		})
	}

	return (
		<div onClick={navigateClient} className={classNames}>
			{Icon ? (
				<span>
					<Icon className="sidebarOption__icon" />
					<h4>{title}</h4>
					{playing && isPlaylist && playlistId == current_playing_playlist.id ? (
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
