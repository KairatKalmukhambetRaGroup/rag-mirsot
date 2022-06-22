import { combineReducers } from "redux";

import users from './users';
import global from './global';
import admin from './admin';
import pages from './pages';

export default combineReducers({
    users, global, pages, admin
});