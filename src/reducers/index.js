import {combineReducers} from 'redux';
import userReducer from './userReducer';
import topicReducer from './topicReducer';
import topicListReducer from './topicListReducer';
import boardReducer from './boardReducer';
import remindReducer from './remindReducer';

export default combineReducers({
    userStore: userReducer,
    topicStore: topicReducer,
    topicListStore: topicListReducer,
    boardStore: boardReducer,
    remindStore: remindReducer,
});