import { UPDATE, UPDATE_FAIL } from "../types";

const initialState = null;

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE:
      return {
        ...state,
        payload,
      };
    case UPDATE_FAIL:
      return {
        state: null,
      };

    default:
      return state;
  }
}
