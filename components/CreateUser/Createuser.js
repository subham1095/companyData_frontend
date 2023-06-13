import styles from "../../styles/upload.module.css";
import { useState } from "react";
import { userCreate } from "../../redux/main";
import { createUsers } from "../../redux/action/createUserAction";
import { bindActionCreators } from "redux";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Createuser(props) {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [modalIsOpen, SetModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { createUsers } = bindActionCreators(userCreate, dispatch);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await createUsers({
        email: email,
        name: name,
      });
      if (response && response.data) {
        if (response.data.success) {
          if (props.userList) {
            props.userList();
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
      // console.log(response);
      // window.alert(response.data.message);
      // toast.success(response.data.message);
      // SetModalIsOpen(false)
    } catch (error) {
      toast.error(error.response);
    }
  };

  return (
    <div className={styles.app_container}>
      <button className={styles.button} onClick={() => SetModalIsOpen(true)}>
        Create User
      </button>
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
      >
        <form onSubmit={handleSubmit}>
          <div className={styles.box2}>
            <h1> User Creation </h1>
            <br />
            <br />
            <input
              name="email"
              value={email}
              type="email"
              placeholder="Email address"
              className={styles.text}
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
              className={styles.text}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <br />
            <br />
            <br />
            <br />
            <button type="submit" className={styles.login}>
              Create User
            </button>
          </div>

          <button className={styles.cross} onClick={() => SetModalIsOpen(false)}>
            {" "}
            X{" "}
          </button>
        </form>
      </Modal>
    </div>
  );
}
