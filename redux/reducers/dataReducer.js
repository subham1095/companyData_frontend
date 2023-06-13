import { DATALIST } from "../actionTypes";
// typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")) ||
const initialState = {
	data: null,
	isAuthenticating: false,
};

const dataReducer = (state = initialState, action) => {
	const {type, payload} = action;
	switch (type) {
		case DATALIST:
			return{...state, data: payload};
		case TOGGLE_AUTHENTICATING:
			return {...state, isAuthenticating: !state.isAuthenticating};
		default:
			return state;
	}
	
};

export default dataReducer;
