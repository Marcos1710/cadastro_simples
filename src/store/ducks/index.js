import { combineReducers } from "redux";

// Import reducers
import users from "./users";
import menu from "./menu";

export default combineReducers({
  users,
  menu,
});
