const USER_FEED = 'USER_FEED';


const getFeed = (feed) => ({
  type: USER_FEED,
  payload: feed
})


export const feedInfo = () => async (dispatch) => {
  const res = await fetch('/api/feed');
  const data = await res.json();
  console.log('----------->feedthunk', data)
  if (res.ok){
    await dispatch(getFeed(data))
  }
}

const initialState = {
  followers: {},
  following: {},
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
