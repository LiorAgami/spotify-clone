import React from 'react';
import {useDataLayerValue} from '../../../../state/DataLayer';
import {useSoundLayerValue} from "../../../../state/SoundLayer";
import { Subject } from 'rxjs'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SpotifyWebApi from "spotify-web-api-js";
import './PlaylistCard.css';

const playlistWasUpdated = new Subject();

const spotify = new SpotifyWebApi();

function PlaylistCard( props ) {

	const [{}, dispatch] = useDataLayerValue();
	const [{volume, repeat}, soundDispatch] = useSoundLayerValue();

	const listenForPlaylistChange = () => {
		dispatch({
			type: 'SET_ACTIVE_TAB',
			active_tab:''
		})

		playlistWasUpdated.subscribe(playlist =>{
			startPlayingFirstSong(playlist);
		});
	}

	const startPlayingFirstSong = (playlist) => {
		soundDispatch({
			type: 'SET_PLAYING',
			playing: false,
		});

		dispatch({
			type: 'SET_TRACK',
			track: playlist?.tracks?.items[0]?.track,
			index:0
		});

		let audio = new Audio(playlist?.tracks?.items[0]?.track.preview_url);
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
			volume: volume / 100
		});

		playlistWasUpdated.unsubscribe();

	}

	const getTrackData = () => {
		dispatch({
			type: 'SET_ACTIVE_TAB',
			active_tab:''
		})

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
				type: 'SET_CURRENT_PLAYLIST',
				playlist_items:adjusted_playlist
			});

			playlistWasUpdated.next(adjusted_playlist);
		});
	}

	const getPlaylistData = () => {
		dispatch({
			type: 'SET_ACTIVE_TAB',
			active_tab:''
		})

		const playlist_id = props?.playlistId || '';
		if(!playlist_id) return;

		return spotify.getPlaylist(playlist_id, {market:'IL'}).then((playlist_items) => {

			dispatch({
				type: 'SET_CURRENT_PLAYLIST',
				playlist_items
			})
			playlistWasUpdated.next(playlist_items);
		});
	}

	return (
		<div className="cardsContainer__card" onClick={!props.isTrack ? getPlaylistData : getTrackData}>
			<div className="cardRow">
				<div className="cardRow__card">
					<div className="cardRow__card__inner">
						<div className="cardRow__card__inner__imgContainer">
							<img src={props.img}/>
							<span className="cardRow__card__inner__imgContainer__playIcon"
								onClick={listenForPlaylistChange}><PlayArrowIcon/>
							</span>
						</div>
						<div className="cardRow__card__inner__textContainer">
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
