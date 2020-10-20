import React from 'react';
import './SongRow.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {useDataLayerValue} from '../../../state/DataLayer';
import {useSoundLayerValue} from '../../../state/SoundLayer';

function SongRow({ track, index }) {
	const [{}, dispatch] = useDataLayerValue();
	const [{playing, repeat}, soundDispatch] = useSoundLayerValue();

	const changeTrack = (e, track) => {debugger;
		dispatch({
			type: 'SET_TRACK',
			track: track
		});

		let wasPlaying = playing;
		soundDispatch({
			type: 'SET_PLAYING',
			playing: false,
		});

		let audio = new Audio(track.preview_url);
		audio.loop = repeat;
		soundDispatch({
			type: 'SET_AUDIO',
			audio: audio
		});

		if(wasPlaying) {
			soundDispatch({
				type: 'SET_PLAYING',
				playing: true,
			});
		}

		document.title = `${track?.name} · ${track?.artists.map((artist) => artist?.name).join(', ')}`
	};

	return (
		<div className="songRow" onClick={(e) => changeTrack(e, track)}>
			<div className="songRow_inner">
				<div className="songRow__index">
					<span className="songRow__index__number">&nbsp;{index + 1}</span>
					<span className="songRow__index__icon"><PlayArrowIcon /></span>
				</div>
				<img className="songRow__album" src={track?.album?.images[0].url} alt=""/>
				<div className="songRow__info">
					<h1>{track?.name}</h1>
					<p>
						{track?.artists.map((artist) => artist?.name).join(", ")}
						{track?.album?.name}
					</p>
				</div>
			</div>
		</div>
	)
}

export default SongRow
