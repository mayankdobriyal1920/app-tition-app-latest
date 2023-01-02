import React,{useState} from "react";
import {useDispatch} from "react-redux";
import {actionToRateCurrentClass} from "../../../actions/CommonAction";

export default function StarRatingOnEndCallComponent({classCallData}){
    const [storeStartRatingCount,setStoreStartRatingCount] = useState(0);
    const dispatch = useDispatch();
    const callFunctionToRateCurrentClass = ()=>{
        dispatch(actionToRateCurrentClass(storeStartRatingCount,classCallData));
    }
    return(
        <div className={"class_star_rating_component"}>
            <div className={"class_star_rating_component_inner"}>
                <h1>Class Ended</h1>
                <p className={"start_message mt-10 mb-10"}>How much you will rate this class.</p>
                <div className={"star_rating_main_div_with_stars mt-10 mb-10"}>
                    <i onClick={()=>setStoreStartRatingCount(1)}
                       className={"fa fa-star "+(storeStartRatingCount >= 1 ? 'active' : '')}
                       aria-hidden="true"></i>
                    <i onClick={()=>setStoreStartRatingCount(2)}
                       className={"fa fa-star "+(storeStartRatingCount >= 2 ? 'active' : '')}
                       aria-hidden="true"></i>
                    <i onClick={()=>setStoreStartRatingCount(3)}
                       className={"fa fa-star "+(storeStartRatingCount >= 3 ? 'active' : '')}
                       aria-hidden="true"></i>
                    <i onClick={()=>setStoreStartRatingCount(4)}
                       className={"fa fa-star "+(storeStartRatingCount >= 4 ? 'active' : '')}
                       aria-hidden="true"></i>
                    <i onClick={()=>setStoreStartRatingCount(5)}
                       className={"fa fa-star "+(storeStartRatingCount === 5 ? 'active' : '')}
                       aria-hidden="true"></i>
                </div>
                <button onClick={callFunctionToRateCurrentClass} className={"theme_btn submit_star_rating_button"}>
                    Submit
                </button>
            </div>
        </div>
    )
}