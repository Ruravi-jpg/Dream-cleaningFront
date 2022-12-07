import EmployeeService from '../../Services/employee.service';


import logo from '../../Assets/mainPageImages/logodreamco-ConvertImage.png'
import styles from './registerProperty.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, TagPicker, Modal , Loader, Notification, useToaster} from 'rsuite';
import FileUpload from "../DragAndDrop/DragAndDrop"
import PropertyCreateModel from '../../Models/PropertyRegisterModel';
import PropertyService from '../../Services/property.service';
import getIdFromUrl from '../../Services/getIdFromUrl';



function RegisterProperty() {

    document.body.className = styles.body;

    const toaster = useToaster();

    const [propertyData, setPropertyData] = useState({
        alias: "",
        address: "",
        btwnStreet1: "",
        btwnStreet2: "",
        hoursService: 0,
        costService: 0,
        comments: "",
        referencePhotosList: [],
        employeeIdList: []
    });

    const [referencePhotosList, setReferencePhotosList] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [employeesList, setEmployeesList] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {

        setOpenModal(true);

        let Property = new PropertyCreateModel(propertyData);


        let resProp = await PropertyService.post(Property);
        setOpenModal(false);
        //if the property post was succesfull we can try to post the images
        if(resProp.status === 201){
            let propId = getIdFromUrl(resProp.headers.location);
            let resPhotos = await PropertyService.postPhotos(referencePhotosList, propId);
            if(resPhotos.status === 204){
                toaster.push(messageSuccess);  
            }else{
                toaster.push(messageErrorImage(resPhotos.response.data));
            }
        }else{
            toaster.push(messageErrorProperty(resProp.response.data));  
        }

    }

    useEffect(() =>{
        fetchData();
    },[])

    useEffect(() =>{
        let property = propertyData;

        property.referencePhotosList = referencePhotosList;

        setPropertyData(property);
    },[referencePhotosList])

    useEffect(() =>{
        let property = propertyData;

        property.employeeIdList = employeesList;
        setPropertyData(property);
    },[employeesList])

    const fetchData = async () => {
        await EmployeeService.GetAll()
        .then(res =>{
            const data = res.map(
                item => ({label: item.user.username, value: item.id})
            );
            setEmployeeData(data);        
        })
    }

    const onEmployeeListChange = (value) =>{
        if(value == null){
            setEmployeesList([])
            return;
        }
            

        const employeeId = value.filter(e => Number.isInteger(e));
        setEmployeesList(employeeId)
    }


    const messageSuccess = (
        <Notification type={"success"} header={"Success"} closable onClose={() => navigate("/dashboard")}>
          <p>The Property was added successfully</p>
          <hr />
        </Notification>
      );
    
      const messageErrorProperty = (message) => (
        <Notification type={"error"} header={"Error"} duration={10000}>
          <p>There was an error while adding the property</p>
          <p>Try again. If the error persists please contact an administrator.</p>
          <p>Error:</p>
          <p>{message}</p>
          <hr />
        </Notification>
      );

      const messageErrorImage = (message) =>(
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

            <div className='row'>
                <div className='col-lg-3'></div>
                <div className='col-lg-6'>
                    <div className='container-sm'>
                        <div className={styles.header}>
                            <img src={logo} alt="" />
                        </div>
                        <div className={styles.formWraper}>
                            <div className={"border border-4 border-danger rounded p-4 " + styles.registerForm}>
                            <h4 className={"mb-6 " + styles.formTitle}>Add a property</h4>
                            <hr className={styles.hr}></hr>
                                <Form onChange={setPropertyData} formValue={propertyData} onSubmit={handleFormSubmit}>
                                    {/* Input type text */}
                                    <div className={"form-group col-md " + styles.oneColumnInput + " " + styles.formRow}>
                                        <Form.ControlLabel htmlFor="palias">Alias</Form.ControlLabel>
                                        <Form.Control
                                            type="text"
                                            className={"form-control " + styles.registerInput} 
                                            name="alias"
                                            id="palias"
                                            required />
                                    </div>
                                    {/* Input type text */}
                                    <div className={"form-group col-md " + styles.oneColumnInput + " " + styles.formRow}>
                                        <Form.ControlLabel htmlFor="paddress">Address</Form.ControlLabel>
                                        <Form.Control
                                            type="text"
                                            className={"form-control " + styles.registerInput} 
                                            name="address"
                                            id="paddress"
                                            required />
                                    </div>
                                    {/* columns */}
                                    <div className="form-group">
                                        <div className={"row align-items-center " + styles.formRow}>
                                            <div className="col-md-6 mb-3">
                                                {/* Input type text */}
                                                <Form.ControlLabel htmlFor="pbtwnStreet1">Between Street 1</Form.ControlLabel>
                                                <Form.Control
                                                    type="text"
                                                    className={"form-control " + styles.registerInput} 
                                                    name="btwnStreet1"
                                                    id="pbtwnStreet1"
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                {/* Input type text */}
                                                <Form.ControlLabel htmlFor="pbtwnStreet2">Between Street 2</Form.ControlLabel>
                                                <Form.Control
                                                    type="text"
                                                    className={"form-control " + styles.registerInput} 
                                                    name="btwnStreet2"
                                                    id="pbtwnStreet2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* columns */}
                                    <div className="form-group">
                                        <div className={"row align-items-center " + styles.formRow}>
                                            <div className="col-md-6 mb-3">
                                                {/* Input type text */}
                                                <Form.ControlLabel htmlFor="phoursService">Estimated hours of service</Form.ControlLabel>
                                                <Form.Control
                                                    type="number"
                                                    className={"form-control " + styles.registerInput} 
                                                    name="hoursService"
                                                    id="phoursService"
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                {/* Input type text */}
                                                <Form.ControlLabel htmlFor="pcostService">Cost of service</Form.ControlLabel>
                                                <Form.Control
                                                    type="number"
                                                    className={"form-control " + styles.registerInput} 
                                                    name="costService"
                                                    id="pcostService"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* textarea */}
                                    <div className={"form-group col-md " + styles.oneColumnInput}>
                                        <Form.ControlLabel htmlFor="pcomments">Comments</Form.ControlLabel>
                                        <Form.Control
                                            className={"form-control " + styles.registerInput} 
                                            rows={3}
                                            name="comments"
                                            id="pcomments"

                                        />
                                    </div>
                                    <hr className={styles.hr}></hr>
                                        <div className={"form-group col-md " + styles.oneColumnInput}>
                                            <div>
                                                <Form.ControlLabel htmlFor="employees">Select the employees to add to this property </Form.ControlLabel>
                                                <br />
                                                <TagPicker 
                                                className={"form-control " + styles.registerInput} 
                                                data={employeeData} 
                                                style={{ width: 300 }} 
                                                onChange={(value, event) => {  onEmployeeListChange(value);/*setEmployeesList(value)*/}}
                                                
                                                />
                                            </div>
                                        </div>
                                    <hr className={styles.hr}></hr>
                                    {/* Input type file */}
                                    <div className="form-group">
                                        <FileUpload
                                            accept=".jpg,.png,.jpeg"
                                            label="Add property reference photo(s)"
                                            multiple
                                            updateFilesCb={setReferencePhotosList}
                                            maxFileSizeInBytes={400000}
                                        />
                                    </div>
                                    <hr className={styles.hr}></hr>
                                    <div className='col text-center'>
                                    <button
                                        type="submit"
                                        className={"btn " + styles.SubmitButton}
                                        name="save-property"
                                        id="save-property">Save</button>
                                    </div>
                                    
                                </Form>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='col-lg-3'></div>

            </div>






            <Modal backdrop={"static"} size="sm" open={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <Modal.Title>
          <div style={{ textAlign: 'center' }}>
              Adding property
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style={{ textAlign: 'center' }}>
              <Loader size="lg" />
            </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>


        </>


    );
}

export default RegisterProperty