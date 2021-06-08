const USER_FEED = 'USER_FEED';
const GET_ONE_POST = 'GET_ONE_POST';

const getFeed = (feed) => ({
  type: USER_FEED,
  payload: feed
})

const getPost = (postId) => ({
  type: GET_ONE_POST,
  payload: postId
})

export const getOnePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/feed/post/${postId}`);
  const data = await res.json();
  if (res.ok) await dispatch(getPost(data.currentPost))
}

export const feedInfo = () => async (dispatch) => {
  const res = await fetch('/api/feed');
  const data = await res.json();
  console.log('----------->feedthunk', data)
  if (res.ok) {
    await dispatch(getFeed(data))
  }
}

export const createComment = (userId, postId, comment) => async (dispatch) => {
  const res = await fetch(`api/feed/comment/${postId}`, {
    method: "POST",
    userId,
    postId,
    comment
  })
  const data = await res.json();
  return "commented"
}

export const likePost = (userId, postId) => async (dispatch) => {
  const res = await fetch(`/api/feed/like/${postId}`, {
    method: "POST",
    userId,
    postId
  })
  const data = await res.json();
  return "liked"
}

export const unLikePost = (likeId) => async dispatch => {
  const res = await fetch(`/api/feed/delete/like/${likeId}`, {
    method: "DELETE",
    likeId
  })
  const data = await res.json()
  return "unliked"
}


const initialState = {
  followers: {},
  following: {},
  followingPosts: [],
  userDict: {
    id: '',
    email: '',
    posts: [],
    username: ''
  },
  selectedPost: null
};

export default function feedReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case USER_FEED:
      newState = { ...state, ...action.payload }
      return newState
    case GET_ONE_POST:
      newState = { ...state, selectedPost: action.payload }
      return newState
    default:
      return state;
  }
};
