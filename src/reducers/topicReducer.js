import {TopicActionTypes as Types} from '../actions/topicAction';

//articleList表示同一帖子下的所有回复
const initialState = {
    topic: {},
    isFetching: false,
    pageInfo: {},
};

export default function topic(state = initialState, action) {
    switch(action.type) {

		case Types.FetchingData:
            return Object.assign({}, state, {isFetching: true});
        
		case Types.FetchDataSuccess:
			console.log(state.topic);
            //console.log("hhhhhh1!!!!!", Types.FetchDataSuccess === Types2.FetchDataSuccess);
            if(action.topic.pagination.page_current_count === 1 || !state.topic.article) {
                return Object.assign({}, state, {
                    isFetching: false,
                    topic: action.topic,
                    pageInfo: action.topic.pagination
                });
            } else {
                let mergeTopicArticle = state.topic.article.concat(action.topic.article);
                action.topic.article = mergeTopicArticle;
                return Object.assign({}, state, {
                    isFetching: false,
                    topic: action.topic,
                    pageInfo: action.topic.pagination
                });
            }

		case Types.FetchDataError:
			return Object.assign({}, state, {
				isFetching: false,
				topic: {}
			});

		default: 
			return state;
    }
}