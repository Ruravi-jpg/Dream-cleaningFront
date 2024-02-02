import AssignWork from "../Components/AssignWork/AssignWork";
import Dashboard from "./DashBoard";


function AssignWorkPage({userData}){

    if(userData.userData.role === 0)
    return <AssignWork/>
if(userData.userData.role === 1)
    return <Dashboard userData={userData}/>
}

export default AssignWorkPage