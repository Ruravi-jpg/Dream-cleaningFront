
import { useEffect } from "react";
import { useState, React } from "react";
import { Form, Button, Modal, Notification, useToaster} from 'rsuite';
import PropertyUpdateModel from "../../Models/EmplyeeUpdateModel";
import PropertyService from "../../Services/property.service";
import FileUpload from "../DragAndDrop/DragAndDrop";


export default function PropertyModal({fetchData, data, setData, showModalProperty, setShowModalProperty}){
  //modalState
  const [editing, setIsEditing]  = useState(false);
  const [editingPhotos, setIsEditingPhotos]  = useState(false);
  const [referencePhotosList, setReferencePhotosList] = useState([]);
  const [fetchingImages, setFetchingImages] = useState(true);

  const toaster = useToaster();

  useEffect(() =>{
    if(showModalProperty)
      fetchPhotos();
  },[showModalProperty])

  useEffect(() =>{
    if(fetchingImages === true)
        return;
    if(editingPhotos !== true)
      return;
    
      setIsEditing(true);
    
  }, [referencePhotosList])



  const fetchPhotos = async () =>{

    setFetchingImages(true);
    if(!data.referencePhotosList)
      return;

    let photoList = [];
    for(let guid of data.referencePhotosList){
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
    setShowModalProperty(false);
    setIsEditingPhotos(false);
    setIsEditing(false);
  }

  useEffect(() =>{
    console.log("kk");
    setIsEditing(true);
  },[editingPhotos])

  const handleEdit = async () =>{
    let update = new PropertyUpdateModel(data.name, data.lastName, data.streetAddress, data.refStreet1, data.refStreet2, data.comments)
    setShowModalProperty(false);
    setIsEditing(false);
    const postResponse = await PropertyService.put(update, data.id);

    if(postResponse){
        toaster.push(messageSuccess)  
    }else{
        toaster.push(messageError)  
    }
    fetchData();
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


    return(
        <>
        <Modal size={"md"} open={showModalProperty} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Property Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form fluid onChange={setData} formValue={data}>
            <Form.Group controlId="alias-9">
              <Form.ControlLabel>Property Alias</Form.ControlLabel>
              <Form.Control name="alias" onChange={() => {  setIsEditing(true)}}/>
            </Form.Group>
            <Form.Group controlId="address-9">
              <Form.ControlLabel>Property Address</Form.ControlLabel>
              <Form.Control name="address" onChange={() => {setIsEditing(true)} } />
            </Form.Group>
            <Form.Group controlId="btwnStreet1-9">
              <Form.ControlLabel>Reference Street 1</Form.ControlLabel>
              <Form.Control name="btwnStreet1" onChange={() => { setIsEditing(true)} }/>
            </Form.Group>
            <Form.Group controlId="btwnStreet2-9">
              <Form.ControlLabel>Reference Street 2</Form.ControlLabel>
              <Form.Control name="btwnStreet2" onChange={() => { setIsEditing(true)} }/>
            </Form.Group>
            <Form.Group controlId="hoursService-9">
              <Form.ControlLabel>Estimated Hours of service</Form.ControlLabel>
              <Form.Control type="number" name="hoursService" onChange={() => { setIsEditing(true)} }/>
            </Form.Group>
            <Form.Group controlId="costService-9">
              <Form.ControlLabel>Estimated Cost of service</Form.ControlLabel>
              <Form.Control type="number" name="costService" onChange={() => { setIsEditing(true)} }/>
            </Form.Group>
            <Form.Group controlId="textarea-9">
              <Form.ControlLabel>Comments</Form.ControlLabel>
              <Form.Control rows={5} name="comments" onChange={() => { setIsEditing(true)} }/>
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
                  filesFromApi = {referencePhotosList}
                  fetchingImages = {fetchingImages}
                  hasToFetch={showModalProperty}
                  dataChanged = {setIsEditingPhotos}
                  /> 
                }
              </Form.Group>
            </Form.Group>
            <Form.Group controlId="employeesList-9">
              <Form.ControlLabel>Assigned Employees</Form.ControlLabel>
              {/* <Form.Control name="employeesList" onChange={() => { setIsEditing(true)} }/> */}
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
{/* 
        <UserModal data={modalData} showModal={showModalUser} setShowModal={setShowModalUser} fetchData={fetchData} handleCloseProperty={handleClose}></UserModal>
         */}
        </>

    )
}

