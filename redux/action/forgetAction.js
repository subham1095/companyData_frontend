import axios from "axios";
import key from "../../config"

import { TOGGLE_AUTHENTICATING, FORGETUSER} from "../actionTypes";


export const forgetuser = forgetUser => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: TOGGLE_AUTHENTICATING });
			const response = await axios.post(
				`${key.BASE_URL}/forgetUser`,
				forgetUser,
			);
			dispatch({ type: FORGETUSER, payload: response.data.data.token });
			resolve(response);
		} catch (err) {
			reject(err.response);
		} finally {
			dispatch({ type: TOGGLE_AUTHENTICATING });
		}
	});
};