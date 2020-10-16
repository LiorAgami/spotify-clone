export const initialState = {
	user: null,
	playlists: [],
	playing: false,
	item: null,
	//REMOVE after finished developing.
	token:'BQCwXyZRHADbSP0wpajXA2uG5wztDGD5jGvBAwUdJb9L0_iHy3oMFIkNJpHyI0aVtNyTVWXZ73cXaXoIInjAWRjFYewyTapnEBdtZ0jzncybLTzpxfDR3MdymfS3HfWE5kOJ8rcgQEr8MhpE4cvDNpsAyEfpfmKstCKw-sAnDTV893f-1hsM'
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

		default:
			return state;
	}
}

export default reducer;