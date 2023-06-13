import axios from "axios";
import key from "../../config"

import { UPLOAD_EXCEL } from "../actionTypes";

export const uploadExcel = upload => async dispatch => {
    const loginData = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")).token
   
   return new Promise(async (resolve, reject) => {
       try {
           const response = await axios.post(`${key.BASE_URL}/upload`,upload,
           {
               headers: {
                   Authorization:loginData,
                   "Accept": "application/json",
                   'Content-Type': 'application/json'
                   
               },
           }
           );

           dispatch({ type: UPLOAD_EXCEL , payload: response }),
            // console.log(response.data.message);
           
           resolve(response);
       } catch (err) {
           if (err.response && err.response.status === 401) {
               reject("Your session has been expired...pls login again");
           } else {
               reject(err.response);
           }
       }
   });
};