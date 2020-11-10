import React from 'react';
import Body from '../../layout/Body/Body';
import Sidebar from '../../layout/Sidebar/Sidebar';
import Footer from '../../layout/Footer/Footer';
import './Player.css';

function Player({ spotify }) {
	return (
		<div className="player">
			<Sidebar />
			<div className="player__body">
				<Body spotify={spotify} />
			</div>
			<Footer />
		</div>
	)
}

export default Player
