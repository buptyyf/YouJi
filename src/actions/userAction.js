'use strict';

import { Alert } from 'react-native';
import {NetworkAction} from './networkAction'

export const UserActionTypes = {
	LOGGED_IN: 'LOGGED_IN',
	LOGGED_OUT: 'LOGGED_OUT',
	FetchingData: Symbol('fetching'),
	FetchDataSuccess: Symbol('success'),
    FetchDataError: Symbol('error'),
}

class UserAction extends NetworkAction {

	getUserInfoAction = (token) => (dispatch) => {
		dispatch({type: UserActionTypes.FetchingData});
		const result = this.promiseNetwork({url: "user/getinfo.json"}, token);
		result.then((res) => {
			dispatch({type: UserActionTypes.FetchDataSuccess, user: res});
		}).catch((e) => {
			Alert.alert(e.message);
			dispatch({'type': UserActionTypes.FetchDataError, error: e});
		})
	}

	loginAction = (accessToken) => (dispatch) => {
		//console.log("loginAction");
		dispatch({type: UserActionTypes.LOGGED_IN, accessToken: accessToken})
	}

	logOutAction = () => {
		return {
			type: UserActionTypes.LOGGED_OUT
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