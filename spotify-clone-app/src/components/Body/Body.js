import React from 'react';
import './Body.css';
import PlaylistView from './PlaylistView/PlaylistView';
import {useDataLayerValue} from '../../state/DataLayer';
import HomeView from './HomeView/HomeView';
import LibraryView from './LibraryView/LibraryView';

function Body({ spotify }) {
	const [{library_playlists, current_playlist}, dispatch] = useDataLayerValue();

	let renderComponent = () =>{
		if(current_playlist?.tracks?.items?.length) return <PlaylistView spotify={spotify} />;
		if(library_playlists?.items?.length) return <LibraryView spotify={spotify} />;

		return <HomeView />;
	}
	return (
		<div className="body">
			{ renderComponent() }
		</div>
	)
}

export default Body
