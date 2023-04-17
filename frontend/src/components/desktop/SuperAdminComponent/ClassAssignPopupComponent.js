import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {actionToCreateAndAssignClassData, actionToOpenCloseClassAssignPopup} from "../../../actions/CommonAction";
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
    const [classBatchName,setClassBatchName] = useState('');
    let [classStartFromDateTime,setClassStartFromDateTime] = useState({});
    const [selAssignCreateButon,setSelAssignCreateButon] = useState('create');
    const {isOpen,dropdownData} = useSelector((state) => state.openCloseClassAssignPopup);
    const allTeacherDataToAssignClass = useSelector((state) => state.allTeacherDataToAssignClass);
    const allClassToAssignClass = useSelector((state) => state.allClassToAssignClass);
    const dispatch = useDispatch();
    const closeClassAssignPopup = ()=>{
        dispatch(actionToOpenCloseClassAssignPopup(false,{}));
    }

    useEffect(()=>{
        classStartFromDateTime = {};
        if(weekDatesArray?.length){
            weekDatesArray?.map((date)=>{
                classStartFromDateTime[date] = null;
                setClassStartFromDateTime(cloneDeep(classStartFromDateTime));
            })
        }
    },[weekDatesArray])

    const callFunctionToSetClassDateTime = (date,time)=> {
        classStartFromDateTime[date] = time;
        setClassStartFromDateTime(cloneDeep(classStartFromDateTime));
    }
    const callFunctionToAssignClassData = ()=>{
        let allClassDateTime = [];
        Object.keys(classStartFromDateTime).map((date)=>{
            if(classStartFromDateTime[date]) {
                let dateTime = `${date} ${classStartFromDateTime[date]}`;
                allClassDateTime.push(moment(dateTime).format('YYYY-MM-DD HH:mm:ss'));
            }
        })
        if(selectedTeacherId && allClassDateTime?.length && classBatchName?.trim()?.length){
            if(!selectedClassAssignId && !classBatchName?.trim()?.length) return;
            let payload = {
                profile_subject_with_batch_id:dropdownData?.profile_subject_with_batch_id,
                class_assign_id:selectedClassAssignId,
                class_batch_name:classBatchName,
                teacher_id:selectedTeacherId,
                all_class_date_time:allClassDateTime,
                batch:dropdownData?.batch,
                is_demo_class:dropdownData?.has_taken_demo ? 0 : 1,
                subject_id:dropdownData?.subject_id,
                school_board:dropdownData?.school_board,
                student_class:dropdownData?.student_class,
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
                        {(!dropdownData?.has_taken_demo) ?
                            <div className="bg-light rounded h-100 p-4">
                                <h6 className="mb-4">Assign class</h6>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="floatingSelect"
                                            onChange={(e) => setSelectedTeacherId(e.target.value)}
                                            aria-label="Floating label select example">
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
                                           value={classStartFromDateTime}
                                           onChange={(e) => setClassStartFromDateTime(e.target.value)}
                                           className="form-control" id="floatingClassTime"
                                           placeholder="Class date time"/>
                                    <label htmlFor="floatingClassTime">Class date time</label>
                                </div>
                                <button type="button" onClick={callFunctionToAssignClassData}
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
                                                    onChange={(e) => setSelectedTeacherId(e.target.value)}
                                                    aria-label="Floating label select example">
                                                    {(allClassToAssignClass?.loading) ?
                                                        <option selected>{'Loading...'}</option>
                                                        : (allClassToAssignClass?.classData?.length) ?
                                                            <>
                                                                <option selected>{'Select class'}</option>
                                                                {(allClassToAssignClass?.classData?.map((classData, key) => (
                                                                    <option key={key} value={classData?.id}>{classData?.id}</option>
                                                                )))}
                                                            </>
                                                            :
                                                            <option selected>{'No class found'}</option>
                                                    }
                                            </select>
                                            <label htmlFor="floatingSelect">Class Id</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   readOnly={true}
                                                   value={allClassToAssignClass?.classData?.teacher_name}
                                                   className="form-control" id="floatingClassTime"
                                                   placeholder="Class date time"/>
                                            <label htmlFor="floatingClassTime">Teacher</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   readOnly={true}
                                                   value={allClassToAssignClass?.classData?.starting_from_date}
                                                   className="form-control" id="floatingClassTime"
                                                   placeholder="Class date time"/>
                                            <label htmlFor="floatingClassTime">Class date Time</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   readOnly={true}
                                                   value={allClassToAssignClass?.classData?.batch}
                                                   className="form-control" id="floatingClassTime"
                                                   placeholder="Class date time"/>
                                            <label htmlFor="floatingClassTime">Batch</label>
                                        </div>
                                        <button type="button" onClick={callFunctionToAssignClassData}
                                                className="btn btn-primary mt-30">
                                            Assign
                                        </button>
                                    </div>
                                    :
                                    <div className={"assign_create_section mt-15"}>
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="floatingSelect"
                                                    onChange={(e) => setSelectedTeacherId(e.target.value)}
                                                    aria-label="Floating label select example">
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
                                                   placeholder="Class date time"/>
                                            <label htmlFor="floatingSelect">Class Batch Name</label>
                                        </div>
                                        {(weekDatesArray?.map((date,key)=>(
                                            <div key={key} className="form-floating">
                                                <input type="time"
                                                onBlur={(e) => callFunctionToSetClassDateTime(date,e.target.value)}
                                                className="form-control" id="floatingClassTime"
                                                placeholder="Class date time"/>
                                                <label htmlFor="floatingClassTime">{moment(date).format('dddd ,Do MMMM')}</label>
                                            </div>
                                        )))}
                                        <button type="button" onClick={callFunctionToAssignClassData}
                                                className="btn btn-primary mt-30">
                                            Assign
                                        </button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
                : ''
            }
        </div>
    )
}