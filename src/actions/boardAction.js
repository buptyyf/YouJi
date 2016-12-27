'use strict';

import { NetworkAction } from './networkAction';
import config from '../config';
import Symbol from 'es6-symbol';
import {Alert} from 'react-native';

// const BoardUrl = {
//     BoardList: 'section/topten.json',
//     Recommand: 'widget/recommend.json',
// };

export const BoardActionTypes = {
    FetchingData: Symbol('fetching'),
	FetchAllDataSuccess: Symbol('success'),
    FetchFollowedDataSuccess: Symbol('success'),
    FetchDataError: Symbol('error'),
}

class BoardAction extends NetworkAction {
    //获取版面信息
    getBoardList = (sectionId) => (dispatch) => {
		dispatch({'type': BoardActionTypes.FetchingData});
		const result = this.promiseNetwork({url: `section/${sectionId}.json`});
		result.then((res) => {
            //console.log(res);
			dispatch({'type': BoardActionTypes.FetchAllDataSuccess, section: res});
		}).catch((e) => {
			Alert.alert(e.message);
			dispatch({'type': BoardActionTypes.FetchDataError, error: e});
		})
	}

    //获取我关注的版面的信息
    getFollowedBoardList = () => (dispatch) => {
        dispatch({'type': BoardActionTypes.FetchingData});
        const result = this.promiseNetwork({url: `favorite/0.json`});
		result.then((res) => {
            //console.log(res);
			dispatch({'type': BoardActionTypes.FetchFollowedDataSuccess, section: res});
		}).catch((e) => {
			Alert.alert(e.message);
			dispatch({'type': BoardActionTypes.FetchDataError, error: e});
		})
    }

    followBoard = (boardName) => (dispatch) => {
        const result = this.promiseNetwork({url: `favorite/add/0.json`, method: 'POST'}, {name: boardName, dir: 0});
        console.log("收藏", result);
    }

    cancelFollowBoard = (boardName) => (dispatch) => {
        const result = this.promiseNetwork({url: `favorite/delete/0.json`, method: 'POST'}, {name: boardName, dir: 0});
        console.log("取消收藏，", result);
    }
}

const BoardActions = new BoardAction();
export {
    BoardActions,
};