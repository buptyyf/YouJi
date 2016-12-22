import {TopicListActionTypes as Types} from '../actions/topicListAction'

const initialState = {
	boardName: "",
	topTenList: [],
    topicList: [],
    isFetching: false,
	pageInfo: {},
};

export default function topicList(state = initialState, action) {
    switch(action.type) {

		case Types.FetchingData:
			console.log("FetchingData topTenList: ", state.topTenList);
            return Object.assign({}, state, {isFetching: true});
        
		case Types.FetchTopTenDataSuccess:
			console.log(action.topicList);
			return Object.assign({}, state, {
				isFetching: false,
				topTenList: action.topicList
			});
		
		case Types.FetchDataSuccess:
			if(action.topicListInfo.pagination.page_current_count === 1) {
				console.log("第一页！", action.topicListInfo.article)
                return Object.assign({}, state, {
					boardName: action.topicListInfo.name,
                    isFetching: false,
                    topicList: action.topicListInfo.article,
                    pageInfo: action.topicListInfo.pagination
                });
            } else {
				console.log("第2页！", state.topicList)
                let mergeTopicList = state.topicList.concat(action.topicListInfo.article);
                return Object.assign({}, state, {
					boardName: action.topicListInfo.name,
                    isFetching: false,
                    topicList: mergeTopicList,
                    pageInfo: action.topicListInfo.pagination
                });
            }

		case Types.FetchDataError:
			return Object.assign({}, state, {
				isFetching: false,
				//topicList: []
			});

		default: 
			return state;
    }
}