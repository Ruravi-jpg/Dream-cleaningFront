
import { useEffect } from "react";
import { useState, React } from "react";
import { Form, Button, Modal, Notification, useToaster, IconButton, List, SelectPicker, FlexboxGrid } from 'rsuite';
import FormControl from "rsuite/esm/FormControl";
import PropertyUpdateModel from "../../Models/PropertyUpdateModal";
import EmployeeService from "../../Services/employee.service";
import PropertyService from "../../Services/property.service";
import FileUpload from "../DragAndDrop/DragAndDrop";


export default function PropertyModal({ fetchData, data, setData, showModalProperty, setShowModalProperty, allEmployeeList }) {
  //modalState
  const [editing, setIsEditing] = useState(false);
  const [editingPhotos, setIsEditingPhotos] = useState(false);
  const [referencePhotosList, setReferencePhotosList] = useState([]);
  const [fetchingImages, setFetchingImages] = useState(true);
  const [curEmployeeList, setCurEmployeeList] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const toaster = useToaster();


  let selectData = allEmployeeList.map(
    item => ({ label: item.user.username, value: item.id })
  )

  useEffect(() => {
    if (showModalProperty) {
      fetchPhotos();
      if (data.employeesList != null) {
        setCurEmployeeList(data.employeesList)
      }

      setPropertyData(data);

    }

  }, [showModalProperty])


  useEffect(() => {
    if (fetchingImages === true)
      return;
    if (editingPhotos !== true)
      return;

    if (showModalProperty !== true)
      return;


    setIsEditing(true);

  }, [referencePhotosList])





  const fetchPhotos = async () => {

    setFetchingImages(true);
    if (!data.referencePhotosList)
      return;

    let photoList = [];
    for (let guid of data.referencePhotosList) {
      let photo = await PropertyService.getPhotos(data.id, guid);
      let file = new File([photo.data], guid, {
        type: photo.headers["content-type"]
      });
      photoList.push(file);
    }

    setReferencePhotosList(photoList);
    setFetchingImages(false);
  }

  const handleClose = () => {
    setIsEditingPhotos(false);
    setShowModalProperty(false);
    setIsEditing(false);
  }


  const handleEdit = async () => {
    let employeeIdList = curEmployeeList.map(employee => employee.id);

    let update = new PropertyUpdateModel(
      propertyData.alias,
      propertyData.address,
      propertyData.btwnStreet1,
      propertyData.btwnStreet2,
      propertyData.hoursService,
      propertyData.costService,
      propertyData.comments,
      employeeIdList
    )
    console.log(update)
    
    
    

    //if we are only editing th data and not the images
    if (!editingPhotos) {
      console.log("editing only data");
      const postResponse = await PropertyService.put(update, propertyData.id);
      if (postResponse) {
        toaster.push(messageSuccess);
      } else {
        toaster.push(messageError)
      }
      //if we are editing the images
    }else{
      
      const postResponse = await PropertyService.put(update, propertyData.id);
      if (postResponse) {
        //if the put of property and wee are editing the photo list we can try to post the new photos
        if (editingPhotos) {
          let resPhotos = await PropertyService.postPhotos(referencePhotosList, propertyData.id);
          if (resPhotos.status === 204) {
            toaster.push(messageSuccess);
          } else {
            toaster.push(messageErrorImage(resPhotos.response.data));
          }
        }
      } else {
        toaster.push(messageError)
      }
    }

    setIsEditingPhotos(false);
    setIsEditing(false);
    setShowModalProperty(false);
    fetchData();
  }

  const onEmployeeListChange = (value) => {
    if (value == null) {
      return;
    }

    const userToAdd = allEmployeeList.filter(e => e.id === value);

    let isInList = false;

    for (let i = 0; i < curEmployeeList.length; i++) {
      if (curEmployeeList[i].id === userToAdd[0].id) {
        isInList = true;
        break;
      }
    }


    if (!isInList) {
      setIsEditing(true);
      let newArray = curEmployeeList.concat(userToAdd);
      setCurEmployeeList(newArray);
    }
  }

  const removeEmployeeFromList = (id) => {
    setIsEditing(true);

    console.log("Removing employee wit id: ", id)

    let newArray = curEmployeeList.filter(employee => employee.id !== id);

    setCurEmployeeList(newArray);
  }

  const messageSuccess = (
    <Notification type={"success"} header={"Success"} closable>
      <p>The Property was edited successfully</p>
      <hr />
    </Notification>
  );

  const messageError = (
    <Notification type={"error"} header={"Error"} closable>
      <p>There was an error while editing the property</p>
      <p>Try again. If the error persists please contact an administrator.</p>
      <hr />
    </Notification>
  );

  const messageErrorImage = (message) => (
    <Notification type={"error"} header={"Error"} duration={10000}>
      <p>There was an error while uploading the images</p>
      <p>The image(s) could not be uploaded, but the rest of the data was uploaded successfully</p>
      <p>Error:</p>
      <p>{message}</p>
      <hr />
    </Notification>
  );


  return (
    <>
      <Modal size={"md"} open={showModalProperty} onClose={handleClose} overflow={false} >
        <Modal.Header>
          <Modal.Title>Property Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form fluid onChange={setPropertyData} formValue={propertyData}>
            <Form.Group controlId="alias-9">
              <Form.ControlLabel> <b>Property Alias</b> </Form.ControlLabel>
              <Form.Control name="alias" onChange={() => { setIsEditing(true) }} />
            </Form.Group>
            <Form.Group controlId="address-9">
              <Form.ControlLabel><b>Property Address</b></Form.ControlLabel>
              <Form.Control name="address" onChange={() => { setIsEditing(true) }} />
            </Form.Group>
            <Form.Group controlId="btwnStreet1-9">
              <Form.ControlLabel> <b>Reference Street 1</b> </Form.ControlLabel>
              <Form.Control name="btwnStreet1" onChange={() => { setIsEditing(true) }} />
            </Form.Group>
            <Form.Group controlId="btwnStreet2-9">
              <Form.ControlLabel> <b>Reference Street 2</b> </Form.ControlLabel>
              <Form.Control name="btwnStreet2" onChange={() => { setIsEditing(true) }} />
            </Form.Group>
            <Form.Group controlId="hoursService-9">
              <Form.ControlLabel> <b>Estimated Hours of service</b> </Form.ControlLabel>
              <Form.Control type="number" name="hoursService" onChange={() => { setIsEditing(true) }} />
            </Form.Group>
            <Form.Group controlId="costService-9">
              <Form.ControlLabel> <b>Estimated Cost of service</b> </Form.ControlLabel>
              <Form.Control type="number" name="costService" onChange={() => { setIsEditing(true) }} />
            </Form.Group>
            <Form.Group controlId="textarea-9">
              <Form.ControlLabel> <b>Comments</b> </Form.ControlLabel>
              <Form.Control rows={5} name="comments" />
            </Form.Group>
            <Form.Group controlId="employeesList-9">
              <Form.ControlLabel> <b>Assigned Employees</b> </Form.ControlLabel>

              <FormControl name="EmployeeListPicker" data={selectData} accepter={SelectPicker} style={{ width: 224, zIndex: 1000 }} onChange={(value) => onEmployeeListChange(value)} />
              <br />
              <br />
              <List>
                {
                  curEmployeeList ? (
                    curEmployeeList.map(employee => {
                      return (
                        <List.Item
                          key={employee.id}
                        >
                          <FlexboxGrid>
                            <FlexboxGrid.Item
                              style={{
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'left',
                                height: '30px',
                                width: '200px'
                              }}
                            >
                              {employee.name}
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                              style={{
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'left',
                                height: '30px'

                              }}
                            >
                              <IconButton icon={<i className="bi bi-x-circle"></i>} circle size="md" style={{ color: 'red', background: "#ffffff" }} onClick={() => removeEmployeeFromList(employee.id)} />
                            </FlexboxGrid.Item>
                          </FlexboxGrid>
                        </List.Item>
                      )
                    })
                  ) :
                    <List.Item > No Employees </List.Item>
                }
              </List>

              <br />



            </Form.Group>
            <Form.Group controlId="referencePhotosList-9">
              <Form.Group>
                {
                  //data.referencePhotosList ? <ImagesPreview imageList={data.referencePhotosList} curId={data.id} /> : <label>No image data</label>
                  <FileUpload
                    accept=".jpg,.png,.jpeg"
                    label="Add property reference photo(s)"
                    multiple
                    updateFilesCb={setReferencePhotosList}
                    maxFileSizeInBytes={400000}
                    filesFromApi={referencePhotosList}
                    fetchingImages={fetchingImages}
                    hasToFetch={showModalProperty}
                    dataChanged={setIsEditingPhotos}
                  />
                }
              </Form.Group>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary" color="violet" >
            Delete Property
          </Button>
          {
            editing ? (
              <>
                <Button onClick={handleClose} appearance="primary" color="orange">
                  Discard Changes
                </Button>
                <Button onClick={handleEdit} appearance="primary" color="green">
                  Save and exit
                </Button>
              </>
            )
              :
              <Button onClick={handleClose} appearance="primary" color="red" >
                Ok
              </Button>
          }

        </Modal.Footer>
      </Modal>
    </>

  )
}

