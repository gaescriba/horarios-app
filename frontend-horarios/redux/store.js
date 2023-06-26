import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from './modules/rootReducer.js'

export default configureStore({
  reducer: rootReducer 
}, applyMiddleware(thunk))
