export const initialState = {
	user: null,
	playlists: [],
	featured_playlists: [],
	recent_played_playlists: [],
	playing: false,
	item: null,
	//REMOVE after finished developing.
	// token:'BQCwXyZRHADbSP0wpajXA2uG5wztDGD5jGvBAwUdJb9L0_iHy3oMFIkNJpHyI0aVtNyTVWXZ73cXaXoIInjAWRjFYewyTapnEBdtZ0jzncybLTzpxfDR3MdymfS3HfWE5kOJ8rcgQEr8MhpE4cvDNpsAyEfpfmKstCKw-sAnDTV893f-1hsM'
};

const reducer = (state, action) => {

	//Action -> type, [payload]

	switch(action.type){
		case 'SET_USER':
			return {
				...state,
				user:action.user
			};
		case 'SET_TOKEN':
			return {
				...state,
				token:action.token
			};
		case 'SET_PLAYLISTS':
			return {
				...state,
				playlists:action.playlists
			};
		case 'SET_DISCOVER_WEEKLY':
			return {
				...state,
				discover_weekly:action.discover_weekly
			};
		case 'SET_FEATURED_PLAYLISTS':
			return {
				...state,
				featured_playlists:action.featured_playlists
			};
		case 'SET_FEATURED_PLAYLISTS':
			return {
				...state,
				featured_playlists:action.featured_playlists
			};
		case 'SET_RECENT_PLAYED_PLAYLISTS':
			return {
				...state,
				recent_played_playlists:action.recent_played
			};

		default:
			return state;
	}
}

export default reducer;