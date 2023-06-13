import axios from "axios";
import key from "../../config"

import { LISTACCESSMANAGER } from "../actionTypes";

export const accessDataLists = () => async dispatch => {
    const loginData = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")).token
   
   return new Promise(async (resolve, reject) => {
       const url = `${key.BASE_URL}/accessManagers`;
       try {
           const response = await axios.get(url,
           {
               headers: {
                   Authorization:loginData, 
               },
           }
           );

           dispatch({ type: LISTACCESSMANAGER , payload: response.data.data }),
        //    console.log(response);
           resolve(response.data.data);
       } catch (err) {
           if (err.response.status === 401) {
               reject("Your session has been expired...pls login again");
           } else {
               reject(err.response.data.message);
           }
       }
   });
};