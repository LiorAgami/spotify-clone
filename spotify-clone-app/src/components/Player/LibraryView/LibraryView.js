import React from 'react';
import { useDataLayerValue } from '../../../state/DataLayer';
import PlaylistCard from '../../../shared/PlaylistCard/PlaylistCard';

function HomeView() {

	const [{ playlists }, dispatch] = useDataLayerValue();

	return (
		<div>
			<section>
				<h2 className="sectionTitle">PLAYLISTS</h2>
				<div className="cardsContainer">
					{playlists?.items?.map((playlist, ind) =>(
						<PlaylistCard
							playlistId={playlist.id}
							img={playlist?.images[0]?.url}
							title={playlist.name}
							desc={playlist.description}
							key={playlist.id}
							isPlaylist={true}
						/>
					))}
				</div>
			</section>
		</div>
	)
}

export default HomeView
