import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: false,
  },
  reducers: {
    setgetUsers: (state, { payload }) => {
      state.user = payload;
    },
    setgetUnique: (state, { payload }) => {
      state.user = payload;
    },
    logOut: (state, { payload }) => {
      state.user = true;
    },

    update: (state, { payload }) => {
      return {
        ...state,
        bio: payload,
      };
    },

    deleteUser: (state, { payload }) => {
      state.user = state.user.filter((user) => {
        return user.id !== payload;
      });
    },

    followUser: (state, { payload }) => {
      state.user.push(payload);
    },
    unfollowUser: (state, { payload }) => {
      state.user = state.user.filter((id) => id != payload
      );
    },
  },
});

export const {
  setgetUsers,
  setgetUnique,
  setLogOut,
  followUser,
  addUpload,
logOut,
    deleteUser,
 

} = userSlice.actions;
export default userSlice.reducer;
