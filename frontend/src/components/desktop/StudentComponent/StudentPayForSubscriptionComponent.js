import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../../../helper/UseEffectOnce";
import {actionToInitializePaymentGateway} from "../../../actions/CommonAction";


export default function StudentPayForSubscriptionComponent(){
    const {classData} = useSelector((state) => state.studentAllClassesList);
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const [paymentData,setPaymentData] = useState(null);
    const dispatch = useDispatch();


    const initialize = () => {
        let orderId = "Order_" + new Date().getTime();

        // Sandbox Credentials
        let mid = "sadsadasdasdsadadffasf"; // Merchant ID
        let payload = {
            requestType: "Payment",
            mid: mid,
            websiteName: "WEBSTAGING",
            orderId: orderId,
            callbackUrl: "https://merchant.com/callback",
            txnAmount: {
                value: 100,
                currency: "INR",
            },
            userInfo: {
                custId: userInfo?.id,
            },
        };
        dispatch(actionToInitializePaymentGateway(payload,setPaymentData))
    };


    const makePayment = () => {
        let config = {
            "root":"",
            "style": {
                "bodyBackgroundColor": "#fafafb",
                "bodyColor": "",
                "themeBackgroundColor": "#0FB8C9",
                "themeColor": "#ffffff",
                "headerBackgroundColor": "#284055",
                "headerColor": "#ffffff",
                "errorColor": "",
                "successColor": "",
                "card": {
                    "padding": "",
                    "backgroundColor": ""
                }
            },
            "data": {
                "orderId": paymentData.order,
                "token": paymentData.token,
                "tokenType": "TXN_TOKEN",
                "amount": paymentData.amount /* update amount */
            },
            "payMode": {
                "labels": {},
                "filter": {
                    "exclude": []
                },
                "order": [
                    "CC",
                    "DC",
                    "NB",
                    "UPI",
                    "PPBL",
                    "PPI",
                    "BALANCE"
                ]
            },
            "website": "WEBSTAGING",
            "flow": "DEFAULT",
            "merchant": {
                "mid": paymentData.mid,
                "redirect": false
            },
            "handler": {
                "transactionStatus":
                    function transactionStatus(paymentStatus){
                        console.log(paymentStatus);
                    },
                "notifyMerchant":
                    function notifyMerchant(eventName,data){
                        console.log("Closed");
                    }
            }
        };

        if (window.Paytm && window.Paytm.CheckoutJS) {
            window.Paytm.CheckoutJS.init(config).
            then(function onSuccess() {
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
                console.log("Error => ", error);
            });
        }}

    useEffectOnce(()=>{
        //initialize();
    },[])

    return (
        <div className={"student_pay_for_subscription_main_page"}>
            <h1>Subscription plan</h1>
            <p className={"mb-10"}>Please purchase subscription to continue.</p>
            <h2 className={"mb-10"}>Subscription details :-</h2>
            <h3 className={"mb-10"}>Total Classes(3)</h3>
            <div className={"classes_section"}>
                <div className={"classes_section_loop"}>
                    <p><span>Name : </span>Hindi</p>
                    <p><span>Class : </span>6th</p>
                    <p><span>Course fee : </span>Rs 3000</p>
                    <p><span>Total classes : </span>150</p>
                </div>
                <div className={"classes_section_loop"}>
                    <p><span>Name : </span>Maths</p>
                    <p><span>Class : </span>6th</p>
                    <p><span>Course fee : </span>Rs 3000</p>
                    <p><span>Total classes : </span>150</p>
                </div>
                <div className={"classes_section_loop"}>
                    <p><span>Name : </span>Science</p>
                    <p><span>Class : </span></p>
                    <p><span>Course fee : </span>Rs 3000</p>
                    <p><span>Total classes : </span>150</p>
                </div>
            </div>
            <div className={"classes_section_total_payable"}>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <h3>Total amount : Rs 12000</h3>
                    </div>
                    <div className={"col-4"}>
                        <button
                            onClick={makePayment}
                            className={"theme_btn pay_button"}>Make Payment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}