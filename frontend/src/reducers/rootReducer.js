import { combineReducers } from "redux";
import mainReducer from "./mainReducer";
import userReducer from "./userReducer"

 
const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
//   selections: selectionsReducer,
//   collection: collectionReducer,
//   themes: themesReducer,
//   kits: kitsReducer
});
 
export default rootReducer;