import { combineReducers } from "redux";

import { channelReducer } from "./channelReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  channel: channelReducer,
  user: userReducer,
});
