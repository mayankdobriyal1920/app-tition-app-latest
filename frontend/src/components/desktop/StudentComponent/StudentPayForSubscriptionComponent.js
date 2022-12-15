import React, {useState} from "react";
import {useSelector} from "react-redux"
import PaymentPopupComponent from "./PaymentPopupComponent";

export default function StudentPayForSubscriptionComponent(){
    const {classData} = useSelector((state) => state.studentAllClassesList);
    const studentAllTodayClassList = useSelector((state) => state.studentAllTodayClassList);
    const [openClosePaymentPopup,setOpenClosePaymentPopup] = useState(false);
    const [amountToPay,setAmountToPay] = useState(false);


    const setAmountAndOpenPaymentPopup = (amount)=>{
        setOpenClosePaymentPopup(true);
        setAmountToPay(amount);
    }


    return (
        <div className={"student_pay_for_subscription_main_page"}>
            <h1>Subscription plan</h1>
            <p className={"mb-10"}>Please purchase subscription to continue.</p>
            <h2 className={"mb-10"}>Subscription details :-</h2>
            <h3 className={"mb-10"}>Total Classes(3)</h3>
            <div className={"classes_section"}>
                {(studentAllTodayClassList.map((userSubjectData,key)=>(
                    <div key={key} className={"classes_section_loop"}>
                        <p><span>Name : </span>{userSubjectData?.subject_name}</p>
                        <p><span>Class : </span>{classData?.student_class}th</p>
                        <p><span>Course fee : </span>Rs 3000</p>
                        <p><span>Total classes : </span>150</p>
                    </div>
                )))}
            </div>
            <div className={"classes_section_total_payable"}>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <h3>Total amount : Rs 12000</h3>
                    </div>
                    <div className={"col-4"}>
                        <button onClick={()=>setAmountAndOpenPaymentPopup(1000)} className={"theme_btn pay_button"}>
                            Make Payment
                        </button>
                    </div>
                </div>
            </div>
            {(openClosePaymentPopup) ?
                <PaymentPopupComponent amountToPay={amountToPay}/>
                :''
            }
        </div>
    )
}