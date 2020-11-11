import React from 'react';
import { useDataLayerValue } from '../../../state/DataLayer';
import CategoryCard from '../HomeView/CategoryCard/CategoryCard';
import PlaylistCard from '../../../shared/PlaylistCard/PlaylistCard';

import './SearchView.css';

function SearchView({ spotify }) {

	const [{ categories, category_playlists }, dispatch] = useDataLayerValue();

	return (
		<div>
			{!category_playlists.length ? (
				<section>
					<h2 className="sectionTitle">PLAYLISTS</h2>
					<div className="categoriesContainer">
						{categories?.categories?.items?.map((cat, ind) =>(
							<CategoryCard
								key={ind}
								name={cat.name}
								imgUrl={cat?.icons[0]?.url}
								height={cat?.icons[0]?.height}
								width={cat?.icons[0]?.width}
								playlistId={cat.id}
							/>			
						))}
					</div>
				</section>
			) : (
				<section>
					<h2 className="sectionTitle">PLAYLISTS</h2>
					<div className="categoriesContainer">
						{category_playlists?.map((playlist, ind) =>(
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
			)}
		</div>
	)
}

export default SearchView
