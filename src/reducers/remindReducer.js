import {RemindActionTypes as Types} from '../actions/remindAction'
import config from '../config'

const initialState = {
	remindList: [],
	remindName: "",
	remindDetail: {},
	mailList: [],
	pageInfo: {},
    isFetching: false,

	isDeletingRemind: false,
	deleteRemindSuccess: false,
};

export default function user(state = initialState, action) {
    switch(action.type) {

		case Types.FetchingData:
            return Object.assign({}, state, {isFetching: true});
        
		case Types.FetchDataError:
			return Object.assign({}, state, {
				isFetching: false,
				isDeletingRemind: false,
				deleteRemindSuccess: false
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

		case Types.DeletingRemind: 
			return Object.assign({}, state, {
				isDeletingRemind: true,
				deleteRemindSuccess: false
			});

		case Types.DeleteRemindSuccess: 
			return Object.assign({}, state, {
				isDeletingRemind: false,
				deleteRemindSuccess: true
			});

        case Types.CollectTopicSuccess:
            return Object.assign({}, state, {collectTopicSuccess: true});


		default: 
			return state;
    }
}