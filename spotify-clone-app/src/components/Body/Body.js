import React from 'react';
import {useDataLayerValue} from '../../state/DataLayer';
import PlaylistView from './PlaylistView/PlaylistView';
import Header from './Header/Header';
import HomeView from './HomeView/HomeView';
import SearchView from './SearchView/SearchView';
import LibraryView from './LibraryView/LibraryView';
import './Body.css';

function Body({ spotify }) {
	const [{ active_page, library_playlists, current_displayed_playlist }, dispatch] = useDataLayerValue();

	const renderComponent = () =>{
		if(active_page == 'Playlist') return <PlaylistView spotify={spotify} />;
		if(active_page == 'Library') return <LibraryView spotify={spotify} />;
		if(active_page == 'Home') return <HomeView />;
		if(active_page == 'Search') return <SearchView />;
		// if(current_displayed_playlist?.tracks?.items?.length) return <PlaylistView spotify={spotify} />;
		// if(library_playlists?.items?.length) return <LibraryView spotify={spotify} />;

		return <HomeView />;
	}
	return (
		<div className="body">
			<Header spotify={spotify}/>
			<div className="body__main">
				{ renderComponent() }
			</div>
		</div>
	)
}

export default Body
