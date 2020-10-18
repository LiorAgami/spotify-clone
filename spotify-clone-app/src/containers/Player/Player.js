import React from 'react';
import './Player.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Body from '../../components/Body/Body';
import Footer from '../../components/Footer/Footer';

function Player({ spotify }) {
	return (
		<div className="player">
			<div className="player__body">
				<Sidebar />
				<Body spotify={spotify}/>
			</div>

			<Footer />

		</div>
	)
}

export default Player
