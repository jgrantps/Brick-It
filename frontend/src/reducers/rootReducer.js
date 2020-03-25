import { combineReducers } from "redux";
import mainReducer from "./mainReducer";
import userReducer from "./userReducer"
import collectionReducer from "./collectionReducer"
import kitsReducer from "./kitsReducer"
import themesReducer from "./themesReducer"
import selectionsReducer from "./selectionsReducer"
import commentReducer from "./commentReducer"
import communityReducer from "./communityReducer"

 
const rootReducer = combineReducers({
//   main: mainReducer,
  user: userReducer,
  selections: selectionsReducer,
  themes: themesReducer,
  kits: kitsReducer,
  collection: collectionReducer,
  comments: commentReducer,
  community: communityReducer
});
 
export default rootReducer;