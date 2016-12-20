import {UserActionTypes as Types} from '../actions/userAction'
import config from '../config'

const initialState = {
    isLoggedIn: false,
	accessToken: "",
	currentUser: {},
    user: {},
    status: null,
};

export default function user(state = initialState, action) {
    switch(action.type) {

		case Types.FetchingData:
            return Object.assign({}, state, {status: 'doing'});
		case Types.FetchSelfDataSuccess:
			//console.log("asdfsadfasdf");
			return Object.assign({}, state, {
				status: 'done',
				currentUser: action.user,
				user: action.user,
			});
		case Types.FetchDataError:
			return Object.assign({}, state, {
				status: null,
			});

		case Types.FetchOtherDataSuccess:
			//console.log("asdfsadfasdf");
			return Object.assign({}, state, {
				status: 'done',
				user: action.user,
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
				currentUser: {},
				//accessToken: "",
			});


		default: 
			return state;
    }
}