import React,{useState} from "react";

export default function UploadCllRecordingOnEndCallComponent(){
    return(
        <div className={"recording_upload_section_main_container"}>
            <div className={"recording_upload_section_inner"}>
                <h1>Call End</h1>
                <p className={"start_message"}>Uploading recording file (please don't close window until uploading is in progress).</p>
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