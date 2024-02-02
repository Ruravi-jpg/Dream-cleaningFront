
import PropertyService from "../../Services/property.service";
import { useEffect } from "react";
import { useState, React } from "react";
import { Form, Button, Modal, Notification, useToaster } from 'rsuite';
import { IconButton, InputPicker, DateRangePicker } from 'rsuite';
import styles2 from './DayPicker.module.css'
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import CloseIcon from '@rsuite/icons/Close';
import EmployeeService from '../../Services/employee.service';
import WorkUnitModel from '../../Models/WorkUnitModel';
import { guid } from 'rsuite/esm/utils';
import WorkUnitRegisterModel from "../../Models/WorkUnitRegisterModel";
import WorkUnitUpdateModel from "../../Models/WorkUnitUpdateModel";
import DayofWeekHelper from "../../Helpers/DayOfWeekHelper";



export default function AssignWorkModal({ fetchData, data, showModalProperty, setShowModalProperty }) {

  //modalState
  const [editing, setIsEditing] = useState(false);
  const [propertyData, setPropertyData] = useState({});
  const toaster = useToaster();
  const [workUnits, setWorkUnits] = useState([]);
  const [newWorkUnits, setNewWorkUnits] = useState([]);
  const [selectedDayId, setSelectedDayId] = useState("None");
  const [employeeList, setEmployeeList] = useState([]);
  const [updateWorkUnitList, setUpdateWorkList] = useState([]);
  const [deleteWorkUnitList, setDeleteWorkUnitList] = useState([]);

  function onLiClick(li) {
    let item = li.target;
    document.querySelectorAll("." + styles2.daySelectorDayClicked).forEach(but => {
      but.classList.remove(styles2.daySelectorDayClicked);
    })

    item.classList.add(styles2.daySelectorDayClicked);

    setSelectedDayId(item.id);
    document.getElementById("currentDay").innerHTML = "Current Day: " + item.id;


  }



  



  function addWorkUnit() {
    var newWorkUnit = new WorkUnitModel(guid(), null, "00:00", "00:01", selectedDayId);

    var auxWorkUnit = [...newWorkUnits];
    auxWorkUnit.push(newWorkUnit)

    setNewWorkUnits(auxWorkUnit);

    var curLi = document.getElementById(selectedDayId);
    if (curLi !== null) {
      curLi.setAttribute("data-has-work", "true");
    }

    setIsEditing(true);
  }

  function DeleteWorkUnit(key) {
    let workUnit = workUnits.find(workUnit => {
      if (workUnit.id === key)
        return workUnit;
    })

    if (workUnit === undefined) {
      workUnit = newWorkUnits.find(workUnit => {
        if (workUnit.id === key)
          return workUnit;
      })

      if (workUnit === undefined) {
        console.log("That work unit doesent exists")
      } else {
        //remove from newWorkUnitList
        let auxList = newWorkUnits.filter(workUnit => workUnit.id !== key);
        setNewWorkUnits(auxList);
      }
    } else {
      //remove from WorkUnitList and the updateList
      let auxList = workUnits.filter(workUnit => workUnit.id !== key);
      setWorkUnits(auxList);

      auxList = updateWorkUnitList.filter(workUnit => workUnit.id !== key);
      setUpdateWorkList(auxList);

      //add the id to delete it
      let auxDeleteList = [...deleteWorkUnitList];
      auxDeleteList.push(workUnit.id);
      setDeleteWorkUnitList(auxDeleteList);
    }

    setIsEditing(true);
  }

  function OnUpdateWorkUnit(key) {

    let workUnit = updateWorkUnitList.find(workUnit => {
      if (workUnit.id === key) {
        return workUnit;
      }
    })

    if (workUnit) {
      return;
    }


    let auxList = [...updateWorkUnitList];

    workUnit = workUnits.find(workUnit => {
      if (workUnit.id === key) {
        return workUnit;
      }
    })

    if (!workUnit) {
      console.log("Work unit dosent exists")
      return;
    }

    auxList.push(workUnit)

    setUpdateWorkList(auxList);

    setIsEditing(true);
  }


  const fetchEmployeeNames = async () => {
    let response = await EmployeeService.GetAll();
    if (response.status === 200) {
      var employeeItemList = response.data.map(item => ({
        label: item.name, value: item.id
      }));

      setEmployeeList(employeeItemList);
    }
  }

  const fetchWorkUnitData = async () => {
    let response = await PropertyService.GetPropertyWorkUnits(data.id);

    if (response.status === 200)
      setWorkUnits(response.data)
  }

  useEffect(() => {
    workUnits.forEach(workUnit => {
      var curLi = document.getElementById(workUnit.dayToWork);
      if (curLi !== null) {
        curLi.setAttribute("data-has-work", "true");
      }
    })
  }, [workUnits])


  useEffect(() => {
    if (showModalProperty) {
      fetchWorkUnitData()
      fetchEmployeeNames()
      setPropertyData(data);
    }
  }, [showModalProperty])


  const handleClose = () => {
    setShowModalProperty(false);
    setNewWorkUnits([]);
    setUpdateWorkList([]);
    setWorkUnits([]);
    setSelectedDayId("None");
    setIsEditing(false);
  }

  const postNewWorkUnits = async () => {
    if (newWorkUnits.length === 0)
      return true;

    let newWorkUnitsArray = []
    for(const newWorkUnit of newWorkUnits){

      if(newWorkUnit.employeeId === null)
        continue;


      newWorkUnitsArray.push(new WorkUnitRegisterModel(
        newWorkUnit.employeeId,
        newWorkUnit.startTime,
        newWorkUnit.finishTime,
        DayofWeekHelper.DayOfWeekAsInteger(newWorkUnit.dayToWork)
      ))
    }

    const result = await PropertyService.PostWorkUnits(data.id, newWorkUnitsArray);

    if (result.status === 200) {
      setNewWorkUnits([]);
      return true;
    } else {
      return false;
    }
  }

  const deleteWorkUnits = async () => {

    if (deleteWorkUnitList.length === 0)
      return true;

    
    let success  = true;

    for(const workUnit of deleteWorkUnitList){
      const result = await PropertyService.DeleteWorkUnits(workUnit);
      if (result.status !== 204) {
        success = false;
      }
    }

    setDeleteWorkUnitList([]);
    return success;
  }

  const updateWorkUnits = async () =>{
    if(updateWorkUnitList.length === 0)
      return true;
    
    let success  = true;

    for(const workUnit of updateWorkUnitList){
      let auxWorkUnit = new WorkUnitUpdateModel(
        workUnit.employeeId, 
        workUnit.startTime,
        workUnit.finishTime, 
        DayofWeekHelper.DayOfWeekAsInteger(workUnit.dayToWork)
        )
      const result = await PropertyService.PutWorkUnit(workUnit.id, JSON.stringify(auxWorkUnit));
      if (result.status !== 204) {
        success = false;
      }
    }

    setUpdateWorkList([]);
    return success;
  }


  const handleEdit = async () => {
    let changes = {status: true, messages: []}

    if (!await postNewWorkUnits()) {
      changes.status = false;
      changes.messages.push("Error while posting new workUnits")
    }

    if(!await updateWorkUnits()){
      changes.status = false;
      changes.messages.push("Error while updating one or more workUnits")
    }

    if (!await deleteWorkUnits()) {
      changes.status = false;
      changes.messages.push("Error while deleting one or more workUnits")
    }

    if(!changes.status){
      toaster.push(messageError(changes.messages))
    }else{
      toaster.push(messageSuccess);
    }


    setIsEditing(false);
    setShowModalProperty(false);
    fetchData();
  }


  const messageSuccess = (
    <Notification type={"success"} header={"Success"} closable>
      <p>The work agenda edited successfully</p>
      <hr />
    </Notification>
  );

  const messageError = (messages) => (
    <Notification type={"error"} header={"Error"} closable>
      <p>There was an error while editing the work agenda</p>
      <p>Try again. If the error persists please contact an administrator.</p>
      <p>{messages.map((message, index )=> {return <p key={index}>{message}</p>})}</p>
      <hr />
    </Notification>
  );



  return (
    <>
      <Modal size={"md"} open={showModalProperty} onClose={handleClose} overflow={false} >
        <Modal.Header>

        </Modal.Header>
        <Modal.Body>

          <Form fluid onChange={setPropertyData} formValue={propertyData}>
            <Form.Group controlId="alias-9">
              <>
                <div className='container-fluid'>
                  <h2 className={styles2.componentHeading + " " + styles2.tHeading} >Work Agenda</h2>
                  <ul className={styles2.daySelector} id="DayPicker">
                    <li className={styles2.daySelectorDay + " " + styles2.tBody} id="Sunday" onClick={(v) => onLiClick(v)} data-has-work="false">Sun </li>
                    <li className={styles2.daySelectorDay + " " + styles2.tBody} id="Monday" onClick={(v) => onLiClick(v)} data-has-work="false">Mon</li>
                    <li className={styles2.daySelectorDay + " " + styles2.tBody} id="Tuesday" onClick={(v) => onLiClick(v)} data-has-work="false">Tue</li>
                    <li className={styles2.daySelectorDay + " " + styles2.tBody} id="Wednesday" onClick={(v) => onLiClick(v)} data-has-work="false">Wed</li>
                    <li className={styles2.daySelectorDay + " " + styles2.tBody} id="Thursday" onClick={(v) => onLiClick(v)} data-has-work="false">Thu</li>
                    <li className={styles2.daySelectorDay + " " + styles2.tBody} id="Friday" onClick={(v) => onLiClick(v)} data-has-work="false">Fri</li>
                    <li className={styles2.daySelectorDay + " " + styles2.tBody} id="Saturday" onClick={(v) => onLiClick(v)} data-has-work="false">Sat</li>
                  </ul>
                  <div className={styles2.textBox}>
                    <p id='currentDay'>Current Day: None</p>
                  </div>
                  <br />
                  <ul >
                    {

                      workUnits.map((workUnit, index) => {
                        if (workUnit.dayToWork === selectedDayId) {
                          return (<WorkList employeeList={employeeList} key={index} data={workUnit} OnDeleteWorkUnit={DeleteWorkUnit} OnUpdateWorkUnit={OnUpdateWorkUnit} IsNew={false}></WorkList>)
                        }
                      })

                    }
                    {
                      newWorkUnits.map((workUnit, index) => {
                        if (workUnit.dayToWork === selectedDayId) {
                          return (<WorkList employeeList={employeeList} key={index} data={workUnit} OnDeleteWorkUnit={DeleteWorkUnit} IsNew={true}></WorkList>)
                        }
                      })
                    }
                    {
                      selectedDayId === "None" ? null : <li key={"Add"} className={styles2.stylessList}><IconButton className={styles2.addButton} icon={<PlusRoundIcon />} circle size="md" onClick={() => addWorkUnit()} /> Add</li>
                    }
                  </ul>
                </div>


              </>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary" data-function="clean" >
            Clean all work
          </Button>
          {
            editing ? (
              <>
                <Button onClick={handleClose} appearance="primary" data-function="discard">
                  Discard Changes
                </Button>
                <Button onClick={handleEdit}  appearance="primary" data-function="save">
                  Save and exit
                </Button>
              </>
            )
              :
              <Button onClick={handleClose} appearance="primary" data-function="close">
                Ok
              </Button>
          }

        </Modal.Footer>
      </Modal>
    </>

  )
}



export function WorkList({ data, employeeList, OnDeleteWorkUnit, IsNew, OnUpdateWorkUnit }) {

  const [startTime, SetStartTime] = useState(data.startTime);
  const [finishTime, setFinishTime] = useState(data.finishTime);
  const [curEmployee, setCurEmployee] = useState(data.employeeId ? data.employeeId : null);
  const [isDirty, setIsDirty] = useState(false);
  const [isNew, setIsNew] = useState(IsNew);


  const OnTimeChange = (time) => {

    var startTimeString = `${("0" + time[0].getHours()).slice(-2)}:${("0" + time[0].getMinutes()).slice(-2)}`;
    var finishTimeString = `${("0" + time[1].getHours()).slice(-2)}:${("0" + time[1].getMinutes()).slice(-2)}`;

    SetStartTime(startTimeString);
    setFinishTime(finishTimeString);

    data.startTime = startTimeString;
    data.finishTime = finishTimeString;

    if (!isNew) {
      OnUpdateWorkUnit(data.id);
      setIsDirty(true);
    }
  }

  const OnEmployeeChange = (employee) => {
    data.employeeId = employee;
    setCurEmployee(employee);


    if (!isNew) {
      OnUpdateWorkUnit(data.id)
      setIsDirty(true);
    }
  }

  return (
    <>
      <li className={styles2.stylessList} key={guid()}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <div className=' h-100 d-flex justify-content-center align-items-center'>
                <InputPicker defaultValue={curEmployee} onChange={(v) => OnEmployeeChange(v)} data={employeeList} style={{ width: 224, color: "red" }} />
              </div>
            </div>
            <div className="col-4">
              <div className=' h-100 d-flex justify-content-center align-items-center'>
                <DateRangePicker
                  format="HH:mm"
                  ranges={[]}
                  // defaultCalendarValue={[new Date(`2022-02-01 ${startTime}`), new Date(`2022-02-01 ${finishTime}`)]}
                  defaultValue={[new Date(`2022-02-01 ${startTime}`), new Date(`2022-02-01 ${finishTime}`)]}
                  onChange={(value) => OnTimeChange(value)}
                />
              </div>
            </div>
            <div className="col-2">
              <IconButton className={styles2.addButton} icon={<CloseIcon />} circle size="md" onClick={() => OnDeleteWorkUnit(data.id)} />
            </div>
          </div>
        </div>
      </li>
    </>
  )

}