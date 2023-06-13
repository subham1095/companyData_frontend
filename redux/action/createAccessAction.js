import axios from "axios";
import key from "../../config"

import { CREATEACCESSMANAGER } from "../actionTypes";

export const createAccessUser = createAccess => async dispatch => {
    const loginData = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")).token
   
   return new Promise(async (resolve, reject) => {
       try {
           const response = await axios.post(`${key.BASE_URL}/grantAccess`,createAccess,
           {
               headers: {
                   Authorization:loginData,
                   "Accept": "application/json",
                   'Content-Type': 'application/json'
               },
           }
           );

           dispatch({ type: CREATEACCESSMANAGER , payload: response }),
        //    console.log(response);
           
           resolve(response);
       } catch (err) {
           if (err.response.status === 401) {
               reject("Your session has been expired...pls login again");
           } else {
               reject(err.response);
           }
       }
   });
};