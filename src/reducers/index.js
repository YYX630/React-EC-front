import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";

//このファイルは、統合専門

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

export default rootReducer;
