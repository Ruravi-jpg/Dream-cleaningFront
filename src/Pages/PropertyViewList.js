import ListProperties from '../Components/ListProperties/ListPorperties'
import Dashboard from './DashBoard'

function PropertiesViewList ({user}){

    if(user.userData.role === 0){
        return <ListProperties/>
    }else{
        return <Dashboard userData={user} />
    }
    
}

export default PropertiesViewList