import {TopicListActionTypes as Types} from '../actions/topicListAction'

const initialState = {
	boardName: "",
	topTenList: [],
    topicList: [],
	topicListObj: {},

    isFetching: false,
	isFetchingTopTen: false,
	isFetchingSectionHotTopic: false,

	pageInfo: {},
};

export default function topicList(state = initialState, action) {
    switch(action.type) {

		case Types.FetchingData:
			//console.log("FetchingData topTenList: ", state.topTenList);
            return Object.assign({}, state, {isFetching: true});

		case Types.FetchingTopTenData:
			return Object.assign({}, state, {isFetchingTopTen: true});

		case Types.FetchingSectionHotTopicData:
			return Object.assign({}, state, {isFetchingSectionHotTopic: true});
        
		case Types.FetchTopTenDataSuccess:
			console.log(action.topicList);
			return Object.assign({}, state, {
				isFetchingTopTen: false,
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

		case Types.FetchSectionHotTopicDataSuccess:
			let topicListObj = Object.assign({}, state.topicListObj)
			if(action.topicListInfo.name === "section-0") {
				topicListObj = {}
			}
			if(action.topicListInfo.article.length !== 0) {
				topicListObj[action.topicListInfo.title] = action.topicListInfo.article
			} else {
				topicListObj = state.topicListObj
			}
			console.log("reducer: ",topicListObj)
			return Object.assign({}, state, {
				isFetchingSectionHotTopic: false,
				topicListObj: topicListObj
			});

		case Types.FetchDataError:
			return Object.assign({}, state, {
				isFetching: false,
				//topicList: []
			});

		default: 
			return state;
    }
}