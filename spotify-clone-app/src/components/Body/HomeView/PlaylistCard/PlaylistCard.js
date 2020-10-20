import React from 'react';
import './PlaylistCard.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SpotifyWebApi from "spotify-web-api-js";
import {useDataLayerValue} from '../../../../state/DataLayer';
import {useSoundLayerValue} from "../../../../state/SoundLayer";
import { Subject } from 'rxjs'

const playlistWasUpdated = new Subject();

const spotify = new SpotifyWebApi();

function PlaylistCard(props) {

	const [{active_tab}, dispatch] = useDataLayerValue();
	const [{volume, repeat}, soundDispatch] = useSoundLayerValue();

	function listenForPlaylistChange(){
		dispatch({
			type: 'SET_ACTIVE_TAB',
			active_tab:''
		})

		playlistWasUpdated.subscribe(playlist =>{
			startPlayingFirstSong(playlist);
		});
	}

	function startPlayingFirstSong(playlist){

		dispatch({
			type: 'SET_TRACK',
			track: playlist?.tracks?.items[0]?.track
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

	function getPlaylistData(){
		dispatch({
			type: 'SET_ACTIVE_TAB',
			active_tab:''
		})
		
		const playlist_id = props?.playlistId || '';
		if(!playlist_id) return;

		return spotify.getPlaylist(playlist_id).then((playlist_items) => {
			dispatch({
				type: 'SET_CURRENT_PLAYLIST',
				playlist_items
			})
			playlistWasUpdated.next(playlist_items);
		});
	}

	return (
		<div className="cardsContainer__card" onClick={getPlaylistData}>
			<div className="cardRow">
				<div className="cardRow__card">
					<div className="cardRow__card__inner">
						<div className="cardRow__card__inner__imgContainer">
							<img src={props.img}/>
							<span className="cardRow__card__inner__imgContainer__playIcon" onClick={listenForPlaylistChange}><PlayArrowIcon/></span>
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
