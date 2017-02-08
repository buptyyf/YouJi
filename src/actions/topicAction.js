'use strict';

import { NetworkAction } from './networkAction';
import { Alert } from 'react-native';
import Symbol from 'es6-symbol';

export const TopicActionTypes = {
    FetchingData: Symbol('fetching'),
	FetchDataSuccess: Symbol('success'),
	FirstLoadData: Symbol('FirstLoadData'),
    FetchDataError: Symbol('error'),
}

class TopicAction extends NetworkAction {

	topicDetail = (topicId, boardName, params) => (dispatch) => {
		dispatch({'type': TopicActionTypes.FetchingData});
		if(!params) {//请求内容详情首页
			dispatch({'type': TopicActionTypes.FirstLoadData})
		}
		const result = this.promiseNetwork({url: `threads/${boardName}/${topicId}.json`}, params);
		result.then((res) => {
            //console.log(res);
			dispatch({'type': TopicActionTypes.FetchDataSuccess, topic: res});
		}).catch((e) => {
			Alert.alert(e.message);
			dispatch({'type': TopicActionTypes.FetchDataError, error: e});
		})
	}
	
}

const TopicActions = new TopicAction();
export {
    TopicActions,
};