import React from "react";
import styles from "../../styles/dashboard.module.css";
import Image from "next/image";
import Image1 from "../../public/graph1.png";
import Image2 from "../../public/graph2.png";
import Image3 from "../../public/graph3.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { dashboardAction } from "../../redux/main";
import { dashboardApi } from "../../redux/action/dashboardAction";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Content() {
  const [dataList, setDataList] = useState({
    accessUser: 0,
    companyDataCount: 0,
    users: 0,
  });
  const dispatch = useDispatch();
  const { dashboardApi } = bindActionCreators(dashboardAction, dispatch);

  const apiCall = async () => {
    let response = await dashboardApi();
    // console.log(response)
    if (response.data) {
      setDataList(response.data.data);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className={styles.contentcontainer}>
      <div className={styles.contentwrapper}>
        <Link href="/Userlist">
          <div className={styles.tabs}>
            <div className={styles.categories1}>
              <div>Total Users</div>
              <div className={styles.categories2}>
                <h2>{dataList.users}</h2>
              </div>
            </div>
            <div className={styles.image1}>
              <Image src={Image1} alt="" />
            </div>
          </div>
        </Link>
        <Link href="/Datalist">
          <div className={styles.tabs}>
            <div className={styles.categories1}>
              <div>Excel Data</div>
              <div className={styles.categories2}>
                <h2>{dataList.companyDataCount}</h2>
              </div>
            </div>
            <div className={styles.image1}>
              <Image src={Image2} alt="" />
            </div>
          </div>
        </Link>
        <Link href="/Accessmanagerlist">
          <div className={styles.tabs}>
            <div className={styles.categories1}>
              <div>Access Manager Users</div>
              <div className={styles.categories2}>
                <h2>{dataList.accessUser}</h2>
              </div>
            </div>
            <div className={styles.image3}>
              <Image src={Image3} alt="" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Content;
