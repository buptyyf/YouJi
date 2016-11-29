import * as Types from '../actions/types'

const initialState = {
    isLoggedIn: false,
    user: {},
    status: null,
};

export default function user(state = initialState, action) {
    switch(action.type) {

		case Types.LOGGED_DOING:
            return Object.assign({}, state, {status: 'doing'});
        
		case Types.LOGGED_IN:
			//console.log("asdfsadfasdf");
			return Object.assign({}, state, {
				status: 'done',
				isLoggedIn: true,
				user: action.user
			});

		case Types.LOGGED_OUT:
			return Object.assign({}, state, {
				status: null,
				isLoggedIn: false,
				user: {}
			});

		case Types.LOGGED_ERROR:
			return Object.assign({}, state, {
				status: null,
				isLoggedIn: false,
				user: {}
			});

		default: 
			return state;
    }
}