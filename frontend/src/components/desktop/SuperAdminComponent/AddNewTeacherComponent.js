import React from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {
    actionToCreateTeacherProfile,
    actionToCreateUserSignupRequest,
    actionToGetUserByMobileNumber,
    actionToOpenCloseSignupPopup
} from "../../../actions/CommonAction";
import {useEffect, useRef, useState} from "react";
import OTPInput from "react-otp-input";
import {_generateUniqueId} from "../../../helper/CommonHelper";
import Multiselect from 'multiselect-react-dropdown';


const allTeacherClassesList = [
    {id:6,name:'6th'},
    {id:7,name:'7th'},
    {id:8,name:'8th'},
    {id:9,name:'9th'},
    {id:10,name:'10th'},
    {id:11,name:'11th'},
    {id:12,name:'12th'}
];
const AddNewTeacherComponent=() => {
    const allSubjectDataList = useSelector((state) => state.allSubjectDataList.subjectData);
    const dispatch = useDispatch();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [teacherClass,setTeacherClass] = useState([]);
    const [mobile,setMobile] = useState('');
    const [password,setPassword] = useState('');
    const [highestQualification,setHighestQualification] = useState('');
    const [subjects,setSubjects] = useState([]);
    const [address,setAddress] = useState('');
    const [schoolBoard,setSchoolBoard] = useState('');
    const [phoneNumberValidationError, setPhoneNumberValidationError] = useState('');
    const [verifyDataLoader, setVerifyDataLoader] = useState(false);
    const [dataAddedSuccess, setDataAddedSuccess] = useState(false);
    const schoolBoardData = useSelector((state) => state.allSchoolBoardDataList.boardData);

    const onSubjectSelect = (selectedList)=>{
        setSubjects(selectedList);
    }
    const onTeacherClassSelect = (selectedList)=>{
        setTeacherClass(selectedList);
    }

    const validateAndSubmitTeacherUserForm = async (e)=>{
        e.preventDefault();
        if(!verifyDataLoader) {
            setPhoneNumberValidationError('');
            if (validateForm()) {
                setVerifyDataLoader(true);
                dispatch(actionToGetUserByMobileNumber(mobile)).then((data) => {
                    if (data?.id) {
                        setPhoneNumberValidationError('Mobile number already exist please try with another!!');
                        setVerifyDataLoader(false);
                    } else {
                        saveTeacherDataForm();
                    }
                })
            }
        }
        return false;
    }


    const saveTeacherDataForm =()=>{
        let payload = {
            id: _generateUniqueId(),
            name,
            email,
            address,
            mobile,
            password,
            role:2,
            has_profile:0,
            board:schoolBoard,
            highest_qualification:highestQualification,
            subjects:subjects,
            teacherClass:teacherClass,
        }
        dispatch(actionToCreateTeacherProfile(payload));
        setDataAddedSuccess(true);
        setTimeout(function (){
            setDataAddedSuccess(false);
        },4000)
        resetForm();
    }

    const validateForm =()=>{
        console.log( name, email, address, mobile, password,schoolBoard,highestQualification,subjects,teacherClass);

        if(!name?.trim()?.length){
            return false;
        }else if(!email?.trim()?.length){
            return false;
        }else if(!mobile?.trim()?.length){
            return false;
        }else if(!password?.trim()?.length){
            return false;
        }else if(teacherClass?.length === 0){
            return false;
        }else if(!address?.trim()?.length){
            return false;
        }else if(!schoolBoard){
            return false;
        }else if(!highestQualification?.trim()?.length){
            return false;
        }else if(subjects?.length === 0){
            return false;
        }else if(mobile?.trim()?.length < 10) {
            setPhoneNumberValidationError('Please enter valid mobile number!!')
            setVerifyDataLoader(false);
            return false;
        }
        return true;
    }

    const resetForm = ()=>{
        setName('');
        setEmail('');
        setMobile('');
        setSchoolBoard('');
        setPassword('');
        setAddress('');
        setHighestQualification('');
        setSubjects([]);
        setTeacherClass([]);
        setVerifyDataLoader(false);
        setPhoneNumberValidationError('')
    }


    return (
        <div className="content">
            <div className="container-fluid pt-4 px-4 mt-20">
                <form onSubmit={(e)=>validateAndSubmitTeacherUserForm(e)} className="row gx-3 comments-form contact-form">
                  <div className="row g-4">
                      {(dataAddedSuccess) && (
                          <div className={"success_add_div"}>Teacher added successfully</div>
                      )}
                    <div className="">
                        <div className="bg-light rounded h-100 p-4">
                            <h3 className="mb-4">Add New Teacher</h3>
                            <div className="row g-4">
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input type="text"
                                               value={name}
                                               onChange={(e)=>setName(e.target.value)}
                                               className="form-control" id="floatingName" placeholder="John doe" required/>
                                        <label htmlFor="floatingName">Full Name</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input type="email"
                                               value={email}
                                               onChange={(e)=>setEmail(e.target.value)}
                                               className="form-control" id="floatingEmail" placeholder="name@example.com" required/>
                                        <label htmlFor="floatingEmail">Email address</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        {(phoneNumberValidationError) ?
                                            <p className={"error"}>{phoneNumberValidationError}</p>
                                            : ''
                                        }
                                        <input type="phone"
                                               value={mobile}
                                               onChange={(e)=>setMobile(e.target.value)}
                                               className="form-control" id="floatingMobile" placeholder="999 999 9999" required/>
                                        <label htmlFor="floatingEmail">Mobile Number</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input type="text"
                                               value={highestQualification}
                                               onChange={(e)=>setHighestQualification(e.target.value)}
                                               className="form-control" id="floatingQualification" placeholder="MA" required/>
                                        <label htmlFor="floatingQualification">Highest Qualification</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <select
                                    onChange={(e)=>setSchoolBoard(e.target.value)}
                                    className="form-select" id="floatingSelect" aria-label="Floating label select example" required>
                                    <option value={""}>Select school board</option>
                                    {(schoolBoardData?.map((board,key)=>(
                                        <option key={key} value={board?.id}>{board?.name}</option>
                                    )))}
                                </select>
                                <label htmlFor="floatingSelect">School board</label>
                            </div>
                            <div className="row g-4">
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <Multiselect
                                            className="multiple_select_input form-select"
                                            placeholder={"Select multiple classes"}
                                            required={true}
                                            id="floatingClass"
                                            aria-label="Floating label select example"
                                            options={allTeacherClassesList} // Options to display in the dropdown
                                            selectedValues={teacherClass} // Preselected value to persist in dropdown
                                            onSelect={onTeacherClassSelect} // Function will trigger on select event
                                            onRemove={onTeacherClassSelect} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <Multiselect
                                            className="multiple_select_input form-select"
                                            placeholder={"Select multiple subjects"}
                                            required={true}
                                            id="floatingSubject" aria-label="Floating label select example"
                                            options={allSubjectDataList} // Options to display in the dropdown
                                            selectedValues={subjects} // Preselected value to persist in dropdown
                                            onSelect={onSubjectSelect} // Function will trigger on select event
                                            onRemove={onSubjectSelect} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                       value={password}
                                       onChange={(e)=>setPassword(e.target.value)}
                                       className="form-control" id="floatingPassword" placeholder="Password" required/>
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating">
                                <textarea className="form-control"
                                          value={address}
                                          onChange={(e)=>setAddress(e.target.value)}
                                          placeholder="Enter full address"
                                          id="floatingTextarea"
                                          style={{height: "150px"}} required>
                                </textarea>
                                <label htmlFor="floatingTextarea">Full Address</label>
                            </div>
                            <button type="submit" className="btn btn-primary mt-30">
                                {(verifyDataLoader) ? 'Saving...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                  </div>
                </form>
            </div>
        </div>
        // <div className="main_signup_component_body_inner">
        //     <div className="contact-form-wrapper mb-30">
        //         {(step === 1) ?
        //             <form onSubmit={(e)=>validateFormAndGoNextStep(e)} className="row gx-3 comments-form contact-form">
        //                 <div className="col-lg-4 col-md-4 mb-30">
        //                     <input type="text" placeholder="Full Name"
        //                            onChange={(e)=>setName(e.target.value)}
        //                            value={name}
        //                            required/>
        //                 </div>
        //                 <div className="col-lg-4 col-md-4 mb-30">
        //                     <input type="text" placeholder="Email Address"
        //                            onChange={(e)=>setEmail(e.target.value)}
        //                            value={email}
        //                            required/>
        //                 </div>
        //                 <div className="col-lg-4 col-md-4 mb-30">
        //                     {(phoneNumberValidationError) ?
        //                         <p className={"error"}>{phoneNumberValidationError}</p>
        //                         : ''
        //                     }
        //                     <input type="text" placeholder="Phone Number"
        //                            onChange={(e)=>setMobile(e.target.value)}
        //                            onKeyDown={()=>setPhoneNumberValidationError('')}
        //                            ref={mobileNumberRef}
        //                            value={mobile}
        //                            required/>
        //                 </div>
        //                 <div className="col-lg-4 col-md-4 mb-30">
        //                     <input type="password" placeholder="Password"
        //                            onChange={(e)=>setPassword(e.target.value)}
        //                            value={password}
        //                            required/>
        //                 </div>
        //                 <div className="col-lg-4 col-md-4 mb-30">
        //                     <input type="password" placeholder="Confirm Password"
        //                            required/>
        //                 </div>
        //                 <div className="col-lg-4 col-md-4 mb-30">
        //                     <input type="text" placeholder="Highest Qualification"
        //                            onChange={(e)=>setHighestQualification(e.target.value)}
        //                            required/>
        //                 </div>
        //                 <div className="col-lg-4 col-md-4 mb-30">
        //                     <input type="text" placeholder="Medium of Education"
        //                            onChange={(e)=>setEducationMedium(e.target.value)}
        //                            required/>
        //                 </div>
        //                 <div className="col-lg-4 col-md-4 mb-30">
        //                     <Multiselect
        //                         className="multiple_select_input"
        //                         placeholder={"Select multiple subjects"}
        //                         options={subjectListArray} // Options to display in the dropdown
        //                         selectedValues={subjects} // Preselected value to persist in dropdown
        //                         onSelect={onSubjectSelect} // Function will trigger on select event
        //                         onRemove={onSubjectRemove} // Function will trigger on remove event
        //                         displayValue="name" // Property name to display in the dropdown options
        //                     />
        //                 </div>
        //                 <div className="col-lg-4 col-md-4 mb-30">
        //                     <input type="text" placeholder="Experience"
        //                            onChange={(e)=>setExperience(e.target.value)}
        //                            required/>
        //                 </div>
        //
        //                 <div className="col-lg-12 mb-30">
        //                             <textarea name="commnent" id="commnent" cols="30" rows="10"
        //                                       onChange={(e)=>setAddress(e.target.value)}
        //                                       value={address}
        //                                       placeholder="Full Address"></textarea>
        //                 </div>
        //                 <button type={"submit"}  className="theme_btn message_btn">
        //                     {verifyDataLoader ? 'Wait...' : 'Submit'}
        //                 </button>
        //             </form>
        //             :
        //             <form onSubmit={validateFormAndGoNextStep} className="row gx-3 comments-form contact-form">
        //                 <div className="col-lg-12 col-md-12 mb-30 text-center">
        //                     <p>An OTP has been sent to your entered mobile number ({mobile}) <a onClick={goBackToStepOne} className={"theme_color"} role={"button"}>Edit Number</a></p>
        //                 </div>
        //                 <div className="col-lg-12 col-md-12 otp_container">
        //                     {(otpError) ?
        //                         <p className={"error"}>Otp not valid please try again!!</p>
        //                         : ''
        //                     }
        //                     <OTPInput
        //                         onChange={handleChange}
        //                         value={OTP}
        //                         inputStyle="otp_input_main"
        //                         numInputs={6}
        //                         separator={<span className={"sapater_otp"}></span>}
        //                     />
        //                     {(verifyData) ?
        //                         <p className={"theme_color mt-10"}>Please wait!! Verifying your one time password...</p>
        //                         :
        //                         <>
        //                             <p>Didn't receive the code?</p>
        //                             <p><a className={"theme_color"} role={"button"}>Resend</a></p>
        //                         </>
        //                     }
        //                 </div>
        //             </form>
        //         }
        //     </div>
        // </div>
    );
};

export default AddNewTeacherComponent;
