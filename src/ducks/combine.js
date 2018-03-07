import { combineReducers } from 'redux';
import nimiqReducer from './nimiq';
import messageReducer from './messages';
import {reducer as formReducer} from 'redux-form';
import appUIReducer from './appui'

export default combineReducers({
    form: formReducer,
    nimiq: nimiqReducer,
    messages: messageReducer,
    appui: appUIReducer
});
