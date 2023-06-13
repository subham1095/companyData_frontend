import {SET_USER, TOGGLE_AUTHENTICATING, LOGOUT_USER} from "../actionTypes";
// typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")) ||
const initialState = {
	user:  typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")) || null,
	isAuthenticating: false,
};

const userReducer = (state = initialState, action) => {
	const {type, payload} = action;
	
	switch (type) {
		case SET_USER:
			const userJson = JSON.stringify(payload);
			 localStorage.setItem("user", userJson);
			return {...state, user: payload};
		case TOGGLE_AUTHENTICATING:
			return {...state, isAuthenticating: !state.isAuthenticating};
		case LOGOUT_USER:
			localStorage.removeItem("user");
			return {...state, user: null};
		default:
			return state;
	}
};

export default userReducer;
