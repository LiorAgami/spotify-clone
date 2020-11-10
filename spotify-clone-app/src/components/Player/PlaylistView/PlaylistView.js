import React from 'react';
import {useDataLayerValue} from '../../../state/DataLayer';
import {useSoundLayerValue} from "../../../state/SoundLayer";
import SongRow from './SongRow/SongRow';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './PlaylistView.css';


function PlaylistView({ spotify }) {
	const [{ track_index, track, current_displayed_playlist }, dispatch] = useDataLayerValue();
	const [{ playing, repeat }, soundDispatch] = useSoundLayerValue();

	const pauseTrack = () => {
		if(!(current_displayed_playlist?.tracks?.items[track_index]?.track?.id == track?.id)) return;

		soundDispatch({
			type: 'SET_PLAYING',
			playing: false,
		});
	}

	const playTrack = () => {
		if(!(current_displayed_playlist?.tracks?.items[track_index]?.track)) return;

		dispatch({
			type: 'SET_TRACK',
			track: track,
			index:track_index
		});

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

		soundDispatch({
			type: 'SET_PLAYING',
			playing: true,
		});

		document.title = `${track?.name} · ${track?.artists?.map((artist) => artist?.name).join(', ')}`
	};

	return (
		<div>
			<div className="playlistView__info">
				<img src={current_displayed_playlist?.images[0]?.url} alt=""/>
				<div className="playlistView__infoText">
					<strong>{!current_displayed_playlist?.isTrack ? 'PLAYLIST' : 'TRACK'}</strong>
					<h1>{current_displayed_playlist?.name}</h1>
					<p>{current_displayed_playlist?.description}</p>
				</div>
			</div>

			<div className="playlistView__songs">
				<div className="playlistView__icons">
					{ !playing ? (
						<div className="playlistView__playIconCont">
							<PlayArrowIcon  onClick={playTrack} className="playlistView__playIcon" />
						</div>
					) : (
						<div className="playlistView__stopIconCont">
							<PauseIcon  onClick={pauseTrack} className="playlistView__stopIcon" />
						</div>
					)}

					<FavoriteIcon fontSize="large" />
					<MoreHorizIcon />
				</div>

				{current_displayed_playlist?.tracks?.items.map((item, ind) => (
					<SongRow
						key={item.id + String(ind)}
						index={ind} trackItem={item?.track}
					/>
				))}
			</div>
		</div>
	)
}

export default PlaylistView
