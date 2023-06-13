import axios from "axios";
import key from "../../config"

import { USERDATALIST, } from "../actionTypes";

export const userDataLists = () => async dispatch => {
    const loginData = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")).token
   
   return new Promise(async (resolve, reject) => {
       const url = `${key.BASE_URL}/users`;
       try {
           const response = await axios.get(url,
           {
               headers: {
                   Authorization:loginData,
               },
           }
           );

           dispatch({ type: USERDATALIST , payload: response.data.data }),
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

