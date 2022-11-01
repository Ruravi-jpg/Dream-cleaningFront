import Dashboard from "./DashBoard";
import TableDashboard from '../Components/Dashboards/SelectTableDashboard/TableDashboard.jsx'


const SelectTable = ({userData}) =>{

    if(userData.userData.role === 0)
        return <TableDashboard />
    if(userData.userData.role === 1)
        return <Dashboard userData={userData}/>
    }
    
    
    
    
    export default SelectTable;