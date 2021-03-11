import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

//このファイルは、統合専門

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
