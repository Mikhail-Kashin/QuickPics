const SELECTED_USER = 'SELECTED_USER';
const FOLLOW_DATA = 'FOLLOW_DATA';

const getInfo = (info) => ({
    type: SELECTED_USER,
    payload: info
})

const followData = (data) => ({
    type: FOLLOW_DATA,
    payload: data
})

export const followersData = (name) => async(dispatch) => {
    const res = await fetch(`/api/profiles/${name}`)
    const followInfo = await res.json();
    if (res.ok) {
        await dispatch(followData(followInfo));
    } else {
        throw res
    }
}

export const profileInfo = (name) => async (dispatch) => {
    const res = await fetch(`/api/profiles/${name}`);
    const user = await res.json();
    if (res.ok) {
        await dispatch(getInfo(user));
    } else {
        throw res
    }

}

export const deletePost = (id) => async (dispatch) => {
    const res = await fetch(`api/profiles/delete/${id}`, {
        method: "DELETE",
        id
    })
    const data = await res.json()
    return "deleted"
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

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case SELECTED_USER:
            const newState = { ...action.payload }
            return newState
        case FOLLOW_DATA:
            const newInfo = { ...action.payload }
            return newInfo
        default:
            return state;
    }
};
