import React from 'react';
import {useDataLayerValue} from '../../state/DataLayer';
import Header from '../Header/Header';
import PlaylistView from '../../components/Player/PlaylistView/PlaylistView';
import HomeView from '../../components/Player/HomeView/HomeView';
import SearchView from '../../components/Player/SearchView/SearchView';
import LibraryView from '../../components/Player/LibraryView/LibraryView';
import './Body.css';

function Body({ spotify }) {
	const [{ active_page, library_playlists, current_displayed_playlist }, dispatch] = useDataLayerValue();

	const renderComponent = () =>{
		if(active_page == 'Playlist') return <PlaylistView spotify={spotify} />;
		if(active_page == 'Library') return <LibraryView spotify={spotify} />;
		if(active_page == 'Home') return <HomeView />;
		if(active_page == 'Search') return <SearchView />;

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
