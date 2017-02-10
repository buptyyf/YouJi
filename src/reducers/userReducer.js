import {UserActionTypes as Types} from '../actions/userAction'
import config from '../config'

const initialState = {
    isLoggedIn: false,
	accessToken: "",
	currentUser: {},
    user: {},
	remindList: [],
	remindName: "",
	remindDetail: {},
	mailList: [],
	pageInfo: {},
    isFetching: false,
};

export default function user(state = initialState, action) {
    switch(action.type) {

		case Types.FetchingData:
            return Object.assign({}, state, {isFetching: true});
		case Types.FetchSelfDataSuccess:
			//console.log("asdfsadfasdf");
			return Object.assign({}, state, {
				isFetching: false,
				currentUser: action.user,
				user: action.user,
			});
		case Types.FetchDataError:
			return Object.assign({}, state, {
				isFetching: false,
			});

		case Types.FetchOtherDataSuccess:
			//console.log("asdfsadfasdf");
			return Object.assign({}, state, {
				isFetching: false,
				user: action.user,
			});
		
		//把@我回复我的和我的信箱和我收藏的文章合并，在一个type中进行处理
		case Types.FetchRemindInfoSuccess:
			console.log("userReducer", action.remind)
			if (action.remind.pagination.page_current_count === 1) {
				return Object.assign({}, state, {
					isFetching: false,
					remindList: action.remind.article || action.remind.mail,
					pageInfo: action.remind.pagination,
					remindName: action.remind.description || "我的收藏"
				});
			} else {
				let mergeRemindList = state.remindList.concat(action.remind.article || action.remind.mail);
				return Object.assign({}, state, {
					isFetching: false,
					remindList: mergeRemindList,
					pageInfo: action.remind.pagination,
					remindName: action.remind.description || "我的收藏"
				});
			}

		case Types.FetchRemindDetailInfoSuccess:
			return Object.assign({}, state, {
				isFetching: false,
				remindDetail: action.remindDetail
			});
        
		case Types.LOGGED_IN:
			console.log("LOGGED_IN");
			return Object.assign({}, state, {
				isFetching: false,
				isLoggedIn: true,
				accessToken: action.accessToken,
			});

		case Types.LOGGED_OUT:
			return Object.assign({}, state, {
				isFetching: false,
				isLoggedIn: false,
				currentUser: {},
				//accessToken: "",
			});


		default: 
			return state;
    }
}