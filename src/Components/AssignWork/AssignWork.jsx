import logo from '../../Assets/mainPageImages/logodreamco-ConvertImage.png'
import styles from './Assignwork.module.css'
import { useState, React } from "react";
import EmployeeService from "../../Services/employee.service";
import { useEffect } from "react";
import { Button, Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import PropertyService from "../../Services/property.service";
import AssignWorkModal from '../AssignWorkModal/AssignWorkModal';



function AssignWork() {

    document.body.className = ""
    const [showModalProperty, setShowModalProperty] = useState(false);
    const [modalDataProperty, setModalDataProperty] = useState({
        id: 0,
        Alias: "",
        Address: "",
        RefStreet1: "",
        RefStreet2: "",
        HoursService: 0.0,
        CostService: 0.0,
        Comments: "",
        ReferencePhotosList: [],
        PropertyEmployees: []
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

    const { Column, HeaderCell, Cell } = Table;

    const fetchData = async () => {
        let response = await PropertyService.GetAll();

        if(response.status === 200)
            setData(response.data);

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
                <h1>Properties List</h1>
            </div>
            <div className={"container "}>
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
                    style={{
                        fontSize: '22px'
                    }}
                >
                    <Column flexGrow={1} align="center" fixed sortable style={{ height: '50px' }}>
                        <HeaderCell style={{ fontSize: '25px' }}>Id</HeaderCell>
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

                        <Cell style={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto' }}>
                            {rowData => (
                                <span>
                                    <Button color="red" appearance="primary" onClick={async () => { setModalDataProperty(rowData); setShowModalProperty(true) }}>
                                        See Agenda
                                    </Button>
                                </span>
                            )}
                        </Cell>
                    </Column>
                </Table>
            </div>
            <AssignWorkModal fetchData={fetchData} data={modalDataProperty}  showModalProperty={showModalProperty} setShowModalProperty={setShowModalProperty} ></AssignWorkModal>
        </>


    )

}

export default AssignWork