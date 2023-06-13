import axios from "axios";
import key from "../../config"

import { SET_USER, TOGGLE_AUTHENTICATING, LOGOUT_USER } from "../actionTypes";


export const userLogin = currentUser => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: TOGGLE_AUTHENTICATING });
			const response = await axios.post(
				`${key.BASE_URL}/auth`,
				currentUser,
			);
			dispatch({ type: SET_USER, payload: response.data.data });
			resolve(response.data);
		} catch (err) {
			console.log(err);
			reject(err.response);
		} finally {
			dispatch({ type: TOGGLE_AUTHENTICATING });
		}
	});
};

export const userLogout = () => async dispatch => {
	 const loginData = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user"))
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.delete(`${key.BASE_URL}/logout`,{
				headers: {
					Authorization:loginData
				}
			}	
			);
			dispatch({ type: LOGOUT_USER });
			resolve(response.data.message);
		} catch (err) {
			if (err.response === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response);
			}
		}
	});
};