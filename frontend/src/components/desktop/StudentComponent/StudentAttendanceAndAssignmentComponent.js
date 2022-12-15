import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import noClassFound from "../../../theme/images/chose/no_classes_found.png";
import {
    actionToGetAllAttendClassWithAssignment,
} from "../../../actions/CommonAction";
import moment from "moment";
import pdfLogo from "../../../theme/images/icon/pdf_logo.svg";

export default function StudentAttendanceAndAssignmentComponent(){
    const {loading,attendanceData} = useSelector((state) => state.allAttendanceAndAssignment);
    const {classData} = useSelector((state) => state.studentAllClassesList);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(classData?.id) {
            dispatch(actionToGetAllAttendClassWithAssignment(classData?.id))
        }
    },[classData])
    return(
        <div className={"student_attendance_assignment_main_container mt-150"}>
            <div className="section-title text-center mb-45">
                <h2 className="mb-25">Attendance class with assignment</h2>
            </div>
            {(loading) ?
                <FacebookLoader type={"facebookStyle"} item={5}/>
                : (attendanceData?.length) ?
                    <div className="accordion accordion-two" id="accoedion-ex-two">
                        {(attendanceData?.map((userClassData,key)=>(
                            <div key={key} className="accordion-item mb-30">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        {moment(userClassData?.class_attend?.created_at).format('LLL')} Class attend
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne"
                                     data-bs-parent="#accoedion-ex-two">
                                    {(userClassData?.student_class_attend_assignment?.map((studentAssignment,index)=>(
                                        <div key={index} className="accordion-body">
                                            <a>
                                                <img src={pdfLogo} alt={'pdfLogo'}/>
                                                {studentAssignment?.name}
                                            </a>
                                        </div>
                                    )))}
                                </div>
                            </div>
                        )))}
                    </div>
                :
                    <div className={"no_demo_classes_div_section"}>
                        <img alt={"no_demo_classes"} src={noClassFound}/>
                        <br></br>
                        Nothing to display
                    </div>
            }
        </div>
    )
}