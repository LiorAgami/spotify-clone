import React from 'react';
import {useDataLayerValue} from '../../../state/DataLayer';
import {useSoundLayerValue} from "../../../state/SoundLayer";

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from '../SongRow/SongRow';
import Header from '../Header/Header';


function PlaylistView({ spotify }) {
	const [{current_playlist, discover_weekly}, dispatch] = useDataLayerValue();
	const [{audio}, soundDispatch] = useSoundLayerValue();
	if(audio){
		audio.onended = () => {
			alert(1);
			}
	}
	return (
		<div>
			<Header spotify={spotify}/>
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
				<PlayCircleFilledIcon  className="body__shuffle green"/>
				<FavoriteIcon fontSize="large"/>
				<MoreHorizIcon />
			</div>

			{current_playlist?.tracks?.items.map((item, ind) => (
				<SongRow key={item.id + String(ind)} index={ind} trackItem={item?.track} />
			))}

			</div>
		</div>
	)
}

export default PlaylistView
