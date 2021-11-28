import { actionTypes } from "../action-types";

const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: { ...state.user, ...action.payload } };
    case actionTypes.REMOVE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
