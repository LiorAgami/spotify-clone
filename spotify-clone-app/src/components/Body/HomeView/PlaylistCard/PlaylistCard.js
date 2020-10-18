import React from 'react';
import './PlaylistCard.css';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function PlaylistCard(props) {
	return (
		<div className="cardsContainer__card">
			<div className="cardRow">
				<div className="cardRow__card">
					<div className="cardRow__card__inner">
						<div className="cardRow__card__inner__imgContainer">
							<img src={props.img}/>
							<span className="cardRow__card__inner__imgContainer__playIcon"><PlayArrowIcon/></span>
						</div>
						<div className="cardRow__card__inner__textContainer">
						<a href="#">{props.title}</a>
							<div>{props.desc}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlaylistCard
