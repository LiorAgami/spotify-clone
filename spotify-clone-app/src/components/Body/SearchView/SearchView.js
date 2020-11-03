import React from 'react';
import { useDataLayerValue } from '../../../state/DataLayer';
import './SearchView.css';
import CategoryCard from '../HomeView/CategoryCard/CategoryCard';

function SearchView({ spotify }) {

	const [{ categories }, dispatch] = useDataLayerValue();

	return (
		<div>
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
						/>
					))}
				</div>
			</section>
		</div>
	)
}

export default SearchView
