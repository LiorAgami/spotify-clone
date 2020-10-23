import React from 'react';
import {useDataLayerValue} from '../../../state/DataLayer';
import {useSoundLayerValue} from "../../../state/SoundLayer";
import SongRow from '../SongRow/SongRow';
import Header from '../Header/Header';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/Pause';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';



function PlaylistView({ spotify }) {
	const [{ index, track, playing, current_playlist }, dispatch] = useDataLayerValue();
	const [{ repeat }, soundDispatch] = useSoundLayerValue();

	const pauseTrack = () => {
		if((current_playlist?.tracks?.items[index]?.track?.id == track?.id)){
			soundDispatch({
				type: 'SET_PLAYING',
				playing: false,
			});

			return;
		}
	}

	const playTrack = () => {
		let track = current_playlist?.tracks?.items[index]?.track;

		dispatch({
			type: 'SET_TRACK',
			track: track,
			index:index
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
			<Header spotify={spotify} />
			<div className="body__info">
				<img src={current_playlist?.images[0]?.url} alt=""/>
				<div className="body__infoText">
					<strong>{!current_playlist?.isTrack ? 'PLAYLIST' : 'TRACK'}</strong>
					<h1>{current_playlist?.name}</h1>
					<p>{current_playlist?.description}</p>
				</div>
			</div>

			<div className="body__songs">
				<div className="body__icons">
					{ !playing ? (
						<PlayCircleFilledIcon  onClick={playTrack} className="body__shuffle green" />
					) : (
						<PauseIcon  onClick={pauseTrack} className="body__shuffle green" />
					)}

					<FavoriteIcon fontSize="large" />
					<MoreHorizIcon />
				</div>

				{current_playlist?.tracks?.items.map((item, ind) => (
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
