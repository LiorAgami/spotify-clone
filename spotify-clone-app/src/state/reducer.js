export const initialState = {
	user: null,
	playlists: [],
	featured_playlists: [],
	category_playlists: [],
	recent_played_playlists: [],
	library_playlists: [],
	current_displayed_playlist: [],
	current_playing_playlist: [],
	top_artists: [],
	playing: false,
	item: null,
	tracks: null,
	track: null,
	track_index: null,
	active_page:'Home',
};

const reducer = (state, action) => {

	switch(action.type){
		case 'SET_USER':
			return {
				...state,
				user:action.user
			};
		case 'SET_ACTIVE_PAGE':
			return {
				...state,
				active_page:action.active_page
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
		case 'SET_LIBRARY_PLAYLISTS':
			return {
				...state,
				library_playlists:action.library_playlists
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
		case 'SET_CATEGORIES':
			return {
				...state,
				categories:action.categories
			};
		case 'SET_CATEGORY_PLAYLIST':
			return {
				...state,
				category_playlists:action.category_playlists
			};
		case 'SET_CURRENT_DISPLAYED_PLAYLIST':
			return {
				...state,
				current_displayed_playlist:action.playlist_items
			};
		case 'SET_CURRENT_PLAYING_PLAYLIST':
			return {
				...state,
				current_playing_playlist:action.playlist_items
			};
		case 'SET_TOP_ARTISTS': {
			return {
				...state,
				top_artists: action.top_artists
			};
		}
		case 'SET_TRACKS': {
			return {
				...state,
				tracks: action.tracks
			};
		}
		case 'SET_TRACK': {
			return {
				...state,
				track: action.track,
				track_index:action.index
			};
		}
		default:
			return state;
	}
}

export default reducer;