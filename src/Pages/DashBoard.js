
import WorkerDashboard from "../Components/Dashboards/WorkerDashboard/WorkerDashboard";
import AdminDashboard from "../Components/Dashboards/AdminDashboard/AdminDashboard";

const Dashboard = ({userData}) =>{

if(userData.userData.role === 0)
    return <AdminDashboard/>
if(userData.userData.role === 1)
    return <WorkerDashboard/>
}




export default Dashboard;