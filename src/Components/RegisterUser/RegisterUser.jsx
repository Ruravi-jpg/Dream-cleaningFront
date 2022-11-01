
import UserCreateModel from '../../Models/UserCreateModel';
import EmployeeCreateModel from '../../Models/EmployeeRegisterModel';
import EmployeeService from '../../Services/employee.service';


import logo from '../../Assets/mainPageImages/logodreamco-ConvertImage.png'
import styles from './registerUser.module.css'
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';



function RegisterUser() {

const [name, setName] = useState("");
const [lastName, setLastName] = useState("");
const [username, setUserName] = useState("");
const [password, setPassword] = useState("");
const [Address, setAddres] = useState("");
const [street1, setStreet1] = useState("");
const [street2, setStreet2] = useState("");
const [comment, setComment] = useState("");

const navigate = useNavigate();

const handleSubmit = (event) => {
    event.preventDefault();
    //alert(`The name you entered was: ${name}`)
    
    let UserModel = new UserCreateModel(username, password);
    let Employee = new EmployeeCreateModel(name, lastName, Address, street1, street2, comment, UserModel);

    EmployeeService.post(Employee);

    navigate("/dashboard");
  }


    document.body.className = styles.body;
    return (

        <div className='row'>
            <div className='col-lg-3'></div>
            <div className='col-lg-6'>
            <div className="container-sm">
            <div className={styles.header}>
                <img src={logo} alt="" />
            </div>
            <div className={styles.formWraper}>
                <div className={"border border-4 border-danger rounded p-4 " + styles.registerForm}>
                    <h4 className={"mb-6 " + styles.formTitle}>Add an employee</h4>
                    <hr className={styles.hr}></hr>
                    <form onSubmit={handleSubmit}>
                        {/* columns */}
                        <div className="form-group">
                            <div className={"row " + styles.formRow}>
                                <div className="col-md-6">
                                    {/* Input type text */}
                                    <label htmlFor="name">Name</label>
                                    <input
                                     type="text"
                                     className={"form-control " + styles.registerInput} 
                                     name="name" 
                                     id="name" 
                                     placeholder="Name" 
                                     value={name}
                                     onChange = { e => setName(e.target.value)}
                                     required />
                                </div>
                                <div className="col-md-6">
                                    {/* Input type text */}
                                    <label htmlFor="lastName">Last name</label>
                                    <input 
                                    type="text" 
                                    className={"form-control " + styles.registerInput} 
                                    name="lastName" 
                                    id="lastName" 
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange = { e => setLastName(e.target.value)}
                                    required />
                                </div>
                            </div>

                            
                        </div>
                        {/* columns */}
                        <div className="form-group">
                            <div className={"row align-items-center " + styles.formRow}>
                                <div className="col-md-6 mb-6">
                                    {/* Input type text */}
                                    <label htmlFor="username">Username</label>
                                    <input 
                                    type="text" 
                                    className={"form-control " + styles.registerInput} 
                                    name="username" 
                                    id="username" 
                                    placeholder="Username"
                                    value={username}
                                    onChange = { e => setUserName(e.target.value)} 
                                    required />
                                    <small className="text-muted form-text">The username the employee is going to use to login</small>
                                </div>
                                <div className="col-md-6 mb-6">
                                    {/* Input type text */}
                                    <label htmlFor="password">Password</label>
                                    <input 
                                    type="text" 
                                    className={"form-control " + styles.registerInput} 
                                    name="password" 
                                    id="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange = { e => setPassword(e.target.value)} 
                                    required />
                                    <small className="text-muted form-text">The password the employee is going to use to login</small>
                                </div>
                            </div>
                        </div>
                        {/* Input type text */}
                        <div className={"form-group col-md " + styles.oneColumnInput + " " + styles.formRow}>
                            <label htmlFor="address">Address</label>
                            <input 
                            type="text" 
                            className={"form-control " + styles.registerInput} 
                            name="address" 
                            id="address" 
                            placeholder="Address"
                            value={Address}
                            onChange = { e => setAddres(e.target.value)} 
                            required />
                        </div>
                        {/* columns */}
                        <div className="form-group">
                            <div className={"row align-items-center " + styles.formRow}>
                                <div className="col-md-6 mb-6">
                                    {/* Input type text */}
                                    <label htmlFor="street1">Street 1</label>
                                    <input 
                                    type="text" 
                                    className={"form-control " + styles.registerInput} 
                                    name="street1" 
                                    id="street1" 
                                    placeholder="Street 1"
                                    value={street1}
                                    onChange = { e => setStreet1(e.target.value)} 
                                    required />
                                </div>
                                <div className="col-md-6 mb-6">
                                    {/* Input type text */}
                                    <label htmlFor="street2">Street 2</label>
                                    <input 
                                    type="text" 
                                    className={"form-control " + styles.registerInput} 
                                    name="street2" 
                                    id="street2" 
                                    placeholder="Street 2"
                                    value={street2}
                                    onChange = { e => setStreet2(e.target.value)}
                                    required />
                                </div>
                            </div>
                        </div>
                        {/* textarea */}
                        <div className={"form-group col-md " + styles.oneColumnInput}>
                            <label htmlFor="comments">Comments</label>
                            <textarea 
                            className={"form-control " + styles.registerInput} 
                            rows={2} name="comments" 
                            id="comments" 
                            defaultValue={""}
                            value={comment}
                            onChange = { e => setComment(e.target.value)}
                            />
                        </div>
                        <br></br>
                        <hr className={styles.hr}></hr>
                        <div className="row">
                                <div className="col text-center">
                                    <button type="submit" className={"btn " + styles.SubmitButton} name="button_id_30" id="button_id_30">submit</button>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            </div>
            <div className='col-lg-3'></div>

        </div>

        



    );
}

export default RegisterUser