import React from 'react';
import {useDataLayerValue} from '../../state/DataLayer';
import PlaylistView from './PlaylistView/PlaylistView';
import HomeView from './HomeView/HomeView';
import LibraryView from './LibraryView/LibraryView';
import './Body.css';

function Body({ spotify }) {
	const [{ library_playlists, current_playlist }, dispatch] = useDataLayerValue();

	const renderComponent = () =>{
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
