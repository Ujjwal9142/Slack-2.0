import { actionTypes } from "../action-types";

const initialState = {
  roomId: null,
  roomName: "",
};

export const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHANNEL_ID:
      return { ...state, roomId: action.payload };
    case actionTypes.SET_CHANNEL_NAME:
      return { ...state, roomName: action.payload };
    default:
      return state;
  }
};
