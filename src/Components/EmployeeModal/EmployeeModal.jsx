
import { useEffect } from "react";
import { useState, React } from "react";
import { Form, Button, Modal, Notification, useToaster } from 'rsuite';
import EmployeeUpdateModel from "../../Models/EmplyeeUpdateModel";
import EmployeeService from "../../Services/employee.service";
import UserModal from "../UserModal/UserModal";

export default function EmployeeModal({fetchData, data, showModalEmployee, setShowModalEmployee}){

  //modalState
  const [editing, setIsEditing]  = useState(false);
  const [modalData, setModalData] = useState({name: "", lastName: "", streetAddress: "", refStreet1:"", refStreet2: "", comments:"", id: 0});

  const [showModalUser, setShowModalUser] = useState(false);

  const toaster = useToaster();

  useEffect(() =>{
    setModalData(data);
  },[data])


  const handleClose = () => {
    setShowModalEmployee(false);
    setIsEditing(false);
  }

  const handleOpenUser = () =>{
    setShowModalEmployee(false);
    setShowModalUser(true);
  }

  const handleEdit = async () =>{
    let update = new EmployeeUpdateModel(modalData.name, modalData.lastName, modalData.streetAddress, modalData.refStreet1, modalData.refStreet2, modalData.comments)
    setShowModalEmployee(false);
    setIsEditing(false);
    const postResponse = await EmployeeService.put(update, modalData.id);

    if(postResponse){
        toaster.push(messageSuccess)  
    }else{
        toaster.push(messageError)  
    }
    fetchData();
  }

  const messageSuccess = (
    <Notification type={"success"} header={"Success"} closable>
      <p>The Employee was edited successfully</p>
      <hr />
    </Notification>
  );

  const messageError = (
    <Notification type={"error"} header={"Error"} closable>
      <p>There was an error while editing the employee</p>
      <p>Try again. If the error persists please contact an administrator.</p>
      <hr />
    </Notification>
  );


    return(
        <>
        <Modal size={"md"} open={showModalEmployee} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Employee Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form fluid onChange={setModalData} formValue={modalData}>
            <Form.Group controlId="name-9">
              <Form.ControlLabel>Employee Name</Form.ControlLabel>
              <Form.Control name="name" onChange={() => {  setIsEditing(true)}}/>
            </Form.Group>
            <Form.Group controlId="address-9">
              <Form.ControlLabel>Employee Last Name</Form.ControlLabel>
              <Form.Control name="lastName" onChange={() => {setIsEditing(true)} } />
            </Form.Group>
            <Form.Group controlId="address-9">
              <Form.ControlLabel>Employee Address</Form.ControlLabel>
              <Form.Control name="streetAddress" onChange={() => { setIsEditing(true)} }/>
            </Form.Group>
            <Form.Group controlId="refStreet1-9">
              <Form.ControlLabel>Reference Street 1</Form.ControlLabel>
              <Form.Control name="refStreet1" onChange={() => { setIsEditing(true)} }/>
            </Form.Group>
            <Form.Group controlId="refStreet2-9">
              <Form.ControlLabel>Reference Street 2</Form.ControlLabel>
              <Form.Control name="refStreet2" onChange={() => { setIsEditing(true)} }/>
            </Form.Group>
            <Form.Group controlId="textarea-9">
              <Form.ControlLabel>Comments</Form.ControlLabel>
              <Form.Control rows={5} name="comments" onChange={() => { setIsEditing(true)} }/>
            </Form.Group>
            <Form.Group controlId="textarea-9">
              <Button onClick={() => {handleOpenUser()}} appearance="primary" color="blue">
                      See User Info
              </Button>
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={handleClose} appearance="primary" color="violet" >
                Delete Employee
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

        <UserModal data={modalData} showModal={showModalUser} setShowModal={setShowModalUser} fetchData={fetchData} handleCloseEmployee={handleClose}></UserModal>
        
        </>

    )
}

