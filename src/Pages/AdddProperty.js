import RegisterProperty from '../Components/RegisterProperties/RegisterPorperty'
import Dashboard from './DashBoard'

function AddProperty({user}){

    if(user.userData.role === 0){
        return <RegisterProperty/>
    }else{
        return <Dashboard userData={user} />
    }
    
}

export default AddProperty