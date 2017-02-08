import {TopicActionTypes as Types} from '../actions/topicAction';

//articleList表示同一帖子下的所有回复
const initialState = {
    topic: {},
    isFetching: false,
    firstLoad: false,
    pageInfo: {},
};

export default function topic(state = initialState, action) {
    switch(action.type) {

		case Types.FetchingData:
            return Object.assign({}, state, {isFetching: true});

        case Types.FirstLoadData:
            return Object.assign({}, state, {firstLoad: true});
        
		case Types.FetchDataSuccess:
			console.log(state.topic, action.topic);
            //console.log("hhhhhh1!!!!!", Types.FetchDataSuccess === Types2.FetchDataSuccess);
            if(action.topic.pagination.page_current_count === 1 || !state.topic[action.topic.id].article) {
                // console.log(Object.assign({}, state, {
                //     isFetching: false,
                //     topic: Object.assign({}, state.topic, {
                //         [action.topic.id]: action.topic
                //     }),
                //     pageInfo: action.topic.pagination
                // }));
                //用persistStorage，topicId为key，topic为value的键值对，把浏览过的帖子都存储起来
                return Object.assign({}, state, {
                    isFetching: false,
                    firstLoad: false,
                    topic: Object.assign({}, state.topic, {
                        [action.topic.id]: action.topic
                    }),
                    pageInfo: action.topic.pagination
                });
            } else {
                console.log("not firstpage topic, ", action.topic)
                let mergeTopicArticle = state.topic[action.topic.id].article.concat(action.topic.article);
                action.topic.article = mergeTopicArticle;
                return Object.assign({}, state, {
                    isFetching: false,
                    topic: Object.assign({}, state.topic, {
                        [action.topic.id]: action.topic
                    }),
                    pageInfo: action.topic.pagination
                });
            }

		case Types.FetchDataError:
			return Object.assign({}, state, {
				isFetching: false,
				//topic: {}
			});

		default: 
			return state;
    }
}