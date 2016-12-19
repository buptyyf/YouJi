import {UserActionTypes as Types} from '../actions/userAction'
import config from '../config'

const initialState = {
    isLoggedIn: false,
	accessToken: "",
    user: {},
    status: null,
};

export default function user(state = initialState, action) {
    switch(action.type) {

		case Types.FetchingData:
            return Object.assign({}, state, {status: 'doing'});

		case Types.FetchDataSuccess:
			//console.log("asdfsadfasdf");
			return Object.assign({}, state, {
				status: 'done',
				user: action.user
			});

		case Types.FetchDataError:
			return Object.assign({}, state, {
				status: null,
				user: {}
			});
        
		case Types.LOGGED_IN:
			console.log("LOGGED_IN");
			return Object.assign({}, state, {
				status: 'done',
				isLoggedIn: true,
				accessToken: action.accessToken,
			});

		case Types.LOGGED_OUT:
			return Object.assign({}, state, {
				status: null,
				isLoggedIn: false,
				user: {},
				//accessToken: "",
			});


		default: 
			return state;
    }
}