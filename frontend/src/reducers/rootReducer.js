import { combineReducers } from "redux";
import mainReducer from "./mainReducer";
import userReducer from "./userReducer"
import kitsReducer from "./kitsReducer"
import themesReducer from "./themesReducer"
import selectionsReducer from "./selectionsReducer"

 
const rootReducer = combineReducers({
//   main: mainReducer,
  user: userReducer,
  selections: selectionsReducer,
  themes: themesReducer,
  kits: kitsReducer
//   collection: collectionReducer,
});
 
export default rootReducer;