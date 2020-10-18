import React from 'react';
import './SongRow.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
function SongRow({ track, index }) {
	return (
		<div className="songRow">
			<div className="songRow__index">
				<span className="songRow__index__number">{index + 1}</span>
				<span className="songRow__index__icon"><PlayArrowIcon /></span>
			</div>
			<img className="songRow__album" src={track.album.images[0].url} alt=""/>
			<div className="songRow__info">
				<h1>{track.name}</h1>
				<p>
					{track.artists.map((artist) => artist.name).join(", ")}
					{track.album.name}
				</p>
			</div>
		</div>
	)
}

export default SongRow
