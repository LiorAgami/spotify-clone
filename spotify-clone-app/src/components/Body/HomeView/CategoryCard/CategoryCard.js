import React from 'react';
import './CategoryCard.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function CategoryCard({ name, imgUrl, height, width}) {
	return ( 
		<div className="categoryCard">
			<div className="categoryCard__Row">
				<div className="categoryCard__card">
					<div className="categoryCard__cardInner">
						<div className="categoryCard__imgCont">
							<img src={imgUrl} height={height}  width={width}/>
							<span className="categoryCard__playIcon">
								<PlayArrowIcon/>
							</span>
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
