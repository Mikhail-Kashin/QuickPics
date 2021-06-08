const SHOW_POST = 'SHOW_POST';
const HIDE_POST = 'HIDE_POST';

export const showPost = (postId) => ({
  type: SHOW_POST,
  payload: postId
})

export const hidePost = (postId) => ({
  type: HIDE_POST,
  payload: postId
})

const initialState = {
  postForm: null
}

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_POST:
      return { ...state, postForm: action.payload }
    case HIDE_POST:
      return { ...state, postForm: null }
    default:
      return state;
  }
}