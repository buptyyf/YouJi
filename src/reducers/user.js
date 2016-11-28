import * as Types from '../actions/types'

const initialState = {
    isLoggedIn: false,
    user: {},
    status: null,
};

export default function user(state = initialState, action) {
    switch(action.type) {
        case Types.LOGGED_DOING:
            return {
                ...state,
                status: 'doing'
            };
        case Types.LOGGED_IN:
			console.log("asdfsadfasdf");
			return {
				...state,
				isLoggedIn: true,
				user: action.user,
				status: 'done'
			};

		case Types.LOGGED_OUT:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: null
			};
		case Types.LOGGED_ERROR:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: null
			}

		default: 
			return state;
    }
}