
import { useEffect } from 'react';
import { useState, React } from "react";
import PropertyService from "../../Services/property.service";
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import CloseIcon from '@rsuite/icons/Close';
import { IconButton, InputPicker, DateRangePicker } from 'rsuite';
import styles from './DayPicker.module.css'
import EmployeeService from '../../Services/employee.service';
import WorkUnitRegisterModel from '../../Models/WorkUnitRegisterModel';
import { guid } from 'rsuite/esm/utils';
import WorkUnitModel from '../../Models/WorkUnitModel';

export default function WorkAgenda({ data, hasToUpdate, OnSubmitModalEvent}) {

  const [workUnits, setWorkUnits] = useState([]);
  const [newWorkUnits, setNewWorkUnits] = useState([]);
  const [selectedDayId, setSelectedDayId] = useState("None");
  const [employeeList, setEmployeeList] = useState([]);
  const [updateWorkUnitList, setUpdateWorkList] = useState([]);

  function onLiClick(li) {
    let item = li.target;
    document.querySelectorAll("." + styles.daySelectorDayClicked).forEach(but => {
      but.classList.remove(styles.daySelectorDayClicked);
    })

    item.classList.add(styles.daySelectorDayClicked);

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
      //remove from WorkUnitList
      let auxList = workUnits.filter(workUnit => workUnit.id !== key);
      setWorkUnits(auxList);
    }


  }

  function OnUpdateWorkUnit(key) {

    let workUnit = updateWorkUnitList.find(workUnit => {
      if (workUnit.id === key) {
        return workUnit;
      }
    })

    if (workUnit){
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

  }

  useEffect(() => {
    console.log(updateWorkUnitList);
  }, [updateWorkUnitList])

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
    else
      console.log("kk")
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
    if (hasToUpdate) {
      fetchWorkUnitData()
      fetchEmployeeNames()
    }
  }, [hasToUpdate])

  const OnSubmitModal = (event) =>{
    
  }

  return (
    <>
      <div className='container-fluid'>
        <h2 className={styles.componentHeading + " " + styles.tHeading} >Work Agenda</h2>
        <ul className={styles.daySelector} id="DayPicker">
          <li className={styles.daySelectorDay + " " + styles.tBody} id="Sunday" onClick={(v) => onLiClick(v)} data-has-work="false">Sun </li>
          <li className={styles.daySelectorDay + " " + styles.tBody} id="Monday" onClick={(v) => onLiClick(v)} data-has-work="false">Mon</li>
          <li className={styles.daySelectorDay + " " + styles.tBody} id="Tuesday" onClick={(v) => onLiClick(v)} data-has-work="false">Tue</li>
          <li className={styles.daySelectorDay + " " + styles.tBody} id="Wednesday" onClick={(v) => onLiClick(v)} data-has-work="false">Wed</li>
          <li className={styles.daySelectorDay + " " + styles.tBody} id="Thursday" onClick={(v) => onLiClick(v)} data-has-work="false">Thu</li>
          <li className={styles.daySelectorDay + " " + styles.tBody} id="Friday" onClick={(v) => onLiClick(v)} data-has-work="false">Fri</li>
          <li className={styles.daySelectorDay + " " + styles.tBody} id="Saturday" onClick={(v) => onLiClick(v)} data-has-work="false">Sat</li>
        </ul>
        <div className={styles.textBox}>
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
            selectedDayId === "None" ? null : <li key={"Add"} className={styles.stylessList}><IconButton className={styles.addButton} icon={<PlusRoundIcon />} circle size="md" onClick={() => addWorkUnit()} /> Add</li>
          }
        </ul>
      </div>


    </>
  )
}

export function WorkList({ data, employeeList, OnDeleteWorkUnit, IsNew, OnUpdateWorkUnit }) {

  const [startTime, SetStartTime] = useState(data.startTime);
  const [finishTime, setFinishTime] = useState(data.finishTime);
  const [curEmployee, setCurEmployee] = useState(data.employeeId ? data.employeeId : guid());
  const [isDirty, setIsDirty] = useState(false);
  const [isNew, setIsNew] = useState(IsNew);


  const OnTimeChange = (time) => {

    var startTimeString = `${time[0].getHours()}:${time[0].getMinutes()}`;
    var finishTimeString = `${time[1].getHours()}:${time[1].getMinutes()}`;

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
      <li className={styles.stylessList} key={guid()}>
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
              <IconButton className={styles.addButton} icon={<CloseIcon />} circle size="md" onClick={() => OnDeleteWorkUnit(data.id)} />
            </div>
          </div>
        </div>
      </li>
    </>
  )

}