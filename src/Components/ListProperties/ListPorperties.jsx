
//import styles from './listEmployees.module.css'
import { useState, React } from "react";
import EmployeeService from "../../Services/employee.service";

import { useEffect } from "react";
import { Button, Table } from 'rsuite';
import logo from '../../Assets/mainPageImages/logodreamco-ConvertImage.png'
import styles from "./ListProperties.module.css"
import 'rsuite/dist/rsuite.min.css';
import PropertyService from "../../Services/property.service";
import PropertyModal from "../PropertyModal/PropertyModal";




function ListProperties() {

  document.body.className = ""
  const [showModalProperty, setShowModalProperty] = useState(false);

  const [modalDataProperty, setModalDataProperty] = useState({
    id: 0,
     Alias: "", 
     Address: "", 
     RefStreet1:"", 
     RefStreet2: "", 
     HoursService: 0.0,
     CostService: 0.0,  
     Comments:"",
     ReferencePhotosList : [],
     PropertyEmployees : []
    });
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
    const response = await PropertyService.GetAll();
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
            <HeaderCell>Alias</HeaderCell>
            <Cell dataKey="alias" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Address</HeaderCell>
            <Cell dataKey="address" />
          </Column>

          <Column flexGrow={.5} fixed="right">
            <HeaderCell></HeaderCell>

            <Cell>
              {rowData => (
                <span>
                  {/* <a onClick={() => alert(`id:${rowData.id}`)}> Options </a> */}
                  <Button color="red" appearance="primary" onClick={async () => {setModalDataProperty(rowData); setShowModalProperty(true)}}>
                    View
                  </Button>
                </span>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
        <PropertyModal fetchData={fetchData} data={modalDataProperty} setData={setModalDataProperty} showModalProperty={showModalProperty} setShowModalProperty={setShowModalProperty}></PropertyModal>
    </>


  )

}


export default ListProperties