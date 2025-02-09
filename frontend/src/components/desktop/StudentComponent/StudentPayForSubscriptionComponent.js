import React, {useState} from "react";
import {useSelector} from "react-redux"
import PaymentPopupComponent from "./PaymentPopupComponent";
import {_getClassWisePaymentData} from "../../../helper/CommonHelper";

export default function StudentPayForSubscriptionComponent({isEnd}){
    const {classData} = useSelector((state) => state.studentAllClassesList);
    const [openClosePaymentPopup,setOpenClosePaymentPopup] = useState(false);
    const [amountToPay,setAmountToPay] = useState(false);
    const [totalMonths,setTotalMonths] = useState(1);

    const setAmountAndOpenPaymentPopup = (amount)=>{
        setOpenClosePaymentPopup(true);
        setAmountToPay(amount);
    }

    return (
        <div className={"student_pay_for_subscription_main_page"}>
            <h1>Subscription plan</h1>
            {isEnd ?
                <h3>Your previous subscription plan is ended please purchase to continue services!!</h3>
                :
                <p className={"mb-10"}>Please purchase subscription to continue.</p>
            }
            <h2 className={"mb-10"}>Subscription details :-</h2>
            <h3 className={"mb-10"}>Total Classes({classData?.profile_subject_with_batch?.length})</h3>
            <div className={"classes_section"}>
                {(classData?.profile_subject_with_batch?.map((userSubjectData,key)=>(
                    <div key={key} className={"classes_section_loop"}>
                        <p><span>Name : </span>{userSubjectData?.subject_name}</p>
                        <p><span>Class : </span>{classData?.student_class}th</p>
                        <p><span>Course fee : </span>Rs {_getClassWisePaymentData(classData?.student_class,classData?.batch)}</p>
                    </div>
                )))}
            </div>
            <div className={"classes_section_total_payable month"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h3>Total month : </h3>
                    </div>
                    <div className={"col"}>
                        <select onChange={(e)=>setTotalMonths(Number(e.target.value))} className={"total_month_input_select"}>
                            <option value={1}>1 Month</option>
                            <option value={3}>3 Months</option>
                            <option value={6}>6 Months</option>
                            <option value={12}>12 Months</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={"classes_section_total_payable"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h3>Total amount : Rs {_getClassWisePaymentData(classData?.student_class,classData?.batch) * classData?.profile_subject_with_batch?.length * totalMonths}</h3>
                    </div>
                    <div className={"col"}>
                        <button onClick={()=>setAmountAndOpenPaymentPopup(_getClassWisePaymentData(classData?.student_class,classData?.batch) * classData?.profile_subject_with_batch?.length * totalMonths,totalMonths)} className={"theme_btn pay_button"}>
                            Make Payment
                        </button>
                    </div>
                </div>
            </div>
            {(openClosePaymentPopup) ?
                <PaymentPopupComponent amountToPay={amountToPay} totalMonths={totalMonths}/>
                :''
            }
        </div>
    )
}