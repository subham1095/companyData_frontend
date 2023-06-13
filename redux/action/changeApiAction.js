import axios from "axios";
import key from "../../config"

import { CHANGEAPI } from "../actionTypes";

export const changeApiKey = (keychange) => async dispatch => {
    const loginData = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")).token
   
   return new Promise(async (resolve, reject) => {
       const url = `${key.BASE_URL}/changeApiKey`;
       try {
           const response = await axios.put(url,keychange,
           {
               headers: {
                   Authorization:loginData, 
               },
           }
           );

           dispatch({ type: CHANGEAPI , payload: response }),
            // console.log(response);
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