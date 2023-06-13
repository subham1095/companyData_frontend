import { FORGETUSER } from "../actionTypes";
// typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")) ||
const initialState = {
	data: null,
	isAuthenticating: false,
};



const forgetReducer = (state = initialState, action) => {
	const {type, payload} = action;
	switch (type) {
		case FORGETUSER:
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



export default forgetReducer;