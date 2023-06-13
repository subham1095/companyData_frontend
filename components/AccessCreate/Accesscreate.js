import styles from "../../styles/upload.module.css";
import { useState } from "react";
import { createAccessAction } from "../../redux/main";
import { createAccessUser } from "../../redux/action/createAccessAction";
import { bindActionCreators } from "redux";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Accesscreate(props) {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [modalIsOpen, SetModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { createAccessUser } = bindActionCreators(createAccessAction, dispatch);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await createAccessUser({
        email: email,
        name: name,
      });
      if (response && response.data) {
        if (response.data.success) {
          if (props.accessCreated) {
            props.accessCreated();
          }
          toast.success(response.data.message);
          SetModalIsOpen(false);
        } else {
          toast.warn(response.data.message);
          SetModalIsOpen(false);
        }
      } else {
        toast.warn(response.data.message);
        SetModalIsOpen(false);
      }
      //  window.alert(response);
      // toast.success(response.data.message);
    } catch (error) {
      toast.success(error.response);
    }
  };

  return (
    <div className={styles.app_container}>
      <div>
        <button className={styles.button} onClick={() => SetModalIsOpen(true)}>
          Create AM
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => SetModalIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            position: "fixed",
            width: "50%",
            top: 0,
            left: "25%",
            right: "0%",
            bottom: 0,
            backgroundcolor: "grey",
            // background: blur
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        className={styles.cls}
      >
        <form onSubmit={handleSubmit}>
          <br />
          <h1> Create Access Manager </h1>
          <div className={styles.box3}>
            <br />
            <br />
            <input
              name="email"
              value={email}
              type="email"
              placeholder="Email address"
              className={styles.text1}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <br />
            <br />
            <br />
            <br />

            <input
              name="name"
              type="text"
              value={name}
              placeholder="Your Name"
              className={styles.text1}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <br />
            <br />
            <br />
            <br />
            <button type="submit" className={styles.login1}>
              Grant Access
            </button>
          </div>

          <button className={styles.cross} onClick={() => SetModalIsOpen(false)}>
            X
          </button>
        </form>
      </Modal>
    </div>
    // <label htmlFor="Name"><b>Email</b></label>
    // <input name="email" value={email} type="email" onChange={(e) =>{
    //   setEmail(e.target.value)}} required/>

    // <label htmlFor="name"><b>Name</b></label>
    // <input name="name" type="text" value={name}  onChange={(e) =>{
    //   setName(e.target.value)}} required/>

    // <button type="submit"   >Grant Access</button>

    // <button onClick={()=> SetModalIsOpen(false) }>X</button>
    // </form>
    // </Modal>
    // </div>
  );
}
