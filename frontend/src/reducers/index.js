import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import procedures from './procedures';

const rootReducer = combineReducers({procedures, routing: routerReducer});

export default rootReducer;
