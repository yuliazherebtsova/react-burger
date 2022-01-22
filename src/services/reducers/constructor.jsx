/* eslint-disable default-param-last */
import {
  ADD_BUN_ELEMENT,
  ADD_NON_BUN_ELEMENT,
  DELETE_ELEMENT,
  RESET_CONSTRUCTOR,
} from 'services/actions/constructor';

const constructorInitialState = {
  bunElement: {},
  draggableElements: [],
};

export default(state = constructorInitialState, action) => {
  switch (action.type) {
    case ADD_BUN_ELEMENT: {
      return { ...state, bunElement: action.payload };
    }
    case ADD_NON_BUN_ELEMENT: {
      return {
        ...state,
        draggableElements: state.draggableElements.concat(action.payload),
      };
    }
    case RESET_CONSTRUCTOR: {
      return constructorInitialState;
    }
    default: {
      return state;
    }
  }
};
