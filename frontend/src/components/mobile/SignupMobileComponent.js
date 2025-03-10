import React from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {
    actionToGetUserByMobileNumber,
    actionToLoginUserByUserData,
    actionToOpenCloseSignupPopup,
    actionToSendOtpInMobileNumber,
    actionToVerifyUserSignUpOtpByMobileNumber
} from "../../actions/CommonAction";
import {useEffect, useRef, useState} from "react";
import OTPInput from "react-otp-input";
import {_generateUniqueId} from "../../helper/CommonHelper";
const DesktopSignUpComponent=() => {
    const {isOpen} = useSelector((state) => state.openCloseSignupPopup);
    const dispatch = useDispatch();
    const [step,setStep] = useState(1);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [mobile,setMobile] = useState('');
    const [password,setPassword] = useState('');
    const [address,setAddress] = useState('');
    const [OTP, setOTP] = useState("");
    const [verifyData, setVerifyData] = useState(false);
    const [phoneNumberValidationError, setPhoneNumberValidationError] = useState('');
    const [verifyDataLoader, setVerifyDataLoader] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const [headerTitle, setHeaderTitle] = useState("Create account");
    const mobileNumberRef = useRef();

    const callFunctionToOpenSighupPopup = ()=>{
        dispatch(actionToOpenCloseSignupPopup(false));
    }

    const goBackToStepOne = ()=>{
        setHeaderTitle('Create account');
        setStep(1);
    }
    const validateFormAndGoNextStep = async (e)=>{
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
                        dispatch(actionToSendOtpInMobileNumber(mobile));
                        setHeaderTitle('Verify Account');
                        setStep(2);
                        setVerifyDataLoader(false);
                    }
                })
            }
        }
        return false;
    }
    const handleChange =(OTP)=>{
        setOTP(OTP);
        setOtpError(false);
        if(!verifyData) {
            if (OTP.length === 6) {
                let payload = {
                    id: _generateUniqueId(),
                    name,
                    email,
                    address,
                    mobile,
                    password,
                    role:1,
                    has_profile:0,
                }
                dispatch(actionToVerifyUserSignUpOtpByMobileNumber(payload,mobile, OTP)).then((data) => {
                    if (Number(data.status) === 1) {
                        setVerifyData(true);
                        setVerifyData(true);
                        dispatch(actionToLoginUserByUserData(data));
                    } else {
                        setOtpError(true);
                    }
                })
            }
        }
    }
    const validateForm =()=>{
        if(!name?.trim()?.length){
            return false;
        }else if(!email?.trim()?.length){
            return false;
        }else if(!mobile?.trim()?.length){
            return false;
        }else if(!password?.trim()?.length){
            return false;
        }else if(!address?.trim()?.length){
            return false;
        }else if(mobile?.trim()?.length < 10) {
            setPhoneNumberValidationError('Please enter valid mobile number!!')
            setVerifyDataLoader(false);
            return false;
        }
        return true;
    }

    const resetForm = ()=>{
        setStep(1);
        setName('');
        setEmail('');
        setMobile('');
        setPassword('');
        setAddress('');
        setOTP('');
        setVerifyData(false);
        setOtpError(false);
        setHeaderTitle('Create account');
        setVerifyDataLoader(false);
        setPhoneNumberValidationError('')
    }

    useEffect(()=>{
        if(isOpen){
            resetForm();
        }
    },[isOpen])

    return (
        <div className={"main_signup_component_body_mobile mt-40"} >
            <div className={"popup_heder_main_heading"}>{headerTitle}</div>
            <div className="main_signup_component_body_inner">
                <div className="contact-form-wrapper mb-30">
                    {(step === 1) ?
                        <form onSubmit={(e)=>validateFormAndGoNextStep(e)} className="row gx-3 comments-form contact-form">
                            <div className="col-lg-6 col-md-6 mb-30">
                                <input type="text" placeholder="Full Name"
                                       onChange={(e)=>setName(e.target.value)}
                                       value={name}
                                       required/>
                            </div>
                            <div className="col-lg-6 col-md-6 mb-30">
                                <input type="text" placeholder="Email Address"
                                       onChange={(e)=>setEmail(e.target.value)}
                                       value={email}
                                       required/>
                            </div>
                            <div className="col-lg-6 col-md-6 mb-30">
                                {(phoneNumberValidationError) ?
                                    <p className={"error"}>{phoneNumberValidationError}</p>
                                    : ''
                                }
                                <input type="text" placeholder="Phone Number"
                                       onChange={(e)=>setMobile(e.target.value)}
                                       onKeyDown={()=>setPhoneNumberValidationError('')}
                                       ref={mobileNumberRef}
                                       value={mobile}
                                       required/>
                            </div>
                            <div className="col-lg-6 col-md-6 mb-30">
                                <input type="password" placeholder="Password"
                                       onChange={(e)=>setPassword(e.target.value)}
                                       value={password}
                                       required/>
                            </div>

                            <div className="col-lg-12 mb-30">
                                    <textarea name="commnent"
                                              id="commnent"
                                              onChange={(e)=>setAddress(e.target.value)}
                                              value={address}
                                              placeholder="Full Address"></textarea>
                            </div>
                            <button type={"submit"}  className="theme_btn message_btn">
                                {verifyDataLoader ? 'Wait...' : 'Submit'}
                            </button>
                        </form>
                        :
                        <form onSubmit={validateFormAndGoNextStep} className="row gx-3 comments-form contact-form">
                            <div className="col-lg-12">
                                <p>An OTP has been sent to your entered mobile number ({mobile}) <a onClick={goBackToStepOne} className={"theme_color"} role={"button"}>Edit Number</a></p>
                            </div>
                            <div className="col-lg-12">
                                {(otpError) ?
                                    <p className={"error"}>Otp not valid please try again!!</p>
                                    : ''
                                }
                                <OTPInput
                                    onChange={handleChange}
                                    value={OTP}
                                    inputStyle="otp_input_main"
                                    numInputs={6}
                                    separator={<span className={"sapater_otp"}></span>}
                                />
                                {(verifyData) ?
                                    <p className={"theme_color mt-10"}>Please wait!! Verifying your one time password...</p>
                                    :
                                    <>
                                        <p>Didn't receive the code?</p>
                                        <p><a className={"theme_color"} role={"button"}>Resend</a></p>
                                    </>
                                }
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
};

export default DesktopSignUpComponent;
