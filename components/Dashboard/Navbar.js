import React from "react";
import { useRouter } from 'next/router';
import styles from "../../styles/dashboard.module.css";
import 'react-toastify/dist/ReactToastify.css';
import Image1 from "../../public/favicon.ico";
import Image from "next/image"
import { useSelector } from 'react-redux';

function Header() {

	const loginData = useSelector((state) => state );
	console.log(loginData)
  const name = loginData.userState.user.name;

  return (
    <div className={styles.headcontainer}>
			<div className={styles.headwrapper}>
				<div className={styles.title}>
					<h2>
						Hello, <span>{name}</span>
					</h2>
					<p>welcome to the board.</p>
				</div>
				<div className={styles.profile}>
					<Image src={Image1} alt="profile" className={styles.headerImage} />
				</div>
			</div>
		</div>
  )
}

export default Header