import Navbar from '../components/Dashboard/Navbar';
import Sidebar from '../components/Dashboard/Sidebar';
import Accesslist from '../components/AccessList/Accesslist';
// import Content from '../components/dashboard/Content';
import { useSelector } from 'react-redux';
import Loginuser from "../components/Logins/Login"

export default function Accessmanagerlist() {

  const loginData = useSelector((state) => state );
  const token = loginData.userState.user;

  

  return (
    <div>
      {token ?
				<>
        
          <Sidebar />
          <Navbar />
          <Accesslist />
        </>

          : <div>
            <Loginuser/>
           </div>
         } 
    </div>
		
     
  
  )
  
}
