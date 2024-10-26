import {createSlice} from "@reduxjs/toolkit";

const initialState={
    posts:[],
};

const postSlice=createSlice({
    name:"post",
    initialState,
    reducers:{
        setPosts:(state, action)=>{
            state.posts=action.payload;
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.$id !== action.payload);
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map((post) => post.$id === action.payload.$id ? action.payload : post);
        },
        createPost: (state, action) => {
            state.posts.push(action.payload);
        },
        clearPosts: (state) => {
            state.posts = [];
        },
    },
});

export const {setPosts, deletePost, updatePost, createPost, clearPosts}=postSlice.actions;
export default postSlice.reducer;