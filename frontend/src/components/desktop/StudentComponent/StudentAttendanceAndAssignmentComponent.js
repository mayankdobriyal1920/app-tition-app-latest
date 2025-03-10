import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import noClassFound from "../../../theme/images/chose/no_classes_found.png";
import {
    actionToStoreAssignmentData, actionToStoreAssignmentDataForTeacher,
} from "../../../actions/CommonAction";
import moment from "moment";
import pdfLogo from "../../../theme/images/file_icon.svg";
import {cloneDeep} from "lodash";
import axios from "axios";
import {isTeacherMasterLogin} from "../../../middlewear/auth";
import ReactPlayer from "react-player";
// SET your own endpoint
const endpoint = "https://121tuition.in/api-call-tutor/uploadAssignmentApiCall";

export default function StudentAttendanceAndAssignmentComponent({isMobile}){
    const {loading,classData} = useSelector((state) => state.teacherClassAttendWithAssignmentData);
    const [selectedFile,setSelectedFile] = useState({});
    const [loaded,setLoaded] = useState({});
    const [message,setMessage] = useState({});
    const [uploading,setUploading] = useState({});
    const dispatch = useDispatch();
    const [openReactVideoPlayer,setOpenReactVideoPlayer] = useState('')

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
        let pathName = Date.now() + "_assignment_file_data_" + selectedFile[id]?.name.replace(/ /g,"_")+selectedFile[id]?.name;
        let fileName = selectedFile[id]?.name;
        data.append("file", selectedFile[id], pathName);
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
                message[id] = "";
                setMessage(cloneDeep(message));
                uploading[id] = false;
                setUploading(uploading);
                if(isTeacherMasterLogin()){
                    dispatch(actionToStoreAssignmentDataForTeacher(fileName,pathName,id))
                }else{
                    dispatch(actionToStoreAssignmentData(fileName,pathName,id))
                }
            })
            .catch(err => {
                message[id] = "Failed to upload";
                setMessage(cloneDeep(message));
                uploading[id] = false;
                setUploading(uploading);
            });
    };

    const viewRecordingOnVideoPlayer = (recording)=>{
        let url = `https://121tuition.in/api-call-tutor/getFineByName?name=${recording}`;
        console.log('url',url)
        setOpenReactVideoPlayer(url);
    }

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
                : (classData?.length) ?
                    <div className="accordion accordion-two" id="accoedion-ex-two">
                        {(classData?.map((dateData,key)=>(
                            <div key={key} className="accordion-item mb-30">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne"+(key)} aria-expanded="true">
                                        {(moment(dateData.date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) ? 'Today' :(moment(dateData.date).format('YYYY-MM-DD') === moment().subtract(1,'day').format('YYYY-MM-DD')) ? 'Yesterday' : moment(dateData.date).format('LL')}
                                    </button>
                                </h2>
                                <div id={"collapseOne"+(key)} className="accordion-collapse collapse show">
                                    {(dateData?.classData?.map((classData,classDataKey)=>(
                                       <div key={classDataKey} className="accordion-body">
                                           <div className="accordion-body-inner-data">
                                               <a>
                                                   <p>Batch Name : {classData?.class_batch_name}</p>
                                                   <p>Batch Type
                                                       : {classData?.batch === 1 ? '1 to 1' : (classData?.batch === 2) ? '1 to 3' : (classData?.batch === 3) ? '1 to 5' : '1 to 100'}</p>
                                                   <p>Subject Name : {classData?.subject_name}</p>
                                               </a>
                                               <hr/>
                                               <div className={"assignment_section mt-10"}>
                                                   <h6>All Students:</h6>
                                                   <div className={"assignment_file_pdf_section"}>
                                                       {(classData?.profile_subject_with_batch?.map((studentData, index) => (
                                                           <div key={index}>
                                                               <p>
                                                                   {studentData?.student_name}
                                                                   <span className={'student_statur ' + (classData?.student_class_attend ? 'present' : 'absent')}>{classData?.student_class_attend ? '(PRESENT)' : '(ABSENT)'}</span>
                                                               </p>
                                                           </div>
                                                       )))}
                                                   </div>
                                               </div>
                                               <hr/>
                                               <div className={"assignment_section mt-10"}>
                                                   <h6>Student Assignments:</h6>
                                                   {classData?.student_class_attend ? (
                                                           <div className={"assignment_file_pdf_section"}>
                                                               {(classData?.student_class_attend?.map((studentClassAttend, index) => (
                                                                   <div className={"student_assignment_section"}
                                                                        key={index}>
                                                                       <p>Student Name
                                                                           : {studentClassAttend?.student_name}</p>
                                                                       {studentClassAttend?.student_class_attend_assignment ?
                                                                           <div>
                                                                               {studentClassAttend?.student_class_attend_assignment?.map((assignment, assignmentKey) => (
                                                                                   <div
                                                                                       className={"assignment_project_list_for_student"}
                                                                                       key={assignmentKey}>
                                                                                       <a href={`/api-call-tutor/getFineByName?name=${assignment?.path}`}
                                                                                          target={"_blank"}>
                                                                                           <img alt={'pdfLogo'}
                                                                                                src={pdfLogo}/>
                                                                                           <p>{assignment?.name}</p>
                                                                                       </a>
                                                                                   </div>
                                                                               ))}
                                                                           </div>
                                                                           :
                                                                           <div>
                                                                               <p>No Assignments Submitted</p>
                                                                           </div>
                                                                       }
                                                                       {(!isTeacherMasterLogin()) ?
                                                                           <div className={"assignment_section mt-10"}>
                                                                               <h6>Upload Assignment:</h6>
                                                                               <div className={"upload container_section"}>
                                                                                   <form className="box">
                                                                                       <input
                                                                                           type="file"
                                                                                           accept="application/pdf"
                                                                                           id="file-5"
                                                                                           className="inputfile inputfile-4"
                                                                                           onChange={(e) => handleFileChange(e, studentClassAttend?.id)}
                                                                                       />
                                                                                       <label htmlFor="file-5">
                                                                                           <figure>
                                                                                               <svg
                                                                                                   xmlns="http://www.w3.org/2000/svg"
                                                                                                   width="20" height="17"
                                                                                                   viewBox="0 0 20 17">
                                                                                                   <path
                                                                                                       d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                                                                                               </svg>
                                                                                           </figure>
                                                                                           <span>
                                                                                      {uploading[studentClassAttend?.id]
                                                                                          ? loaded[studentClassAttend?.id] + "%"
                                                                                          : message[studentClassAttend?.id]
                                                                                      }
                                                                                    </span>
                                                                                       </label>
                                                                                       <button className="submit"
                                                                                               type={"button"}
                                                                                               onClick={(e) => handleUpload(e, studentClassAttend?.id)}>Upload
                                                                                       </button>
                                                                                   </form>
                                                                               </div>
                                                                           </div>
                                                                           : ''}
                                                                   </div>
                                                               )))}
                                                           </div>
                                                       ) :
                                                       <div>
                                                           <p>No Assignments Submitted</p>
                                                       </div>
                                                   }
                                               </div>
                                               <hr/>
                                               <div className={"assignment_section mt-10"}>
                                                   <h6>Teacher Assignments:</h6>
                                                   {classData?.teacher_class_attend_assignment ?
                                                       <div>
                                                           {classData?.teacher_class_attend_assignment?.map((assignment, assignmentKey) => (
                                                               <div className={"assignment_project_list"}
                                                                    key={assignmentKey}>
                                                                   <a href={`/api-call-tutor/getFineByName?name=${assignment?.path}`}
                                                                      target={"_blank"}>
                                                                       <img alt={'pdfLogo'} src={pdfLogo}/>
                                                                       <p>&nbsp;&nbsp;{assignment?.name}</p>
                                                                   </a>
                                                               </div>
                                                           ))}
                                                       </div>
                                                       :
                                                       <div>
                                                           <p>No Assignments Submitted</p>
                                                       </div>
                                                   }
                                               </div>
                                               <hr/>
                                               <div className={"assignment_section mt-10"}>
                                                   <h6>Class Recording:</h6>
                                                   {classData?.class_call_recording ?
                                                       <div onClick={() => viewRecordingOnVideoPlayer(classData?.class_call_recording)}
                                                            className={"btn btn-success"}>View Recording</div>
                                                       :
                                                       <div>
                                                           <p>No Class Recording</p>
                                                       </div>
                                                   }
                                               </div>
                                               {(isTeacherMasterLogin()) ?
                                                   <>
                                                       <hr/>
                                                       <div className={"assignment_section mt-10"}>
                                                           <h6>Upload Assignment:</h6>
                                                           <div className={"upload container_section"}>
                                                               <form className="box">
                                                                   <input
                                                                       type="file"
                                                                       id="file-5"
                                                                       accept="application/pdf"
                                                                       className="inputfile inputfile-4"
                                                                       onChange={(e) => handleFileChange(e, classData?.class_id)}
                                                                   />
                                                                   <label htmlFor="file-5">
                                                                       <figure>
                                                                           <svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="20" height="17"
                                                                                viewBox="0 0 20 17">
                                                                               <path
                                                                                   d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                                                                           </svg>
                                                                       </figure>
                                                                       <span>
                                                                      {uploading[classData?.class_id]
                                                                          ? loaded[classData?.class_id] + "%"
                                                                          : message[classData?.class_id]
                                                                      }
                                                                    </span>
                                                                   </label>
                                                                   <button className="submit" type={"button"}
                                                                           onClick={(e) => handleUpload(e, classData?.class_id)}>Upload
                                                                   </button>
                                                               </form>
                                                           </div>
                                                       </div>
                                                   </> : ''}
                                           </div>
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




            {openReactVideoPlayer ?
                <div className={"assign_class_main_popup_outer_container video_player_main_section"}>
                    <div className={"assign_class_main_popup_inner_container"}>
                        <div onClick={()=>setOpenReactVideoPlayer('')} className={"close_popup_button"}><i className={"fa fa-times"}></i></div>
                        <ReactPlayer playing
                                     width='100%'
                                     controls={true}
                                     height='100%'
                                     url={openReactVideoPlayer} />
                    </div>
                </div>
                :''
            }
        </div>
    )
}