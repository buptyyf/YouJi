'use strict';

import { NetworkAction } from './networkAction'

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
    topTenList = () => (dispatch) => {
		dispatch({'type': TopicListActionTypes.FetchingData});
        //console.log('aaaaa');
		const result = this.promiseNetwork({url: TopicListUrl.TopTen});
        console.log(result);
		result.then((res) => {
            console.log(res);
            //TODO清洗数据，去掉括号以及其中的数字
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
}

const TopicListActions = new TopicListAction();
export {
    TopicListActions,
};