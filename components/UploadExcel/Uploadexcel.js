import styles from "../../styles/upload.module.css"
import { useState } from 'react';
import {uploadAction} from "../../redux/main"
import {uploadExcel} from "../../redux/action/uploadAction"
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";


export default function Uploadexcel(props)  {
  const [file, setFile] = useState([]);
  const [modalIsOpen, SetModalIsOpen] = useState(false);

  const dispatch = useDispatch();
   const {uploadExcel} = bindActionCreators(uploadAction,dispatch);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file[0]);
      const fetchUrl = uploadExcel(formData);
     
      toast.promise(fetchUrl, {
        pending: ' Uploading File Please Wait...',
        success: 'File Uploaded successfully 👌',
        error: 'Something went wrong 🤯',
      })
    
      console.log(fetchUrl);
      
      let response = await uploadExcel(formData)

     

        //  toast.promise(,{
        //     pending: "File is uploading",
        //     success: response.data.message,
        //     error: "File not uploaded"
    
        //   })
    
      if(response && response.data){
        
        if(response.data.success){
       
          //  toast.info(response.data.message);
          SetModalIsOpen(false)
          if(props.dataList){
            props.dataList()
          }
          toast.info(response.data.message);
        }
        else{
          toast.warn(response.data.message);
          SetModalIsOpen(false)
          toast.warn(response.data.message);
        }
      }else{
        toast.warn(response.data.message);
        SetModalIsOpen(false)
        toast.error(response.data.message);
      }
      // console.log(response);
      //  window.alert(response);
      
    } catch (error) {
      toast.error(error)
      
    }
    
   

}
 
    return (
      <div className={styles.app_container}>
        <div ><button className={styles.button} onClick={()=> SetModalIsOpen(true) }>Upload Excel</button></div>
        <Modal isOpen={modalIsOpen} onRequestClose={() => SetModalIsOpen(false)} shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            position: 'fixed',
            width: '50%',
            top: 0,
            left: "25%",
            right: "0%",
            bottom: 0,
             backgroundcolor: 'grey',
            // background: blur
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
        
        >
         
 <h1> Upload Excel File </h1>
<div className={styles.box2}>
        <form onSubmit={handleSubmit}>
          <br />
          <input type="text" placeholder="Title" className={styles.text}  />
          <br /><br /><br />
        
       <div style={{border:'2px dotted #d3d3d3',height:'150px',width:'550px',display:'flex',alignItems:'center'}}>
  
        <input name="file" id="file" type="file" style={{height:'150px',width:'550px',opacity:0}} className={styles.input}  onChange={(e) =>{ 
          setFile(e.target.files)}} accept=" .xls, .xlsx"/>
          <label htmlFor='file' style={{position:"relative",left:'-140px',width:'600px',fontWeight:500,color:'#cccccc'}}>Drop files here or click here to Upload</label>
          </div>
        
         <br /><br /><br />
       <button type="submit"  className={styles.login}>Upload</button>
        
        <button className={styles.cross} onClick={()=> SetModalIsOpen(false) }>X</button>
        
        </form>
        </div>
        </Modal>
       
        </div>
    )
  
}
