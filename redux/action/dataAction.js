import axios from "axios";
import key from "../../config"

import { DATALIST } from "../actionTypes";

export const dataLists = data => async dispatch => {
    const loginData = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user")).token
   
   return new Promise(async (resolve, reject) => {
       const url = `${key.BASE_URL}/viewCompanyData`;
       console.log("a");
       try {
           const response = await axios.get(url,

           {
               params: {
                search: data.search,
                limit: data.limit,
                pageno: data.pageno
               },
               headers: {
                   Authorization:loginData,
                   
               },
           }
           );

           dispatch({ type: DATALIST , payload: response }),
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