
import {Outlet} from 'react-router-dom'
import Login from '../../Pages/Login';


const PortectedRoute = ({Token}) =>{
    
    // if(!userData){
    //     return <Redirect to="/" ></Redirect>
    // }

    // return <Route {... props} />

    //return user != null ? <Outlet/> : <Navigate to="/"/>
    return Token ?  <Outlet/> : <Login/>
}

export default PortectedRoute;