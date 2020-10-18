import React from 'react';
import './Body.css';
import PlaylistView from './PlaylistView/PlaylistView';
import HomeView from './HomeView/HomeView';

function Body({ spotify }) {
	// const [{discover_weekly}, dispatch] = useDataLayerValue();
	return (
		<div className="body">
			{/* <PlaylistView spotify={spotify} /> */}
			<HomeView />
		</div>
	)
}

export default Body
