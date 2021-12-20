import {combineReducers} from "redux";
import postDetails from "./postDetails";

const allReducers = combineReducers({
    postDetails : postDetails,
  });
  
  const rootReducer = (state, action) => {
    return allReducers(state, action);
  };
  
export default rootReducer;