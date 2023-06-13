import React from "react";
import { useState } from 'react';
import styles from '../../styles/signup.module.css'
import { useRouter } from 'next/router'
import {resetPasswordAction} from "../../redux/main"
import {resetAction} from "../../redux/action/resetPasswordAction"
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import {  toast } from 'react-toastify';

export default function Resetpassword()
{
    const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
    
    const router = useRouter()
    const dispatch = useDispatch();
   const {resetAction} = bindActionCreators(resetPasswordAction,dispatch);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { Id } = router.query;
    // console.log(Id);
    try {
      let response = await resetAction({
        password: password,
        confirmPassword: confirmPassword,
        Id:Id
       })
     
      //  console.log("a",response)
       if(response && response.data){
        if(response.data.success){
          toast.success(response.data.message);
        router.push("/")
        }
        else{
          toast.warn(response.data.data.confirmPassword);
        }
      }else{
        toast.error("somthing went wrong.")
      }
      
    } catch (error) {
      // window.alert(error.data.message)
      toast.error(error.data.message);
    }
   
  //  if(response.success == true){
  //   window.alert(response.message);
  //    router.push("/")
  //  }
  //  if(response.success == false){
  //   window.alert(response.success);
  //   // router.push("/")
  //  }
  
  
}


    return(
        <div className={styles.box3}>
        <div className={styles.box2}>
            <br/>
            <h1 style={{fontWeight:500,fontSize:"40px"}}> Reset your password</h1> 
    <br/>
    <form onSubmit={handleSubmit}>
<input type="text" placeholder="Password" className={styles.text} onChange={(e) =>{ 
          setPassword(e.target.value)}} value={password} />
<br/>
<br/>
<br/>
<input type="text" placeholder="Confirm Password" className={styles.text} onChange={(e) =>{ 
          setConfirmPassword(e.target.value)}} value={confirmPassword} />

 

<br/>
<br/>
<br/>
<button type="submit" className={styles.reset} >Change Password</button>
</form>

</div>
</div>
    );
}