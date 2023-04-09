import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutFormComponent from "./CheckoutFormComponent";
import {useEffectOnce} from "../../../helper/UseEffectOnce";
import {actionToConfigStripeSetup, actionToCreatePaymentIntend} from "../../../actions/CommonAction";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function PaymentPopupComponent({amountToPay,totalMonths}){
    const dispatch = useDispatch();

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffectOnce(() => {
        dispatch(actionToConfigStripeSetup(setStripePromise));
        dispatch(actionToCreatePaymentIntend(setClientSecret,amountToPay,totalMonths));
    }, []);

    return (
        <div className={"payment_popup_main_container"}>
            <div className={"payment_popup_inner_div"}>
                <div className={"header_payment_close_button"}>
                    <i className={"fa fa-times"}></i>
                </div>
                {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutFormComponent totalMonths={totalMonths}/>
                    </Elements>
                )}
            </div>
        </div>
    )
}