import axios from "axios";
import key from "../../config"
import { useRouter } from 'next/router'

import { RESETPASSWORD } from "../actionTypes";


export const resetAction = resetuser => async dispatch => {
   
   
   return new Promise(async (resolve, reject) => {
       try {
       
           const response = await axios.post(`${key.BASE_URL}/resetPassword`,resetuser,
           
           {
            
               headers: {
                   Authorization:resetuser.Id,
                   "Accept": "application/json",
                   'Content-Type': 'application/json'
               },
           }
           );
            // console.log(response)

           dispatch({ type: RESETPASSWORD , payload: response }),
        //    console.log(response);
           
           resolve(response);
       } catch (err) {
           if (err.response.success === 401) {
               reject("Your session has been expired...pls login again");
           } else {
               reject(err.response);
           }
       }
   });
};


