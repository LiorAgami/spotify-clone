import React from 'react';
import {useDataLayerValue} from '../../../state/DataLayer';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from '../SongRow/SongRow';
import Header from '../Header/Header';


function PlaylistView({ spotify }) {
	const [{current_playlist, discover_weekly}, dispatch] = useDataLayerValue();

	return (
		<div>
			<Header spotify={spotify}/>
			<div className="body__info">
				<img src={current_playlist?.images[0].url} alt=""/>
				<div className="body__infoText">
					<strong>PLAYLIST</strong>
					<h2>{current_playlist?.name}</h2>
					<p>{current_playlist?.description}</p>
				</div>
			</div>

			<div className="body__songs">
			<div className="body__icons">
				<PlayCircleFilledIcon  className="body__shuffle green"/>
				<FavoriteIcon fontSize="large"/>
				<MoreHorizIcon />
			</div>

			{current_playlist?.tracks.items.map((item, ind) => (
				<SongRow index={ind} track={item.track} />
			))}

			</div>
		</div>
	)
}

export default PlaylistView
