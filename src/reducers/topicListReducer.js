import {TopicListActionTypes as Types} from '../actions/topicListAction'

const initialState = {
    topicList: [],
    status: null,
};

export default function topicList(state = initialState, action) {
    switch(action.type) {

		case Types.FetchingData:
            return Object.assign({}, state, {status: 'doing'});
        
		case Types.FetchDataSuccess:
			console.log("asdfsadfasdf");
			return Object.assign({}, state, {
				status: 'done',
				topicList: action.topicList
			});

		case Types.FetchDataError:
			return Object.assign({}, state, {
				status: null,
				topic: {}
			});

		default: 
			return state;
    }
}