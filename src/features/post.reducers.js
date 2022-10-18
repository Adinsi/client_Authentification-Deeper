import { createSlice } from "@reduxjs/toolkit";


export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    getAllPost: (state, { payload }) => {
      state.posts = payload;
    },

    getUserPost: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.push(payload);
    },

    deletePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post._id !== payload);
    },
    // deleteUser: (state, { payload }) => {
    //   state.user = state.user.filter((user) => {
    //     return user.id !== payload;
    //   });
    // },
    likePost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post._id === payload) {
          return state.posts.likers.push(payload);
        }
        return post;
      });
    },
    dislikePost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.posterId === payload) {
          return state.posts.likers.filter((id) => id !== payload);
        }
        return post;
      });
    },

    editPost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post._id === payload) {
          return state.posts.message.push(payload);
        } else return post;
      });
    },
    // Posts commentaires

    addComment: (state, { payload }) => {
  state.posts = state.posts.map((post) => {
    if (post._id === payload) {
      return state.posts.comments.push(payload);
    } else return post;
  });
    },
  },
});

export const {getAllPost,getUserPost,addPost,deletePost,likePost,dislikePost,editPost,addComment } = postSlice.actions;
export default postSlice.reducer