import styles from "../../styles/signup.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userLogin } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { bindActionCreators } from "redux";
import { userAction } from "../../redux/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [type, setType] = useState("password");

  const dispatch = useDispatch();
  const { userLogin } = bindActionCreators(userAction, dispatch);

  const showPassword = () => {
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let responce = await userLogin({
      email: email,
      password: password,
    });
    //  console.log(responce)
    if (responce) {
      if (responce.success) {
        toast.success(responce.message);
        return router.push("/Dashboard");
      } else {
        toast.error(responce.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.box1}>
                   {" "}
        <div className={styles.box2}>
                          <h1> Sign in </h1>               {" "}
          <p style={{ color: "grey", fontWeight: 500, fontSize: "20px", wordSpacing: "2px" }}>
            Enter your details below.
          </p>
                                              <br />   {" "}
          <input
            type="text"
            placeholder="Email address"
            className={styles.text}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
              <br />   {" "}
          <div className={styles.eyeContainer}>
                   {" "}
            <input
              id="password"
              type={type}
              placeholder="Password"
              className={styles.text}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
                 {" "}
            <button type="button" className={styles.eyeButton} onClick={showPassword}>
              {/* {" "} */}
              <FontAwesomeIcon
                icon={type === "password" ? faEye : faEyeLowVision}
                style={{ width: "18px", cursor: "pointer" }}
              />
            </button>
            {/*      {" "} */}
          </div>
          {/*     <br />
              <br />    */}
          <label style={{ fontSize: "18px", fontWeight: 500, color: "#6a6a6a" }}>
            {" "}
            <input type="checkbox" size="3" value="lsRememberMe" className={styles.rememberMe} /> Remember Me
          </label>
             
          <span className={styles.Forgetspan}>
            <Link href="/Forgot">
              <a className={styles.Forget}> Forgot Password?</a>
            </Link>
          </span>
             <br />
             <br />
             <br />   
          <button type="submit" onClick={toast} className={styles.login}>
            Login
          </button>
          <ToastContainer />   
        </div>
           
      </div>
    </form>
  );
}
