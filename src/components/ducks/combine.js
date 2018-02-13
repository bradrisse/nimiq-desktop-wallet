import { combineReducers } from 'redux'
import nimiqReducer from './nimiq'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
    form: formReducer,
    nimiq: nimiqReducer
});
