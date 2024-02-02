
//import styles from './listEmployees.module.css'
import { useState, React, forwardRef, DatePicker  } from "react";
import EmployeeService from "../../Services/employee.service";

import { useEffect } from "react";
import { Button, Table, Modal, Form, ButtonToolbar, Carousel, Input } from 'rsuite';
import logo from '../../Assets/mainPageImages/logodreamco-ConvertImage.png'
import styles from "./ListProperties.module.css"
import PropertyService from "../../Services/property.service";
import DayofWeekHelper from "../../Helpers/DayOfWeekHelper";
import Converters from "../../Helpers/Converters";
import FileUpload from "../DragAndDrop/DragAndDrop";


export default function ListAsignedWorkEmployee({ userData }) {

  document.body.className = ""
  const [showModalWorkUnit, setShowModalWorkUnit] = useState(false);
  const [modalDataWorkUnit, setModalDataWorkUnit] = useState({
    id: 0,
    property: {
      alias: "",
      address: "",
      hoursService: 0.0,
      costService: 0.0,
      comments: "",
      referencePhotosList: []
    },
    startTime: "",
    finishTime: "",
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

    let response = await EmployeeService.GetByUserId(userData.userData.id);

    if (response.status !== 200)
      return;

    response = await PropertyService.GetEmployeeWorkUnits(response.data.id);

    if (response.status !== 200)
      return;

    var auxData = response.data;

    auxData.map(element => {
      element.dayToWork = DayofWeekHelper.IntegerAsDayOfWeek(element.dayToWork)
    })

    let dataTreeData = [];

    let indexWeek = 0;
    for (let day of DayofWeekHelper.WeekArray) {
      let auxItem = {}
      indexWeek++;
      let workUnitsOfTheDay = auxData.filter(value => value.dayToWork === (day));

      auxItem.id = indexWeek

      auxItem.children = workUnitsOfTheDay.map((workUnit, index) => {
        return {
          id: day + "-" + index,
          Property: workUnit.property,
          StartTime: Converters.convertTo12HFormat(workUnit.startTime),
          FinishTime: Converters.convertTo12HFormat(workUnit.finishTime),
          moreInfoButton: <span>
            <Button color="red" appearance="primary" onClick={() => { setModalDataWorkUnit(workUnit); setShowModalWorkUnit(true) }}>
              More Info
            </Button>
          </span>
        }
      })
      auxItem.labelName = <label>{day} <label className={styles.totalDayHouses}>{" [ " + auxItem.children.length + " ]"}</label></label>;
      dataTreeData.push(auxItem)
      //indexWeek++;
    }

    //setData(response.data);
    setData(dataTreeData)


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


  useEffect(() => {
    fetchData();
  }, [])


  //renderizar
  return (
    <>

      <div className={styles.header}>
        <img src={logo} alt="" />
        <br /><br /><br /><br /><br /><hr className={styles.hr} />
        <h1>Work List</h1>
      </div>
      <div className={"container "}>
        <Table
          isTree
          defaultExpandAllRows
          rowKey="id"
          wordWrap="break-word"
          height={500}
          data={data}

        >

          <Column width={215} fixed={"left"}>
            <HeaderCell>Day</HeaderCell>
            <Cell dataKey="labelName" />
          </Column>

          <Column width={300}>
            <HeaderCell>Alias</HeaderCell>
            <Cell dataKey="Property.alias" />
          </Column>

          <Column width={300}>
            <HeaderCell>Address</HeaderCell>
            <Cell dataKey="Property.address" />
          </Column>

          <Column width={150} >
            <HeaderCell>Start Time</HeaderCell>
            <Cell dataKey="StartTime" />
          </Column>

          <Column width={150} >
            <HeaderCell>Finish Time</HeaderCell>
            <Cell dataKey="FinishTime" />
          </Column>

          <Column width={130}fixed={"right"} >
            <HeaderCell></HeaderCell>
            <Cell dataKey="moreInfoButton" /> 
          </Column>


        </Table>
      </div>
      <EmployeeWorkModal fetchData={fetchData} data={modalDataWorkUnit} showModalWorkUnit={showModalWorkUnit} setShowModalWorkUnit={setShowModalWorkUnit} ></EmployeeWorkModal>
    </>


  )

}



export function EmployeeWorkModal({ data, showModalWorkUnit, setShowModalWorkUnit }) {

  const [isEditing, setIsEditing] = useState(false);
  const [referencePhotosList, setReferencePhotosList] = useState([]);
  const [fetchingImages, setFetchingImages] = useState(true);

  const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

  useEffect(() => {
    if (showModalWorkUnit) {
      fetchPhotos();
    }

  }, [showModalWorkUnit])


  const handleFormSubmit = async (event) => {

    console.debug("other closing");
    setShowModalWorkUnit(false);
    setIsEditing(false);
    // setOpenModal(true);

    // let Property = new PropertyCreateModel(propertyData);


    // let resProp = await PropertyService.post(Property);
    // setOpenModal(false);
    // //if the property post was succesfull we can try to post the images
    // if(resProp.status === 201){
    //     let propId = getIdFromUrl(resProp.headers.location);
    //     let resPhotos = await PropertyService.postPhotos(referencePhotosList, propId);
    //     if(resPhotos.status === 204){
    //         toaster.push(messageSuccess);  
    //     }else{
    //         toaster.push(messageErrorImage(resPhotos.response.data));
    //     }
    // }else{
    //     toaster.push(messageErrorProperty(resProp.response.data));  
    // }

}

  const handleClose = () => {
    console.debug("colsing");
    setShowModalWorkUnit(false);
    setIsEditing(false);
  }

  const fetchPhotos = async () => {
    setFetchingImages(true);
    if (!data.property.referencePhotosList){
      setFetchingImages(false);
      return;
    }
      
    
    let photoList = [];
    for (let guid of data.property.referencePhotosList) {
      let photo = await PropertyService.getPhotos(data.property.id, guid);
      if(photo.status !== 200){
        setFetchingImages(false);
        return;
      }
      let file = new File([photo.data], guid, {
        type: photo.headers["content-type"]
      });
      photoList.push(file);
    }
    setReferencePhotosList(photoList);
    setFetchingImages(false);
  }

  

  return (
    <>
      <Modal size={"md"} open={showModalWorkUnit} onClose={handleClose} overflow={false} >
        <Modal.Header>

        </Modal.Header>
        <Modal.Body>

          <Form layout="horizontal" formValue={data} readOnly >
            <Form.Group controlId="property.alias">
              <Form.ControlLabel>Alias</Form.ControlLabel>
              <Form.Control name="Alias" value={data.property.alias}/>
            </Form.Group>
            <Form.Group controlId="property.address">
              <Form.ControlLabel>Address</Form.ControlLabel>
              <Form.Control name="Address" value={data.property.address} />
            </Form.Group>
            <Form.Group controlId="property.BtwnStreets">
            <Form.ControlLabel>Between Streets</Form.ControlLabel>
              <Form.Control name="Btwn1" value={data.property.btwnStreet1} />
              <Form.Control name="Btwn2" value={data.property.btwnStreet2} />
            </Form.Group>

                        
            <Form.Group controlId="property.comments">
            <Form.ControlLabel>Property comments</Form.ControlLabel>
            <Form.Control name="textarea" rows={5} accepter={Textarea} value={data.property.comments} />
            </Form.Group>

            <Form.Group controlId="property.startTime">
              <Form.ControlLabel>Schedule</Form.ControlLabel>
              <Form.Control name="schedule" value={Converters.convertTo12HFormat(data.startTime) + " - " + Converters.convertTo12HFormat(data.finishTime)} />
            </Form.Group>

            <Form.Group controlId="property.Photos" >
              
              <Carousel
                autoplay
                key="imagesCarrousel"
                placement={"right"}
                shape={"bar"}
                className="custom-slider"
              >
                {
                   referencePhotosList.map((image, index) =>{
                      return(<img key={index} alt="" src={URL.createObjectURL(image)}  ></img>)
                   })
                }
               

              </Carousel>
            </Form.Group>

            <Form.Group controlId="property.startTime">
              <FileUpload
                accept=".jpg,.png,.jpeg"
                label="Add work evidence"
                multiple
                updateFilesCb={setReferencePhotosList}
                maxFileSizeInBytes={400000}
              />
            </Form.Group>

          </Form>

          


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleFormSubmit()} appearance="primary" data-function="close">
            Ok
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
}
