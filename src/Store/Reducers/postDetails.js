import {STORE_BLOG_POSTS} from "./types";

const initialState = {
    postDetails: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
      case STORE_BLOG_POSTS:
        return {
          postDetails: action.payload,
        };
      default:
        return state;
    }
  }