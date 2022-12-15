import React, {useEffect} from 'react';
import successSvg from '../../../theme/images/icon/success_check.svg';
import {useDispatch, useSelector} from "react-redux";
import {
    actionToUpdateSubscriptionPlanDetailForUser
} from "../../../actions/CommonAction";


const paymentSuccess = window.location.href?.indexOf('redirect_status=succeeded') >= 0;
export default function StudentPaymentConfirmComponent(){
    const dispatch = useDispatch();
    const {loading,classData} = useSelector((state) => state.studentAllClassesList);
    useEffect(()=>{
        if(classData?.id) {
            dispatch(actionToUpdateSubscriptionPlanDetailForUser(classData?.id))
        }
    },[paymentSuccess,classData])

    return(
        <>
            {(!loading) ?
                <div className={"student_payment_subscription_plan_success_main_section"}>
                    {(paymentSuccess) ?
                        <div className={"student_payment_subscription_plan_inner_div"}>
                            <h2>Congratulations!!</h2>
                            <img alt={'success_check'} className={"success_check"} src={successSvg}/>
                            <p>You have successfully purchase our subscription plan.</p>
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