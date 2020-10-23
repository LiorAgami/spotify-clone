import React from 'react';
import Body from '../../components/Body/Body';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import './Player.css';

function Player({ spotify }) {
	return (
		<div className="player">
			<div className="player__body">
				<Sidebar />
				<Body spotify={spotify} />
			</div>

			<Footer />
		</div>
	)
}

export default Player
