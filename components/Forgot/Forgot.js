import React from "react";
import styles from '../../styles/signup.module.css'
import {forgetuser} from "../../redux/action/forgetAction"
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { bindActionCreators } from 'redux';
import {forgetAction} from "../../redux/main"
import {  toast } from 'react-toastify';


export default function Forgot()
{

    const router = useRouter();
    const [email , SetEmail] = useState([]);

    const dispatch = useDispatch();
    const {forgetuser} = bindActionCreators(forgetAction,dispatch);
  
   const handleSubmit = async (e) => {
      e.preventDefault();
      let response = await forgetuser({
       email: email,
     })
     if(response.success == true){
        
         
       toast.info(response.data.message)

     }
     else{
      toast.info(response.data.message)
     }
     
    
  }


    return(

        <div className={styles.box3}>
        <div className={styles.box2}>

            <br/>
            <h1 style={{fontWeight:500,fontSize:"40px"}}> Forgot your password?</h1>
            <p style={{color:"grey",fontWeight:500,fontSize:"20px",wordSpacing:"2px"}}>Please enter the email address aassociated with your account and <br/>
            We will email you a link to reset your password.</p>
            
        
    <br/>
    <form onSubmit={handleSubmit}>
<input type="text" placeholder="Email address" value={email} className={styles.text}  onChange={(e) =>{ 
          SetEmail(e.target.value)}} required/>

 

<br/>
<br/>
<br/>
<button type="submit" className={styles.reset} >Reset Password</button>
</form>
<br/><br/>
<center>
<Link href="/">
<a  className={styles.Back} > Back</a></Link>
</center>
</div>
</div>
    );
}