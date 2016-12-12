'use strict';

import { AlertIOS } from 'react-native';
import {NetworkAction} from './networkAction'

export const UserActionTypes = {
	LOGGED_IN: 'LOGGED_IN',
	LOGGED_OUT: 'LOGGED_OUT',
	LOGGED_ERROR: 'LOGGED_ERROR',
	LOGGED_DOING: 'LOGGED_DOING'
}

// fake user data
let testUser = {
	'name': 'juju',
	'age': '24',
	'avatar': 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460'
};

// for skip user 
let skipUser = {
	'name': 'guest',
	'age': 20,
	'avatar': 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460',
};
class UserAction extends NetworkAction {

	loginAction = opt => (dispatch) => {
		dispatch({'type': UserActionTypes.LOGGED_DOING});
		const result = this.promiseNetwork({url: "user/getinfo.json"});
		result.then((res) => {
			dispatch({'type': UserActionTypes.LOGGED_IN, user: res});
		}).catch((e) => {
			AlertIOS.alert(e.message);
			dispatch({'type': UserActionTypes.LOGGED_ERROR, error: e});
		})
	}

	skipLoginAction = () => {
		return {
			'type': UserActionTypes.LOGGED_IN,
			'user': skipUser,
		}
	}

	logOutAction = () => {
		return {
			'type': UserActionTypes.LOGGED_OUT
		}
	}
}
// // login
// export function logIn(opt){
// 	return (dispatch) => {
// 		dispatch({'type': UserActionTypes.LOGGED_DOING});
// 		let inner_get = fetch('https://www.baidu.com')
// 			.then((res)=>{
// 				dispatch({'type': UserActionTypes.LOGGED_IN, user: testUser});
// 			}).catch((e)=>{
// 				AlertIOS.alert(e.message);
// 				dispatch({'type': UserActionTypes.LOGGED_ERROR, error: e});
// 			});
// 	}
// }



// // skip login
// export function skipLogin(){
// 	return {
// 		'type': UserActionTypes.LOGGED_IN,
// 		'user': skipUser,
// 	}
// }


// // logout
// export function logOut(){
// 	return {
// 		'type': UserActionTypes.LOGGED_OUT
// 	}
// }

const UserActions = new UserAction();
export {UserActions};