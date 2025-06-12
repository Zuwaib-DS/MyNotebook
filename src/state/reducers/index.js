import amountReducer from "./amountReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  amount: amountReducer,
});

export default reducers;
