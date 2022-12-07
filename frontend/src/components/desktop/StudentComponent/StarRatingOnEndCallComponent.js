import React,{useState} from "react";

export default function StarRatingOnEndCallComponent(){
    const [storeStartRatingCount,setStoreStartRatingCount] = useState(0);
    return(
        <div className={"class_star_rating_component"}>
            <div className={"class_star_rating_component_inner"}>
                <h1>Call End</h1>
                <p className={"start_message"}>How much you will rate this call.</p>
                <div className={"star_rating_main_div_with_stars"}>
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
                <button className={"theme_btn submit_star_rating_button"}>
                    Submit
                </button>
            </div>
        </div>
    )
}