import ListEmployees from '../Components/ListEmployees/ListEmployees'
import Dashboard from './DashBoard'

function EmployeeViewList ({user}){

    if(user.userData.role === 0){
        return <ListEmployees/>
    }else{
        return <Dashboard userData={user} />
    }
    
}

export default EmployeeViewList