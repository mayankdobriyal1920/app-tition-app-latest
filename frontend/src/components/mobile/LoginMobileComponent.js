import React from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {
    actionToGetUserByMobileNumber,
    actionToLoginUserByUserData,
    actionToOpenCloseLoginPopup, actionToSendOtpInMobileNumber, actionToSigninWithPassword,
    actionToVerifyUserOtpByMobileNumber,
} from "../../actions/CommonAction";
import {useEffect, useRef, useState} from "react";
import OTPInput from "react-otp-input";
let userDataForLogin = null;
const LoginMobileComponent=() => {
    const {isOpen} = useSelector((state) => state.openCloseLoginPopup);
    const dispatch = useDispatch();
    const [step,setStep] = useState(1);
    const [mobile,setMobile] = useState('');
    const [password,setPassword] = useState('');
    const [OTP, setOTP] = useState("");
    const [verifyData, setVerifyData] = useState(false);
    const [phoneNumberValidationError, setPhoneNumberValidationError] = useState('');
    const [passwordValidationError, setPasswordValidationError] = useState('');
    const [verifyDataLoader, setVerifyDataLoader] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const [headerTitle, setHeaderTitle] = useState("Login");
    const mobileNumberRef = useRef();

    const onEnterPressedInPassword = (e) =>{
        if(e.keyCode ===13){
            loginWithPassword();
        }
    }
    const loginWithPassword = () =>{
        setVerifyDataLoader(true);
        setPasswordValidationError('');
        dispatch(actionToSigninWithPassword(mobile,password,setVerifyDataLoader,setPasswordValidationError))
    }

    const callFunctionToOpenLoginPopup = ()=>{
        dispatch(actionToOpenCloseLoginPopup(false));
    }

    const goBackToStepOne = ()=>{
        setHeaderTitle('Login');
        setStep(1);
    }
    const validateFormAndGoNextStep = async (e)=>{
        e.preventDefault();
        if(!verifyDataLoader) {
            setPhoneNumberValidationError('');
            if (validateForm()) {
                setVerifyDataLoader(true);
                dispatch(actionToGetUserByMobileNumber(mobile)).then((data) => {
                    if (!data?.id) {
                        setPhoneNumberValidationError('Mobile number not exist!!');
                        setVerifyDataLoader(false);
                    } else {
                        userDataForLogin = data;
                        setHeaderTitle('Verify Account');
                        dispatch(actionToSendOtpInMobileNumber(mobile));
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
                dispatch(actionToVerifyUserOtpByMobileNumber(mobile,OTP)).then((data) => {
                    if(Number(data.status) === 1){
                        setVerifyData(true);
                        dispatch(actionToLoginUserByUserData(userDataForLogin));
                    }else{
                        setOtpError(true);
                    }
                })
            }
        }
    }
    const validateForm =()=>{
        if(!mobile?.trim()?.length){
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
        setMobile('');
        setOTP('');
        setVerifyData(false);
        setOtpError(false);
        setHeaderTitle('Login');
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
                            <div className="col-lg-12 col-md-12 mb-30">
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
                            <button type={"submit"}  className="theme_btn message_btn">
                                {verifyDataLoader ? 'Wait...' : 'Get Otp'}
                            </button>
                        </form>
                        :
                        <form onSubmit={validateFormAndGoNextStep} className="row gx-3 comments-form contact-form">
                            <div className="col-lg-12 col-md-12 mb-30 text-center">
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
                                <hr/>
                                <h4 className={"text-center"}>OR</h4>
                                <hr/>
                                <div className="col-lg-12 col-md-12 mb-30">
                                    <input type="password" placeholder="Password"
                                           onChange={(e)=>setPassword(e.target.value)}
                                           onKeyDown={(e)=>onEnterPressedInPassword(e)}
                                           value={password}
                                           required/>
                                </div>
                                {(passwordValidationError) ?
                                    <p className={"error"}>{passwordValidationError}</p>
                                    : ''
                                }
                                <button type={"button"} onClick={loginWithPassword}  className="theme_btn message_btn">
                                    {verifyDataLoader ? 'Wait...' : 'Login with password'}
                                </button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
};

export default LoginMobileComponent;
