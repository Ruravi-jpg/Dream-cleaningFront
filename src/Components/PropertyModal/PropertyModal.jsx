
import { useEffect } from "react";
import { useState, React } from "react";
import { Form, Button, Modal, Notification, useToaster} from 'rsuite';
import PropertyUpdateModel from "../../Models/PropertyUpdateModal";
import PropertyService from "../../Services/property.service";
import FileUpload from "../DragAndDrop/DragAndDrop";


export default function PropertyModal({ fetchData, data, setData, showModalProperty, setShowModalProperty, allEmployeeList }) {
  //modalState
  const [editing, setIsEditing] = useState(false);
  const [editingPhotos, setIsEditingPhotos] = useState(false);
  const [referencePhotosList, setReferencePhotosList] = useState([]);
  const [fetchingImages, setFetchingImages] = useState(true);
  const [propertyData, setPropertyData] = useState({});
  const toaster = useToaster();


  let selectData = allEmployeeList.map(
    item => ({ label: item.user.username, value: item.id })
  )

  useEffect(() => {
    if (showModalProperty) {
      fetchPhotos();
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
    if (!data.referencePhotosList){
      setFetchingImages(false);
      return;
    }
      

    let photoList = [];
    for (let guid of data.referencePhotosList) {
      let photo = await PropertyService.getPhotos(data.id, guid);
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

  const handleClose = () => {
    setIsEditingPhotos(false);
    setShowModalProperty(false);
    setIsEditing(false);
  }


  const handleEdit = async () => {
    let update = new PropertyUpdateModel(
      propertyData.alias,
      propertyData.address,
      propertyData.btwnStreet1,
      propertyData.btwnStreet2,
      propertyData.hoursService,
      propertyData.costService,
      propertyData.comments
    )
    

    //if we are only editing th data and not the images
    if (!editingPhotos) {
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

