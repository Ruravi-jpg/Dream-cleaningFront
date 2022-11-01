
import { useEffect } from "react";
import { useState, React } from "react";
import { Form, Button, Modal, Notification, useToaster } from 'rsuite';
import UserService from "../../Services/user.service";
import UserUpdateModel from "../../Models/UserUpdateModel";

export default function UserModal({data, showModal, setShowModal, fetchData}){


      //modalState
  const [editing, setIsEditing]  = useState(false);
  const [modalData, setModalData] = useState({id:0, username:"", role: "", password:""});


  const toaster = useToaster();

  useEffect(() =>{
    setModalData({id:0, username:"", role: "", password:""});
    setModalData(data.user);
  },[data])


  const handleClose = () => {
    fetchData();
    setShowModal(false);
    setIsEditing(false);
  }

  const handleEdit = async () =>{
    let update = new UserUpdateModel(modalData.username, modalData.password)
    setShowModal(false);
    setIsEditing(false);
    const postResponse = await UserService.put(update, modalData.id);

    if(postResponse){
        toaster.push(messageSuccess)  
    }else{
        toaster.push(messageError)  
    }
  }

  const messageSuccess = (
    <Notification type={"success"} header={"Success"} closable>
      <p>The user was edited successfully</p>
      <hr />
    </Notification>
  );

  const messageError = (
    <Notification type={"error"} header={"Error"} closable>
      <p>There was an error while editing the user</p>
      <p>Try again. If the error persists please contact an administrator.</p>
      <hr />
    </Notification>
  );




return(
    <>
    
    <Modal size={"md"} open={showModal} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Employee Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form fluid onChange={setModalData} formValue={modalData}>
            <Form.Group controlId="username-9">
              <Form.ControlLabel>Username</Form.ControlLabel>
              <Form.Control name="username" onChange={() => {  setIsEditing(true)}}/>
            </Form.Group>
            <Form.Group controlId="password-9">
              <Form.ControlLabel>New Password</Form.ControlLabel>
              <Form.Control name="password" onChange={() => {setIsEditing(true)} } />
            </Form.Group>
            
          </Form>
          </Modal.Body>
          <Modal.Footer>
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