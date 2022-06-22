import { combineReducers } from "redux";

import users from './users';
import global from './global';
import pages from './pages';

export default combineReducers({
    users, global, pages
});