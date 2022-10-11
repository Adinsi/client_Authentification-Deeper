import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user.reducers";
import usersReducers from "../features/users.reducers";

export default configureStore({
  reducer: {
    user: userReducer, 
    users: usersReducers
     
  },
});
