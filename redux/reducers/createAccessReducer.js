import { CREATEACCESSMANAGER } from "../actionTypes";
// typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")) ||
const initialState = {
	data: null,
	isAuthenticating: false,
};

const createAccessReducer = (state = initialState, action) => {
    // console.log("reducer")
	const {type, payload} = action;
	switch (type) {
		case CREATEACCESSMANAGER:
			return{...state, data: payload};
		case TOGGLE_AUTHENTICATING:
			return {...state, isAuthenticating: !state.isAuthenticating};
		default:
			return state;
	}
	
};

export default createAccessReducer;
