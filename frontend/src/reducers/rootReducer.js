import { combineReducers } from "redux";
import mainReducer from "./mainReducer";
import userReducer from "./userReducer"
import themesReducer from "./themesReducer"
import selectionsReducer from "./selectionsReducer"

 
const rootReducer = combineReducers({
//   main: mainReducer,
  user: userReducer,
  selections: selectionsReducer,
  themes: themesReducer,
//   collection: collectionReducer,
//   kits: kitsReducer
});
 
export default rootReducer;