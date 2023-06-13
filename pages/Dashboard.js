import Navbar from '../components/Dashboard/Navbar';
import Sidebar from '../components/Dashboard/Sidebar';
import Content from '../components/Dashboard/Content';
import { useSelector } from 'react-redux';
import Login from "../components/Logins/Login"

export default function Dashboard() {

  const loginData = useSelector((state) => state );
  const token1 = loginData.userState.user;
  // console.log(token1);

  

  return (
     
    <div>
      {token1 ?
				<>
        <Sidebar />
         <Navbar />
        
          
         
          <Content />
         
        </>

         : <div>
            <Login />
           </div>
         }
    </div>
		
     
  
  )
  
}
