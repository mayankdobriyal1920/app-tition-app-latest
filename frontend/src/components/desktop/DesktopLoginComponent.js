import React from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {
    actionToGetUserByMobileNumber, actionToLoginUserByUserData, actionToOpenCloseLoginPopup,
} from "../../actions/CommonAction";
import {useEffect, useRef, useState} from "react";
import OTPInput from "react-otp-input";
let userOtp = 123456;
let userDataForLogin = null;
const DesktopLoginComponent=() => {
    const {isOpen} = useSelector((state) => state.openCloseLoginPopup);
    const dispatch = useDispatch();
    const [step,setStep] = useState(1);
    const [mobile,setMobile] = useState('');
    const [OTP, setOTP] = useState("");
    const [verifyData, setVerifyData] = useState(false);
    const [phoneNumberValidationError, setPhoneNumberValidationError] = useState('');
    const [verifyDataLoader, setVerifyDataLoader] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const [headerTitle, setHeaderTitle] = useState("Login");
    const mobileNumberRef = useRef();

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
                        userOtp = 123456;
                        console.log('userOtp',userOtp)
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
                if (Number(OTP) === Number(userOtp)) {
                    setVerifyData(true);
                    dispatch(actionToLoginUserByUserData(userDataForLogin));
                } else {
                    setOtpError(true);
                }
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
        <div style={{display:isOpen ? 'flex' : 'none'}}
             id={"main_signup_component"}
             className={"main_signup_component"}>
            <div className={"main_signup_component_body"} >
                <div className={"popup_header_style"}>
                    <div className={"popup_heder_main_heading"}>{headerTitle}</div>
                    <div onClick={callFunctionToOpenLoginPopup} className={"cancel_button"}><div>X</div></div>
                </div>
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
                                <div className="col-lg-12 col-md-12 otp_container">
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
                                            <p className={"mt-15"}>Didn't receive the code?</p>
                                            <p><a className={"theme_color"} role={"button"}>Resend</a></p>
                                        </>
                                    }
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopLoginComponent;
