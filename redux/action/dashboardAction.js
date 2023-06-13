import axios from "axios";
import key from "../../config"

import { DASHBOARDAPI } from "../actionTypes";

export const dashboardApi = () => async dispatch => {
    const loginData = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")).token
   
   return new Promise(async (resolve, reject) => {
       const url = `${key.BASE_URL}/getDashboard`;
       try {
           const response = await axios.get(url,
           {
               headers: {
                   Authorization:loginData, 
               },
           }
           );

           dispatch({ type: DASHBOARDAPI , payload: response }),
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