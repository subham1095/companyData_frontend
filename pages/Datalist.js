import Navbar from '../components/Dashboard/Navbar';
import Sidebar from '../components/Dashboard/Sidebar';
import DataList from '../components/Datalist/Datalist';
import { useSelector } from 'react-redux';
import Login from "../components/Logins/Login"

export default function Datalist() {
 
    const loginData = useSelector((state) => state );
    const token = loginData.userState.user;
    return (
            <div>
                {token ?
				<>
                  <Sidebar />
                  
                  <Navbar />
                  <DataList />
                  </>

                  : <div>
                    <Login/>
                   </div>
                 } 
              </div>

              
       
    
    )
  
}
