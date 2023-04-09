import React, {useEffect} from 'react';
import successSvg from '../../../theme/images/icon/success_check.svg';
import {useDispatch, useSelector} from "react-redux";
import {
    actionToUpdateSubscriptionPlanDetailForUser
} from "../../../actions/CommonAction";
import {NavLink,useParams} from "react-router-dom";

const paymentSuccess = window.location.href?.indexOf('redirect_status=succeeded') >= 0;
let loadOnce = false;

export default function StudentPaymentConfirmComponent(){
    const dispatch = useDispatch();
    const {loading,classData} = useSelector((state) => state.studentAllClassesList);
    const {month} = useParams();

    useEffect(()=>{
        console.log('loadOnce',loadOnce);
        if(classData?.id && !loadOnce) {
            dispatch(actionToUpdateSubscriptionPlanDetailForUser(classData?.id,month));
            loadOnce = true;
        }
    },[paymentSuccess,classData,month])

    return(
        <>
            {(!loading) ?
                <div className={"student_payment_subscription_plan_success_main_section"}>
                    {(paymentSuccess) ?
                        <div className={"student_payment_subscription_plan_inner_div"}>
                            <h2>Congratulations!!</h2>
                            <img alt={'success_check'} className={"success_check"} src={successSvg}/>
                            <p>You have successfully purchase our subscription plan.</p>
                            <NavLink to={`/dashboard/home`} activeClassName={"active"} className={"go_to_dashboard_class_link"}>
                                Click to continue
                            </NavLink>
                        </div>
                        :
                        <div className={"student_payment_subscription_plan_inner_div"}>
                            <h2>Page Not Found!!</h2>
                        </div>
                    }
                </div>
                : ''
            }
        </>
    )
}