const ALL_USERS = 'ALL_USERS';

const getUsers = (users) => ({
  type: ALL_USERS,
  payload: users
})

export const userInfo = () => async (dispatch) => {
  const res = await fetch('/api/users/');
  const data = await res.json();
  if (res.ok) {
    await dispatch(getUsers(data))
  }
}

const initialState = {};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_USERS:
      const newState = { ...action.payload }
      return newState
    default: return state;
  }
};
