import axios from "axios";
import key from "../../config"

import { DEACTIVATEAPI } from "../actionTypes";

export const deactivateApiKey = (keychange) => async dispatch => {
    const loginData = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")).token
   
   return new Promise(async (resolve, reject) => {
       const url = `${key.BASE_URL}/deactivateAccessManager`;
       try {
           const response = await axios.post(url,keychange,
           {
               headers: {
                   Authorization:loginData, 
               },
           }
           );

           dispatch({ type: DEACTIVATEAPI , payload: response }),
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