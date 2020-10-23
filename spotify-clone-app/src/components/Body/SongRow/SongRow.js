import React from 'react';
import {useDataLayerValue} from '../../../state/DataLayer';
import {useSoundLayerValue} from '../../../state/SoundLayer';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import './SongRow.css';

function SongRow({ trackItem, index }) {
	const [{ track, current_playing_playlist, current_displayed_playlist, trackInd }, dispatch] = useDataLayerValue();
	const [{ playing, repeat }, soundDispatch] = useSoundLayerValue();

	//TODO -refactor to a better solution
	const setActive = (e) => {
		let elems = document.querySelectorAll(".songRow.active");
		[].forEach.call(elems, function(el) {
		  el.classList.remove("active");
		});

		let parent = e.target.closest('.songRow');
		parent.className = parent.className += " active";
	}

	const pauseTrack = () => {
		if((current_playing_playlist?.tracks?.items[index]?.track?.id == trackItem?.id)){
			soundDispatch({
				type: 'SET_PLAYING',
				playing: false,
			});

			return;
		}
	}

	const playTrack = (trackItem) => {
		dispatch({
			type: 'SET_TRACK',
			track: trackItem,
			index:index
		});

		dispatch({
			type: 'SET_CURRENT_PLAYING_PLAYLIST',
			playlist_items:current_displayed_playlist
		});

		soundDispatch({
			type: 'SET_PLAYING',
			playing: false,
		});

		let audio = new Audio(trackItem.preview_url);
		audio.loop = repeat;
		soundDispatch({
			type: 'SET_AUDIO',
			audio: audio
		});

		soundDispatch({
			type: 'SET_PLAYING',
			playing: true,
		});

		document.title = `${trackItem?.name} · ${trackItem?.artists?.map((artist) => artist?.name).join(', ')}`
	};
	// if(audio){
	// 	audio.onended = () => {

	// 	}
	// }

	return (
		<div className="songRow" onClick={(e) => setActive(e)}>
			<div className="songRow_inner">
				<div className="songRow__index">
					<span className="songRow__index__number">&nbsp;{index + 1}</span>
					{playing && track?.id == trackItem?.id && trackInd == index ? (
						 <span className="songRow__index__icon"><PauseIcon onClick={(e) => {pauseTrack(trackItem)}}/></span>
					) : (
						<span className="songRow__index__icon"><PlayArrowIcon onClick={(e) => {playTrack(trackItem)}}/></span>
					)}
				</div>
				<img className="songRow__album" src={trackItem?.album?.images[0].url} alt=""/>
				<div className="songRow__info">
					<h1 className={trackInd == index && track?.id == trackItem?.id ? 'green' : ''}>{trackItem?.name}</h1>
					<p>
						{trackItem?.artists?.map((artist) => artist?.name).join(", ")}
						{trackItem?.album?.name}
					</p>
				</div>
			</div>
		</div>
	)
}

export default SongRow
