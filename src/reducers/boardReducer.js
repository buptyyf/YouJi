import {BoardActionTypes as Types} from '../actions/boardAction';

//articleList表示同一帖子下的所有回复
const initialState = {
    followedBoardList: [],
    boardList: [],
    isFetching: false,
};

export default function board(state = initialState, action) {
    switch(action.type) {

		case Types.FetchingData:
            return Object.assign({}, state, {isFetching: true});
        
		case Types.FetchAllDataSuccess:
			//console.log(state.topic);
            return Object.assign({}, state, {
                isFetching: false,
                boardList: action.section.board,
            });

        case Types.FetchFollowedDataSuccess:
			//console.log(state.topic);
            return Object.assign({}, state, {
                isFetching: false,
                followedBoardList: action.section.board,
            });
        
        case Types.FollowBoardSuccess:
            return Object.assign({}, state, {
                //isFetching: false,
                followedBoardList: action.section.board,
            })

        case Types.CancelFollowBoardSuccess:
            return Object.assign({}, state, {
                //isFetching: false,
                followedBoardList: action.section.board,
            })

		case Types.FetchDataError:
			return Object.assign({}, state, {
				isFetching: false,
			});

		default: 
			return state;
    }
}