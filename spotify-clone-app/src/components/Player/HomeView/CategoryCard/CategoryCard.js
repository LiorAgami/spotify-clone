import React from 'react';
import './CategoryCard.css';
import {useDataLayerValue} from '../../../../state/DataLayer';
import {useSoundLayerValue} from "../../../../state/SoundLayer";
import { Subject } from 'rxjs'
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function CategoryCard({ name, imgUrl, height, width, playlistId, trackId, isTrack}) {

	const [{}, dispatch] = useDataLayerValue();
	const [{ volume, repeat }, soundDispatch] = useSoundLayerValue();

	const viewCategoryPlaylists = () => {
		
		const playlist_id = playlistId || '';
		if(!playlist_id) return;

		return spotify.getCategoryPlaylists(playlist_id, {market:'IL'})
			.then((category_playlists) => {
				dispatch({
					type: 'SET_CATEGORY_PLAYLISTS',
					category_playlists: category_playlists?.playlists?.items
				});
		});
	}

	return ( 
		<div className="categoryCard" onClick={viewCategoryPlaylists}>
			<div className="categoryCard__Row">
				<div className="categoryCard__card">
					<div className="categoryCard__cardInner">
						<div className="categoryCard__imgCont">
							<img src={imgUrl} height={height}  width={width}/>
						</div>
						<div className="categoryCard__textCont">
						<a href="#">{name}</a>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CategoryCard
