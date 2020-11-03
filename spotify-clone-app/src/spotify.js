
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/"; // development-uri
const clientid = "5ec37b0a7b5749ab813e0171cd1717db"; // development-code

// const redirectUri = "https://lior-dev.com/spotify-clone/"; // production-uri
// const clientid = "a3636aafd5c54643bab2040f851225e0"; // production-code

const scopes = [
	"user-read-currently-playing",
	"user-read-recently-played",
	"user-read-playback-state",
	"user-top-read",
	"user-modify-playback-state",
];

export const getTokenFromUrl = () => {
	return window.location.hash
		.substring(1)
		.split('&')
		.reduce((initial, item) => {
			let parts = item.split('=');
			initial[parts[0]] = decodeURIComponent(parts[1]);

			return initial;
		}, {});
};

export const loginUrl = `${authEndpoint}?
	client_id=${clientid}&
	redirect_uri=${redirectUri}&
	scope=${scopes.join('%20')}&
	response_type=token&show_dialog=true`;