import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    actionToCreateAndAssignClassData,
    actionToOpenCloseClassAssignPopup, actionToRescheduleClassTime,
    actionToUpdateClassAssignedBatchData
} from "../../../actions/CommonAction";
import moment from "moment";
import {cloneDeep} from "lodash";

let weekDatesArray = [];
let weekStartDate = moment().startOf('week').format('YYYY-MM-DD');
for (let i = 0; i < 7; i++) {
    let weekDate = moment(weekStartDate).add(i, 'days').format("YYYY-MM-DD");
    weekDatesArray.push(weekDate);
}
export default function ClassAssignPopupComponent(){
    const [selectedTeacherId,setSelectedTeacherId] = useState(null);
    const [selectedClassAssignId,setSelectedClassAssignId] = useState(null);
    const [selectedClassData,setSelectedClassData] = useState(null);
    const [classBatchName,setClassBatchName] = useState('');
    let [classStartFromDateTime,setClassStartFromDateTime] = useState({});
    const [classStartFromDateTimeDemo,setClassStartFromDateTimeDemo] = useState(null);
    const [classTimeEditMode,setClassTimeEditMode] = useState(null);
    const [classEditTimeValue,setClassEditTimeValue] = useState(null);
    const [selAssignCreateButon,setSelAssignCreateButon] = useState('create');
    const {isOpen,dropdownData} = useSelector((state) => state.openCloseClassAssignPopup);
    const allTeacherDataToAssignClass = useSelector((state) => state.allTeacherDataToAssignClass);
    const allClassToAssignClass = useSelector((state) => state.allClassToAssignClass);
    const dispatch = useDispatch();
    const closeClassAssignPopup = ()=>{
        dispatch(actionToOpenCloseClassAssignPopup(false,{}));
    }
    const validateEditPopup = ()=>{
        if(dropdownData?.teacher_id !== selectedTeacherId || (dropdownData?.class_batch_name !== classBatchName?.trim() && classBatchName?.trim()?.length)){
            return true;
        }
        return false;
    }
    const saveSelectedTimeData = (newTime,oldTime)=>{
        if(newTime && newTime !== oldTime){
            let newDateTime = moment(classTimeEditMode?.start_from_date_time).format('YYYY-MM-DD')+' '+newTime;
            dispatch(actionToRescheduleClassTime(
                    dropdownData?.class_assigned_teacher_batch_id,
                    dropdownData?.profile_subject_with_batch_id,
                    classTimeEditMode?.start_from_date_time,
                    newDateTime
                ))
        }
        setClassTimeEditMode(null);
        setClassEditTimeValue('00:00');
    }
    const editModeActiveForClassTime = (data)=>{
        setClassTimeEditMode(data);
        setClassEditTimeValue(moment(data?.start_from_date_time).format('HH:mm'));
    }
    const callFunctionToUpdateAssignClassData = ()=>{
        if(validateEditPopup()){
            dispatch(actionToUpdateClassAssignedBatchData(selectedClassAssignId,dropdownData?.profile_subject_with_batch_id,selectedTeacherId,classBatchName))
            closeClassAssignPopup();
        }
    }
    useEffect(()=>{
        if(isOpen){
            if(dropdownData?.isEdit) {
                setSelectedTeacherId(cloneDeep(dropdownData?.teacher_id));
                setSelectedClassAssignId(cloneDeep(dropdownData?.class_assigned_teacher_batch_id));
                setClassBatchName(cloneDeep(dropdownData?.class_batch_name));
            }else{
                setSelectedTeacherId(null);
                setSelectedClassAssignId(null);
                setSelectedClassData(null);
                setClassBatchName('');
                setClassStartFromDateTime({});
                setClassStartFromDateTimeDemo(null);
                setSelAssignCreateButon('create');
            }
        }
    },[isOpen])

    useEffect(()=>{
        classStartFromDateTime = {};
        if(weekDatesArray?.length){
            weekDatesArray?.map((date)=>{
                classStartFromDateTime[date] = null;
                setClassStartFromDateTime(cloneDeep(classStartFromDateTime));
            })
        }
    },[weekDatesArray])

    useEffect(()=>{
        classStartFromDateTime = {};
        if(selectedClassAssignId){
            allClassToAssignClass?.classData?.map((classData)=>{
                if(classData?.id === selectedClassAssignId)
                    setSelectedClassData(cloneDeep(classData));
            })
        }
    },[selectedClassAssignId])

    const callFunctionToSetClassDateTime = (date,time)=> {
        classStartFromDateTime[date] = time;
        setClassStartFromDateTime(cloneDeep(classStartFromDateTime));
    }

    const validateAssignPopupForm = ()=>{
        let allClassDateTime = [];
        Object.keys(classStartFromDateTime).map((date)=>{
            if(classStartFromDateTime[date]) {
                let dateTime = `${date} ${classStartFromDateTime[date]}`;
                allClassDateTime.push(moment(dateTime).format('YYYY-MM-DD HH:mm:ss'));
            }
        })

        if(selectedClassAssignId){
            selectedClassData?.class_timetable_with_class_batch_assigned?.map((data)=>{
                let weekDay = moment(data?.start_from_date_time).weekday();
                let startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
                allClassDateTime.push(moment(startOfWeek).add(weekDay,'days').format('YYYY-MM-DD')+' '+moment(data?.start_from_date_time).add(weekDay,'days').format('HH:mm:ss'));
            })
        }

        let validate = false;
        if(dropdownData?.has_taken_demo && allClassDateTime?.length){
            if(selectedClassAssignId) {
                validate = true;
            }else if(classBatchName?.trim()?.length && selectedTeacherId){
                validate = true;
            }
        }else if(!dropdownData?.has_taken_demo){
            if(classStartFromDateTimeDemo){
                validate = true;
            }
        }
        return validate;
    }

    const callFunctionToAssignClassData = ()=>{
        let allClassDateTime = [];
        Object.keys(classStartFromDateTime).map((date)=>{
            if(classStartFromDateTime[date]) {
                let dateTime = `${date} ${classStartFromDateTime[date]}`;
                allClassDateTime.push(moment(dateTime).format('YYYY-MM-DD HH:mm:ss'));
            }
        })

        if(selectedClassAssignId){
            selectedClassData?.class_timetable_with_class_batch_assigned?.map((data)=>{
                let weekDay = moment(data?.start_from_date_time).weekday();
                let startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
                allClassDateTime.push(moment(startOfWeek).add(weekDay,'days').format('YYYY-MM-DD')+' '+moment(data?.start_from_date_time).add(weekDay,'days').format('HH:mm:ss'));
            })
        }

        let validate = false;
        if(dropdownData?.has_taken_demo && allClassDateTime?.length){
            if(selectedClassAssignId) {
                validate = true;
            }else if(classBatchName?.trim()?.length && selectedTeacherId){
                validate = true;
            }
        }else if(!dropdownData?.has_taken_demo){
            if(classStartFromDateTimeDemo){
                validate = true;
            }
        }

       if(validate){
           let payload = {
               profile_subject_with_batch_id: dropdownData?.profile_subject_with_batch_id,
               class_assign_id: selectedClassAssignId,
               class_batch_name: classBatchName,
               teacher_id: selectedTeacherId,
               all_class_date_time: allClassDateTime,
               starting_from_date:moment(new Date(classStartFromDateTimeDemo)).format('YYYY-MM-DD HH:mm:ss'),
               batch: dropdownData?.batch,
               is_demo_class: dropdownData?.has_taken_demo ? 0 : 1,
               subject_id: dropdownData?.subject_id,
               school_board: dropdownData?.school_board,
               student_class: dropdownData?.student_class,
           }
           dispatch(actionToCreateAndAssignClassData(payload));
           closeClassAssignPopup();
       }
    }
    const assignCreateButton = (type)=>{
        setSelectedClassAssignId(null);
        setSelAssignCreateButon(type);
    }
    return (
        <div id={"class_assign_popup"}>
            {(isOpen) ?
                <div className={"assign_class_main_popup_outer_container"}>
                      <div className={"assign_class_main_popup_inner_container"}>
                        <div onClick={closeClassAssignPopup} className={"close_popup_button"}><i className={"fa fa-times"}></i></div>
                          {!dropdownData?.isEdit ?
                              <>
                                {(!dropdownData?.has_taken_demo) ?
                                    <div className="bg-light rounded h-100 p-4">
                                        <h6 className="mb-4">Assign class</h6>
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="floatingSelect"
                                                    onChange={(e) => setSelectedTeacherId(e.target.value)}
                                                    aria-label="Floating label select example" required>
                                                    {(allTeacherDataToAssignClass?.loading) ?
                                                        <option selected="">{'Loading...'}</option>
                                                        : (allTeacherDataToAssignClass?.teacherData?.length) ?
                                                            <>
                                                                <option selected="">{'Select teacher'}</option>
                                                                {(allTeacherDataToAssignClass?.teacherData?.map((teacherData, key) => (
                                                                    <option key={key} value={teacherData?.teacher_id}>{teacherData?.teacher_name}</option>
                                                                )))}
                                                            </>
                                                            :
                                                            <option selected="">{'No teacher found'}</option>
                                                    }
                                            </select>
                                            <label htmlFor="floatingSelect">Teacher</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="datetime-local"
                                                   value={classStartFromDateTimeDemo}
                                                   dataformatas={"YYYY-MM-DD HH:mm"}
                                                   onChange={(e) => setClassStartFromDateTimeDemo(e.target.value)}
                                                   className="form-control" id="floatingClassTime"
                                                   placeholder="Class date time" required/>
                                            <label htmlFor="floatingClassTime">Class date time</label>
                                        </div>
                                        <button type="button" onClick={callFunctionToAssignClassData}
                                                disabled={!validateAssignPopupForm()}
                                                className="btn btn-primary mt-30">
                                            Assign
                                        </button>
                                    </div>
                                    :
                                    <div className="bg-light rounded h-100 p-4">
                                        <div className={"assign_create_switch_button btn-group"}>
                                            <button onClick={()=>assignCreateButton('create')} className={"btn btn-outline-primary assign_button "+(selAssignCreateButon === 'create' ? 'active' : '')}>Assign new batch class</button>
                                            <button onClick={()=>assignCreateButton('assign')} className={"btn btn-outline-primary assign_button "+(selAssignCreateButon === 'assign' ? 'active' : '')}>Assign existing batch</button>
                                        </div>
                                        {selAssignCreateButon === 'assign' ?
                                            <div className={"assign_create_section mt-15"}>
                                                <div className="form-floating mb-3">
                                                    <select className="form-select" id="floatingSelect"
                                                            onChange={(e) => setSelectedClassAssignId(e.target.value)}
                                                            aria-label="Floating label select example" required>
                                                            {(allClassToAssignClass?.loading) ?
                                                                <option selected>{'Loading...'}</option>
                                                                : (allClassToAssignClass?.classData?.length) ?
                                                                    <>
                                                                        <option selected>{'Select class'}</option>
                                                                        {(allClassToAssignClass?.classData?.map((classData, key) => (
                                                                            <option key={key} value={classData?.id}>{classData?.class_batch_name}</option>
                                                                        )))}
                                                                    </>
                                                                    :
                                                                    <option selected>{'No class found'}</option>
                                                            }
                                                    </select>
                                                    <label htmlFor="floatingSelect">Class Bath Name</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           readOnly={true}
                                                           value={selectedClassData?.teacher_name}
                                                           className="form-control" id="floatingClassTime"
                                                           placeholder="Class date time"/>
                                                    <label htmlFor="floatingClassTime">Teacher</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           readOnly={true}
                                                           value={selectedClassData?.batch}
                                                           className="form-control" id="floatingClassTime"
                                                           placeholder="Class date time"/>
                                                    <label htmlFor="floatingClassTime">Batch</label>
                                                </div>

                                                {(selectedClassData?.class_timetable_with_class_batch_assigned?.map((data,key)=>(
                                                    <div key={key} className="form-floating">
                                                        <div>{moment(data?.start_from_date_time).format('dddd HH:mm a')}</div>
                                                    </div>
                                                )))}
                                                <button type="button" onClick={callFunctionToAssignClassData}
                                                        disabled={!validateAssignPopupForm()}
                                                        className="btn btn-primary mt-30">
                                                    Assign
                                                </button>
                                            </div>
                                            :
                                            <div className={"assign_create_section mt-15"}>
                                                <div className="form-floating mb-3">
                                                    <select className="form-select" id="floatingSelect"
                                                            onChange={(e) => setSelectedTeacherId(e.target.value)}
                                                            aria-label="Floating label select example" required>
                                                        {(allTeacherDataToAssignClass?.loading) ?
                                                            <option selected="">{'Loading...'}</option>
                                                            : (allTeacherDataToAssignClass?.teacherData?.length) ?
                                                                <>
                                                                    <option selected="">{'Select teacher'}</option>
                                                                    {(allTeacherDataToAssignClass?.teacherData?.map((teacherData, key) => (
                                                                        <option key={key} value={teacherData?.teacher_id}>{teacherData?.teacher_name}</option>
                                                                    )))}
                                                                </>
                                                                :
                                                                <option selected="">{'No teacher found'}</option>
                                                        }
                                                    </select>
                                                    <label htmlFor="floatingSelect">Teacher</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input type="text"
                                                           value={classBatchName}
                                                           onChange={(e) => setClassBatchName(e.target.value)}
                                                           className="form-control" id="floatingClassTime"
                                                           placeholder="Class date time" required/>
                                                    <label htmlFor="floatingSelect">Class Batch Name</label>
                                                </div>
                                                {(weekDatesArray?.map((date,key)=>(
                                                    <div key={key} className="form-floating">
                                                        <input type="time"
                                                        onBlur={(e) => callFunctionToSetClassDateTime(date,e.target.value)}
                                                        className="form-control" id="floatingClassTime"
                                                        placeholder="Class date time" required/>
                                                        <label htmlFor="floatingClassTime">{moment(date).format('dddd ,Do MMMM')}</label>
                                                    </div>
                                                )))}
                                                <button type="button" onClick={callFunctionToAssignClassData}
                                                        disabled={!validateAssignPopupForm()}
                                                        className="btn btn-primary mt-30">
                                                    Assign
                                                </button>
                                            </div>
                                        }
                                    </div>
                                }
                              </>
                              :
                              <>
                                  <div className="bg-light rounded h-100 p-4">
                                      <div className={"assign_create_section mt-15"}>
                                          <div className="form-floating mb-3">
                                              <select className="form-select"
                                                      id="floatingSelect"
                                                      value={selectedTeacherId}
                                                      onChange={(e) => setSelectedTeacherId(e.target.value)}
                                                      aria-label="Floating label select example" required>
                                                  {(allTeacherDataToAssignClass?.loading) ?
                                                      <option selected="">{'Loading...'}</option>
                                                      : (allTeacherDataToAssignClass?.teacherData?.length) ?
                                                          <>
                                                              <option selected="">{'Select teacher'}</option>
                                                              {(allTeacherDataToAssignClass?.teacherData?.map((teacherData, key) => (
                                                                  <option key={key} value={teacherData?.teacher_id}>{teacherData?.teacher_name}</option>
                                                              )))}
                                                          </>
                                                          :
                                                          <option selected="">{'No teacher found'}</option>
                                                  }
                                              </select>
                                              <label htmlFor="floatingSelect">Teacher</label>
                                          </div>
                                          <div className="form-floating mb-3">
                                              <input type="text"
                                                     value={classBatchName}
                                                     onChange={(e)=>setClassBatchName(e.target.value)}
                                                     className="form-control" id="floatingClassTime"
                                                     placeholder="Class date time"/>
                                              <label htmlFor="floatingClassTime">Class batch name</label>
                                          </div>

                                          {(dropdownData?.class_timetable_with_class_batch_assigned?.map((data,key)=>(
                                              <div key={key} className="form-floating class_date_time_sectiob_loop">
                                                  <div>{moment(data?.start_from_date_time).format('dddd')}</div>
                                                  {(classTimeEditMode?.id === data?.id) ?
                                                      <input type="time"
                                                             value={classEditTimeValue}
                                                             onChange={(e)=>setClassEditTimeValue(e.target.value)}
                                                             onBlur={()=>saveSelectedTimeData(classEditTimeValue,moment(data?.start_from_date_time).format('HH:mm'))}
                                                             autoFocus={true}
                                                             placeholder="Time"
                                                             required/>
                                                      :
                                                      <input onClick={()=>editModeActiveForClassTime(data)}
                                                             type={"time"}
                                                             value={moment(data?.start_from_date_time).format('HH:mm')}
                                                             readOnly={true}/>
                                                  }
                                              </div>
                                          )))}
                                          <button type="button" onClick={callFunctionToUpdateAssignClassData}
                                                  disabled={!validateEditPopup()}
                                                  className="btn btn-primary mt-30">
                                              Assign
                                          </button>
                                      </div>
                                  </div>
                              </>
                          }
                    </div>
                </div>
                : ''
            }
        </div>
    )
}