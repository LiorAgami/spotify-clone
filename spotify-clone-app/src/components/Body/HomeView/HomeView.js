import React from 'react';
import PlaylistCard from './PlaylistCard/PlaylistCard';
import './HomeView.css';
import { useDataLayerValue } from '../../../state/DataLayer';

function HomeView() {

	const [{featured_playlists, recent_played_playlists}, dispatch] = useDataLayerValue();

	return (
	<div>
		<section>
			<h2 className="sectionTitle">FEATURED PLAYLISTS</h2>
			<div className="cardsContainer">
				{featured_playlists?.playlists?.items.map((playlist, ind) =>(
					<PlaylistCard
						playlistId={playlist.id}
						img={playlist?.images[0]?.url}
						title={playlist.name}
						desc={playlist.description}
						key={ind}
					/>
				))}


			</div>
		</section>
		<section>
			<h2 className="sectionTitle">RECENTLY PLAYED</h2>
			<div className="cardsContainer">
				{recent_played_playlists?.items?.map((playlist, ind) =>(
					<PlaylistCard img={playlist?.track?.album.images[0]?.url}
						title={playlist?.track.name}
						desc={playlist?.track?.artists.map((artist) => artist.name).join(", ")}
						key={playlist.id}
					/>
				))}


			</div>
		</section>
	</div>
	)
}

export default HomeView
