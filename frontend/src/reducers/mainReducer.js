import { NameAdapter } from "../classes/names";
import { Bird } from "../classes/bird";

export default function mainReducer(
    state = {
      items: [],
      classes: {
          bird: new Bird,
          name: new NameAdapter,
      }
    },
    action
  ) {
    switch (action.type) {
        case 'INCREASE_COUNT':
      return {
        ...state,
        items: state.items.concat(state.items.length + 1)
      }
 
    default:
      return state;
  }
}