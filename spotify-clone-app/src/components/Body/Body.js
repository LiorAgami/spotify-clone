import React from 'react';
import './Body.css';
import PlaylistView from './PlaylistView/PlaylistView';
import {useDataLayerValue} from '../../state/DataLayer';
import HomeView from './HomeView/HomeView';

function Body({ spotify }) {
	const [{current_playlist}, dispatch] = useDataLayerValue();

	return (
		<div className="body">
			{
				current_playlist?.tracks?.items.length
					? <PlaylistView spotify={spotify} />
					: <HomeView />
			}

		</div>
	)
}

export default Body
