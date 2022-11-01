import RegisterUser from '../Components/RegisterUser/RegisterUser'
import Dashboard from './DashBoard'

function AddEmployee ({user}){

    if(user.userData.role === 0){
        return <RegisterUser/>
    }else{
        return <Dashboard userData={user} />
    }
    
}

export default AddEmployee