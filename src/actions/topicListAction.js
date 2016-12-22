'use strict';

import { NetworkAction } from './networkAction';
import config from '../config';
import Symbol from 'es6-symbol';

const TopicListUrl = {
    TopTen: 'widget/topten.json',
    Recommand: 'widget/recommend.json',
};

export const TopicListActionTypes = {
    FetchingData: Symbol('fetching'),
	FetchDataSuccess: Symbol('success'),
    FetchDataError: Symbol('error'),
}

class TopicListAction extends NetworkAction {
    //获取十大列表
    topTenList = () => (dispatch, getState) => {
        let userToken = getState().userStore.accessToken;
        if(userToken !== "") {
            NetworkAction.oauth_token = userToken;
            console.log("topTenList: ", NetworkAction.oauth_token);
        } else {
            console.log("userToken空啦！！！！！");
            NetworkAction.oauth_token = config.oauth_token;
        }
		dispatch({'type': TopicListActionTypes.FetchingData});
        //console.log('aaaaa');
		const result = this.promiseNetwork({url: TopicListUrl.TopTen});
        console.log(result);
		result.then((res) => {
            console.log(res);
            //清洗数据，去掉括号以及其中的数字
            let newArticle = res.article.map((article, index) => {
                let reg = new RegExp("\\(" + article.id_count + "\\)");
                //console.log(reg);
                article.title = article.title.replace(reg, "");
                //console.log(article.title);
                return article;
            });
            console.log(newArticle);
			dispatch({'type': TopicListActionTypes.FetchDataSuccess, topicList: newArticle});
		}).catch((e) => {
			console.log(e.message);
			dispatch({'type': TopicListActionTypes.FetchDataError, error: e});
		})
	}

    getTopicList = (boradName) => (dispatch) => {
        dispatch({'type': TopicListActionTypes.FetchingData});
        const result = this.promiseNetwork({url: `board/${boradName}.json`}, {count: 10});
        console.log(result);
		result.then((res) => {
			dispatch({'type': TopicListActionTypes.FetchDataSuccess, topicList: result.article});
		}).catch((e) => {
			console.log(e.message);
			dispatch({'type': TopicListActionTypes.FetchDataError, error: e});
		})
    }
}

const TopicListActions = new TopicListAction();
export {
    TopicListActions,
};