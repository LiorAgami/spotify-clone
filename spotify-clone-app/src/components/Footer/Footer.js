import React from 'react';
import './Footer.css';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import {Grid, Slider} from '@material-ui/core';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';

function Footer() {
	return (
		<div className="footer">
			<div className="footer__left">
				<img className="footer__albumLogo" src="https://img.discogs.com/eQuGAt6PwrCW8vEGW_n-DLaD4bQ=/fit-in/600x523/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2072712-1557768542-8030.jpeg.jpg" alt="" />
				<div className="footer_songInfo">
					<h4>yeah</h4>
					<p>usher</p>
				</div>
			</div>
			<div className="footer__center">
				<ShuffleIcon className=""/>
				<SkipPreviousIcon className="footer__icon"/>
				<PlayCircleOutlineIcon fontSize="large" className="footer__icon"/>
				<SkipNextIcon className="footer__icon"/>
				<RepeatIcon className=""/>
			</div>
			<div className="footer__right">
				<Grid container spacing={2}>
					<Grid item>
						<PlaylistPlayIcon />
					</Grid>
					<Grid item>
						<VolumeDownIcon />
					</Grid>
					<Grid item xs>
						<Slider/>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

export default Footer
