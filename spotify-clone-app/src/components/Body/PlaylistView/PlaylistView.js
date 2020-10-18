import React from 'react';
import {useDataLayerValue} from '../../../state/DataLayer';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from '../SongRow/SongRow';
import Header from '../Header/Header';


function PlaylistView({ spotify }) {

	const [{discover_weekly}, dispatch] = useDataLayerValue();

	return (
		<div>
			<Header spotify={spotify}/>
			<div className="body__info">
				<img src={discover_weekly?.images[0].url} alt=""/>
				<div className="body__infoText">
					<strong>PLAYLIST</strong>
					<h2>Discover Weekly</h2>
					<p>{discover_weekly?.description}</p>
				</div>
			</div>

			<div className="body__songs">
			<div className="body__icons">
				<PlayCircleFilledIcon  className="body__shuffle"/>
				<FavoriteIcon fontSize="large"/>
				<MoreHorizIcon />
			</div>

			{discover_weekly?.tracks.items.map((item, ind) => (
				<SongRow index={ind} track={item.track} />
			))}

			</div>
		</div>
	)
}

export default PlaylistView
