import { actionTypes } from "./action-types";

export const setChannelId = (roomId) => {
  return {
    type: actionTypes.SET_CHANNEL_ID,
    payload: roomId,
  };
};

export const setChannelName = (roomName) => {
  return {
    type: actionTypes.SET_CHANNEL_NAME,
    payload: roomName,
  };
};

export const login = ({ email, uid, displayName, photoURL }) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      email: email,
      uid: uid,
      displayName: displayName,
      photoURL: photoURL,
    },
  };
};

export const logout = () => {
  return {
    type: actionTypes.REMOVE_USER,
    payload: null,
  };
};
