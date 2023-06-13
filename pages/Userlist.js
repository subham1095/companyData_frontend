import Navbar from '../components/Dashboard/Navbar';
import Sidebar from '../components/Dashboard/Sidebar';
import Content from '../components/Userlist/Content';
import { useSelector } from 'react-redux';
import Login from "../components/Logins/Login"

export default function Userlist() {
 
    const loginData = useSelector((state) => state );
  const token = loginData.userState.user;
    return (
            <div>
                {token ?
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
