const USER_FEED = 'USER_FEED';

const getFeed = (feed) => ({
  type: USER_FEED,
  payload: feed
})

export const feedInfo = () => async (dispatch) => {
  const res = await fetch('/api/feed');
  const data = await res.json();
  console.log('----------->feedthunk', data)
  if (res.ok) {
    await dispatch(getFeed(data))
  }
}

<<<<<<< HEAD
export const likePost = (userId, postId) => async (dispatch) => {
  const res = await fetch(`/api/feed/like/${postId}`, {
    method: "POST",
    userId,
    postId
  })
  const data = await res.json()
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



=======
>>>>>>> 8e2a3623938b7c559a46ebf41fb0c7909206fb7b
const initialState = {
  followers: {},
  following: {},
  followingPosts: [],
  userDict: {
    id: '',
    email: '',
    posts: [],
    username: ''
  }
};

export default function feedReducer(state = initialState, action) {
  switch (action.type) {
    case USER_FEED:
      const newState = { ...action.payload }
      return newState
    default:
      return state;
  }
};
