
//import styles from './listEmployees.module.css'
import { useState, React } from "react";
import EmployeeService from "../../Services/employee.service";

import { useEffect } from "react";
import { Button, Table } from 'rsuite';
import logo from '../../Assets/mainPageImages/logodreamco-ConvertImage.png'
import styles from "./listEmployees.module.css"
import 'rsuite/dist/rsuite.min.css';
import EmployeeModal from "../EmployeeModal/EmployeeModal";




function ListEmployees() {

  document.body.className = ""
  const [showModalEmployee, setShowModalEmployee] = useState(false);

  const [modalDataEmployee, setModalDataEmployee] = useState({name: "", lastName: "", streetAddress: "", refStreet1:"", refStreet2: "", comments:"", id: 0});
  const [data, setData] = useState([]);

  //table
  let table = document.getElementsByClassName("rs-table");
  for (let i = 0; i < table.length; i++) {
    table[i].classList.add(styles.rsTable);
  }

  //header
  let tableHeader = document.getElementsByClassName("rs-table-header-row-wrapper");
  for (let i = 0; i < tableHeader.length; i++) {
    tableHeader[i].classList.add(styles.tableHeader);
  }

  //table row
  let tableRow = document.getElementsByClassName("rs-table-cell-last");
  for (let i = 0; i < tableRow.length; i++) {
    tableRow[i].classList.add(styles.rsTableRow);
  }

  const { Column, HeaderCell, Cell } = Table;

  const fetchData = async () => {
    const response = await EmployeeService.GetAll();
    setData(response);
  }


  //sorting
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };


  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };



  useEffect(() => {
    fetchData();
  }, [])

  //renderizar
  return (
    <>
      <div className={styles.header}>
        <img src={logo} alt="" />
        <br /><br /><br /><br /><br /><hr className={styles.hr} />
        <h1>Employee List</h1>
      </div>
      <div className={"container " + styles.tableContainer}>
        <Table
          cellBordered
          hover={false}
          height={500}
          data={getData()}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
          wordWrap="break-word"
        >
          <Column flexGrow={1} align="center" fixed sortable>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />

          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>First Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Last Name</HeaderCell>
            <Cell dataKey="lastName" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Address</HeaderCell>
            <Cell dataKey="streetAddress" />
          </Column>


          <Column flexGrow={.5} fixed="right">
            <HeaderCell></HeaderCell>

            <Cell>
              {rowData => (
                <span>
                  {/* <a onClick={() => alert(`id:${rowData.id}`)}> Options </a> */}
                  <Button color="red" appearance="primary" onClick={() => {setModalDataEmployee(rowData); setShowModalEmployee(true)}}>
                    View
                  </Button>
                </span>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
        <EmployeeModal fetchData={fetchData} data={modalDataEmployee} showModalEmployee={showModalEmployee} setShowModalEmployee={setShowModalEmployee}></EmployeeModal>
    </>


  )

}


export default ListEmployees