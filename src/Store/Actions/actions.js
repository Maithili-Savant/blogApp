import axios from "axios";

import{
    STORE_BLOG_POSTS,
} from "../Reducers/types";

export const getPostDetails = (callback) => async (dispatch) => {
  try{
    let data = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    dispatch({type: STORE_BLOG_POSTS, payload: data.data});
    callback();
}
catch(e){
    console.log("Error",e);
}
};


export const setPostDetails = (data, callback) => async (dispatch) => {
    dispatch({type: STORE_BLOG_POSTS, payload: data});
    callback();
}

export const addIsLike = (data, callback) => async (dispatch) => {
    dispatch({ type: STORE_BLOG_POSTS, payload: data });
    callback();
}

export const addDate = (data, callback) => async (dispatch) => {
  dispatch({ type: STORE_BLOG_POSTS, payload: data });
  callback();
}


export const deletePostDetails =
  (data, index, callback) => async (dispatch) => {
    let current = data;
    current.splice(index, 1);
    dispatch({ type: STORE_BLOG_POSTS, payload: current });
    callback();
  };