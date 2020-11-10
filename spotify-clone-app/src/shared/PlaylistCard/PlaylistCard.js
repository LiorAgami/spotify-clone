import React from 'react';
import {useDataLayerValue} from '../../state/DataLayer';
import {useSoundLayerValue} from "../../state/SoundLayer";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SpotifyWebApi from "spotify-web-api-js";
import './PlaylistCard.css';

const spotify = new SpotifyWebApi();

function PlaylistCard( props ) {

	const [{}, dispatch] = useDataLayerValue();
	const [ { volume, repeat }, soundDispatch] = useSoundLayerValue();
	
	const getPlaylistOrTrack = (cb, e) => {
		let isPlaylist = !props?.isTrack;
		const callback = typeof cb == 'function' ? cb : null;
		
		if(e) e.stopPropagation();

		if(isPlaylist) {
			const playlist_id = props?.playlistId;

			if(!playlist_id) return;

			return spotify.getPlaylist(playlist_id, {market:'IL'}).then((playlist_items) => {
				
				let track = playlist_items?.tracks?.items[0]?.track;

				dispatch({
					type: 'SET_CURRENT_DISPLAYED_PLAYLIST',
					playlist_items
				});

				dispatch({
					type: 'SET_CURRENT_PLAYING_PLAYLIST',
					playlist_items:playlist_items
				});

				if(callback) callback(track);
			});
		}

		const track_id = props?.trackId || '';
		if(!track_id) return;

		return spotify.getTrack(track_id, {market:'IL'}).then((playlist_items) => {
			let adjusted_playlist = {
				isTrack:true,
				tracks:{
					items:[{track:playlist_items}],
					artists:[playlist_items.artists]
				},
				images:[{url:playlist_items?.album?.images[0]?.url}],
				name:playlist_items.name,
				description:playlist_items.description
			};

			dispatch({
				type: 'SET_CURRENT_DISPLAYED_PLAYLIST',
				playlist_items:adjusted_playlist
			});

			dispatch({
				type: 'SET_CURRENT_PLAYING_PLAYLIST',
				playlist_items:adjusted_playlist
			});
			
			if(callback) callback(playlist_items);

		});
	}

	const showPlaylistView = (playlist_items) => {
		dispatch({
			type: 'SET_ACTIVE_PAGE',
			active_page:'Playlist'
		});
	}

	const playFirstSong = (track) => {
		
		soundDispatch({
			type: 'SET_PLAYING',
			playing: false,
		});

		dispatch({
			type: 'SET_TRACK',
			track,
			index:0
		});

		let audio = new Audio(track.preview_url);
		audio.loop = repeat;

		soundDispatch({
			type: 'SET_AUDIO',
			audio: audio
		});

		soundDispatch({
			type: 'SET_PLAYING',
			playing: true,
		});

		soundDispatch({
			type: "SET_VOLUME",
			volume: volume
		});

		document.title = `${track.name} · ${track.artists.map((artist) => artist.name).join(', ')}`;
	}

	return (
		<div className="playlistCard" id="playlistCard" onClick={(e)=>{getPlaylistOrTrack(showPlaylistView)}}>
			<div className="playlistCard__Row">
				<div className="playlistCard__card">
					<div className="playlistCard__cardInner">
						<div className="playlistCard__imgCont">
							<img src={props.img}/>
							<span className="playlistCard__playIcon" 
								  id="playlistCard__playIcon"
								  onClick={(e)=>{getPlaylistOrTrack(playFirstSong, e)}}><PlayArrowIcon id="PlayArrowIcon"/>
							</span>
						</div>
						<div className="playlistCard__textCont">
						<a href="#">{props.title}</a>
							<div>{props.desc}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlaylistCard
