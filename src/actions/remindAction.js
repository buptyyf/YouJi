'use strict';

import { NetworkAction } from './networkAction';
import { Alert } from 'react-native';
import Symbol from 'es6-symbol';

export const RemindActionTypes = {
    FetchingData: Symbol('fetching'),
    FetchDataError: Symbol('error'),

	CollectTopicSuccess: Symbol('success'),

	FetchRemindInfoSuccess: Symbol('success'),

	FetchRemindDetailInfoSuccess: Symbol('success'),	
	FetchMailDetailInfoSuccess: Symbol('success'),
	DeletingRemind: Symbol('deleting'),
	DeleteRemindSuccess: Symbol('success'),
}

class RemindAction extends NetworkAction {

    //收藏文章
	collectTopic = (topicId, boardName) => (dispatch) => {
		const result = this.promiseNetwork({url: `collection/add.json`, method: 'POST'}, {board: boardName, id: topicId});
		result.then((res) => {
            console.log(res);
			dispatch({'type': RemindActionTypes.CollectTopicSuccess, topic: res});
		}).catch((e) => {
			console.log(e)
			Alert.alert(e.message);
			dispatch({'type': RemindActionTypes.FetchDataError, error: e});
		})
	}

    //删除所收藏的文章
	deleteCollectedTopic = (id) => (dispatch) => {
        dispatch({type: RemindActionTypes.DeletingRemind});
		const result = this.promiseNetwork({url: `collection/delete.json`, method: 'POST'}, {id: id});
		result.then((res) => {
            console.log(res);
			dispatch({'type': RemindActionTypes.DeleteRemindSuccess, topic: res});
		}).catch((e) => {
			console.log(e)
			Alert.alert(e.message);
			dispatch({'type': RemindActionTypes.FetchDataError, error: e});
		})
	}
	
    //获取remind、mail、collection的列表
	getRemindInfoAction = (segment, type, param) => (dispatch, getState) => {
		dispatch({type: RemindActionTypes.FetchingData});
		let result = segment != "collection" ? this.promiseNetwork({url: `${segment}/${type}.json`}, param) : this.promiseNetwork({url: `${segment}.json`}, param);
		result.then((res) => {
            console.log(res)
			dispatch({type: RemindActionTypes.FetchRemindInfoSuccess, remind: res});
		}).catch((e) => {
			Alert.alert(e.message);
			dispatch({'type': RemindActionTypes.FetchDataError, error: e});
		})
	}

	//获取某个具体remind的详情
	getRemindDetailInfoAction = (segment, type, id) => (dispatch, getState) => {
		dispatch({type: RemindActionTypes.FetchingData});
		const result = this.promiseNetwork({url: `${segment}/${type}/${id}.json`});
		result.then((res) => {
			dispatch({type: RemindActionTypes.FetchRemindDetailInfoSuccess, remindDetail: res});
		}).catch((e) => {
			Alert.alert(e.message);
			dispatch({'type': RemindActionTypes.FetchDataError, error: e});
		})
	}

	//删除remind和mail的记录
	deleteRemindAction = (segment, type, id) => (dispatch, getState) => {
		dispatch({type: RemindActionTypes.DeletingRemind});
		const result = this.promiseNetwork({url: `${segment}/${type}/delete/${id}.json`, method: 'POST'});
		result.then((res) => {
			dispatch({type: RemindActionTypes.DeleteRemindSuccess, remindDetail: res});
		}).catch((e) => {
			Alert.alert(e.message);
			dispatch({'type': RemindActionTypes.FetchDataError, error: e});
		})
	}
}

const RemindActions = new RemindAction();
export {
    RemindActions,
};