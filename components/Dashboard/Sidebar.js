import React from "react";
import styles from "../../styles/dashboard.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCog, faHeart, faRocket, faSignOutAlt, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bindActionCreators } from "redux";
import { userLogout } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userAction } from "../../redux/main";

function LeftNavbar() {
  const router = useRouter();
  const loginData = useSelector((state) => state);
  const token = loginData.userState.user;

  const dispatch = useDispatch();
  const { userLogout } = bindActionCreators(userAction, dispatch);

  const logout = async (e) => {
    e.preventDefault();
    userLogout({
      user: token,
    });
    toast.success("Successfully LoggedOut !");
    return router.push("/");
  };

  return (
    <div className={styles.navcontainer}>
      <div className={styles.logo}>
        <h2>Streamline</h2>
      </div>
      <div className={styles.wrapper}>
        <ul>
          <li>
            <Link href="/Dashboard">
              <a>
                <FontAwesomeIcon icon={faTachometerAlt} style={{ width: "18px", cursor: "pointer" }} /> Dashboard
              </a>
            </Link>
          </li>

          <li>
            <Link href="/Userlist">
              <a>
                <FontAwesomeIcon icon={faRocket} style={{ width: "18px", cursor: "pointer" }} /> Users List
              </a>
            </Link>
          </li>

          <li>
            <Link href="/Accessmanagerlist">
              <a>
                <FontAwesomeIcon icon={faBookOpen} style={{ width: "18px", cursor: "pointer" }} /> Access List
              </a>
            </Link>
          </li>

          <li>
            <Link href="/Datalist">
              <a>
                <FontAwesomeIcon icon={faHeart} style={{ width: "18px", cursor: "pointer" }} /> Data List
              </a>
            </Link>
          </li>

          {/* <li><Link href='/Upload'>
                   <a >
               <FontAwesomeIcon
							icon={faCog}
							style={{ width: "18px", cursor: "pointer" }}
						/>{" "}
						 Settings</a></Link>
               </li> */}

          <li>
            <a onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ width: "18px", cursor: "pointer" }} /> Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftNavbar;
