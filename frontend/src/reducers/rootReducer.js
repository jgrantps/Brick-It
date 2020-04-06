import { combineReducers } from "redux";
import userReducer from "./userReducer"
import collectionReducer from "./collectionReducer"
import kitsReducer from "./kitsReducer"
import focusReducer from "./focusReducer"
import themesReducer from "./themesReducer"
import selectionsReducer from "./selectionsReducer"
import commentReducer from "./commentReducer"
import communityReducer from "./communityReducer"

 
const rootReducer = combineReducers({
  user: userReducer,
  selections: selectionsReducer,
  themes: themesReducer,
  kits: kitsReducer,
  collection: collectionReducer,
  comments: commentReducer,
  community: communityReducer,
  focus: focusReducer,
});
 
export default rootReducer;