import axios from "axios";
import key from "../../config"

import { CREATEUSER } from "../actionTypes";

export const createUsers = createuser => async dispatch => {
    const loginData = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")).token
   
   return new Promise(async (resolve, reject) => {
       try {
           const response = await axios.post(`${key.BASE_URL}/register`,createuser,
           {
               headers: {
                   Authorization:loginData,
                   "Accept": "application/json",
                   'Content-Type': 'application/json'
               },
           }
           );

           dispatch({ type: CREATEUSER , payload: response }),
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


