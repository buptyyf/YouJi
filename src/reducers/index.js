import {combineReducers} from 'redux';
import userReducer from './userReducer';
import topicReducer from './topicReducer';
import topicListReducer from './topicListReducer';
import boardReducer from './boardReducer';

export default combineReducers({
    userStore: userReducer,
    topicStore: topicReducer,
    topicListStore: topicListReducer,
    boardStore: boardReducer,
});