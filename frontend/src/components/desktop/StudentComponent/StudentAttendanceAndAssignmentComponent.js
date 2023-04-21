import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import noClassFound from "../../../theme/images/chose/no_classes_found.png";
import {
    actionToGetAllAttendClassWithAssignment, actionToStoreAssignmentData,
} from "../../../actions/CommonAction";
import moment from "moment";
import pdfLogo from "../../../theme/images/icon/pdf_logo.svg";
import {cloneDeep} from "lodash";
import axios from "axios";
// SET your own endpoint
const endpoint = "https://121tuition.in/api-call-tutor/uploadAssignmentApiCall";

export default function StudentAttendanceAndAssignmentComponent({isMobile}){
    const {loading,attendanceData} = useSelector((state) => state.allAttendanceAndAssignment);
    const {classData} = useSelector((state) => state.studentAllClassesList);
    const [selectedFile,setSelectedFile] = useState({});
    const [loaded,setLoaded] = useState({});
    const [message,setMessage] = useState({});
    const [uploading,setUploading] = useState({});
    const dispatch = useDispatch();


    const handleFileChange = (event,id) => {
        selectedFile[id] = event.target.files[0];
        setSelectedFile(cloneDeep(selectedFile));
        loaded[id] = 0;
        setLoaded(cloneDeep(loaded));
        message[id] = event.target.files[0]
            ? event.target.files[0].name
            : 'Choose a file...';

        setMessage(cloneDeep(message));
    }

    const handleUpload = (event,id) => {
        event.preventDefault();
        if (uploading[id]) return;
        if (!selectedFile[id]) {
            message[id] = 'Select a file first';
            setMessage(cloneDeep(message));
            return;
        }
        uploading[id] = true;
        setUploading(uploading);
        // define upload
        const data = new FormData();
        let fileName = Date.now() + "_" + selectedFile[id]?.name;
        data.append("file", selectedFile[id], fileName);
        data.append("id", id);

        axios.post(endpoint, data, {
                onUploadProgress: ProgressEvent => {
                    loaded[id] = (ProgressEvent.loaded / ProgressEvent.total) * 100;
                    setLoaded(cloneDeep(loaded));
                }
            })
            .then(res => {
                selectedFile[id] = null;
                setSelectedFile(cloneDeep(selectedFile));
                loaded[id] = 0;
                setLoaded(cloneDeep(loaded));
                message[id] = "Uploaded successfully";
                setMessage(cloneDeep(message));
                uploading[id] = false;
                setUploading(uploading);
                dispatch(actionToStoreAssignmentData(selectedFile[id]?.name,fileName,id,classData?.id))
            })
            .catch(err => {
                message[id] = "Failed to upload";
                setMessage(cloneDeep(message));
                uploading[id] = false;
                setUploading(uploading);
            });
    };

    useEffect(()=>{
        if(classData?.id) {
            dispatch(actionToGetAllAttendClassWithAssignment(classData?.id))
        }
    },[classData])
    return(
        <div className={"student_attendance_assignment_main_container mt-65 "+(isMobile ? 'mobile' : '')}>
            {(!isMobile) &&
            (<div className="section-title text-center mb-45">
                <h2 className="mb-25">Class Attendance & Assignments</h2>
            </div>)}
            {(loading) ?
                (isMobile) ?
                    <FacebookLoader type={"facebookStyle"} item={7}/>
                    :
                    <FacebookLoader type={"facebookStyle"} item={2}/>
                : (attendanceData?.length) ?
                    <div className="accordion accordion-two" id="accoedion-ex-two">
                        {(attendanceData?.map((userClassData,key)=>(
                            <div key={key} className="accordion-item mb-30">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne"+(key)} aria-expanded="false" aria-controls="collapseOne">
                                        {moment(userClassData?.class_assigned_teacher_batch?.class_end_time).format('LLL')} Class attend
                                    </button>
                                </h2>
                                <div id={"collapseOne"+(key)} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accoedion-ex-two">
                                    <div className="accordion-body">
                                        <a>
                                            <p>Subject Name : {userClassData?.class_assigned_teacher_batch?.subject_name}</p>
                                            <p>Teacher Name : {userClassData?.class_assigned_teacher_batch?.teacher_name}</p>
                                            <p>Subject Name : {userClassData?.class_assigned_teacher_batch?.subject_name}</p>
                                        </a>
                                        <div className={"assignment_section mt-10"}>
                                            <h6>Assignment :</h6>
                                            {userClassData?.student_class_attend_assignment ? (
                                                <div className={"assignment_file_pdf_section"}>
                                                    {(userClassData?.student_class_attend_assignment?.map((studentAssignment,index)=>(
                                                        <a key={index}>
                                                            <img src={pdfLogo} alt={'pdfLogo'}/>
                                                            {studentAssignment?.name}
                                                        </a>
                                                    )))}
                                                </div>
                                            ) :
                                                <div className={"upload container_section"}>
                                                    <form className="box">
                                                        <input
                                                            type="file"
                                                            name="file-5[]"
                                                            id="file-5"
                                                            className="inputfile inputfile-4"
                                                            onChange={(e)=>handleFileChange(e,userClassData?.id)}
                                                        />
                                                        <label htmlFor="file-5">
                                                            <figure>
                                                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                                                            </figure>
                                                            <span>
                                                                {uploading[userClassData?.id]
                                                                    ? loaded[userClassData?.id] + "%"
                                                                    : message[userClassData?.id]
                                                                }
                                                              </span>
                                                        </label>
                                                        <button className="submit" type={"button"} onClick={(e)=>handleUpload(e,userClassData?.id)}>Upload</button>
                                                    </form>
                                                </div>
                                            }
                                        </div>
                                    </div>
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