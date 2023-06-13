import { UPLOAD_EXCEL } from "../actionTypes";
// typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")) ||
const initialState = {
	excel: null,
	isAuthenticating: false,
};

const uploadReducer = (state = initialState, action) => {
	const {type, payload} = action;
	switch (type) {
		case UPLOAD_EXCEL:
			return{...state, excel: payload};
		case TOGGLE_AUTHENTICATING:
			return {...state, isAuthenticating: !state.isAuthenticating};
		default:
			return state;
	}
	
};

export default uploadReducer;
