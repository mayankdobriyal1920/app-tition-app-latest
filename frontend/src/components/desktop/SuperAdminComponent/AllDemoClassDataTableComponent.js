import React, {useEffect, useState} from 'react';
import {
    actionToAlreadyCreatedClassAccordingToTheCondition,
    actionToGetAllDemoClassesDetails, actionToOpenCloseClassAssignPopup,
    actionToSearchTeacherAccordingToTheCondition
} from "../../../actions/CommonAction";
import {useDispatch, useSelector} from "react-redux";
import DataTable from 'react-data-table-component';
import {useEffectOnce} from "../../../helper/UseEffectOnce";

export default function AllDemoClassDataTableComponent(){
    const dispatch = useDispatch();
    const allDemoClasses = useSelector((state) => state.allDemoClasses);
    const [search,setSearch] = useState("")
    const [filterClass,setFilterClasses] = useState([])

    const openClassAssignPopUp=(data)=>{
        let payload = {
            profile_subject_with_batch_id:data?.profile_subject_with_batch_id,
            subject_id:data?.subject_id,
            school_board:data?.school_board_id,
            student_class:data?.student_class,
            batch:data?.profile_subject_with_batch_batch_type,
            has_taken_demo:0,
            isEdit:0,
        }

        dispatch(actionToSearchTeacherAccordingToTheCondition(payload));
        dispatch(actionToAlreadyCreatedClassAccordingToTheCondition(payload));
        dispatch(actionToOpenCloseClassAssignPopup(true,payload));
    }
    const openClassEditAssignPopUp=(data)=>{
        let payload = {
            profile_subject_with_batch_id:data?.profile_subject_with_batch_id,
            subject_id:data?.subject_id,
            school_board:data?.school_board_id,
            class_assigned_teacher_batch_id:data?.class_assigned_teacher_batch_id,
            student_class:data?.student_class,
            class_batch_name:data?.class_batch_name,
            batch:data?.profile_subject_with_batch_batch_type,
            teacher_id:data?.teacher_id,
            class_timetable_with_class_batch_assigned:data?.class_timetable_with_class_batch_assigned,
            has_taken_demo:1,
            isEdit:1,
        }

        dispatch(actionToSearchTeacherAccordingToTheCondition(payload));
        dispatch(actionToAlreadyCreatedClassAccordingToTheCondition(payload));
        dispatch(actionToOpenCloseClassAssignPopup(true,payload));
    }
    const tableColumns = [
        {
            name:"Class Id",
            selector:(row) => row?.profile_subject_with_batch_id,
            sortable:true,
        },
        {
            name:"Subject Name",
            selector:(row) => row?.subject_name,
            sortable:true,
        },
        {
            name:"School Board",
            selector:(row) => row?.school_board_name,
            sortable:true,
        },
        {
            name:"Student Class",
            selector:(row) => row?.student_class+"th",
            sortable:true,
        },
        {
            name:"Student Name",
            selector:(row) => row?.student_name,
            sortable:true,
        },
        {
            name:"Action",
            cell:(row) => (row?.class_assigned_teacher_batch_id) ?
                <button className='btn btn-danger' onClick={() => openClassEditAssignPopUp(row)}>Edit</button>
                 :
                <button className='btn btn-primary' onClick={() => openClassAssignPopUp(row)}>Assign</button>

        }
    ]
    useEffect(() =>{
        if(allDemoClasses?.classesData) {
            const result = allDemoClasses?.classesData?.filter((classes) => {
                return classes?.subject_name?.toLowerCase().match(search.toLowerCase()) || classes?.student_name?.toLowerCase().match(search.toLowerCase());
            });
            setFilterClasses(result);
        }
    },[search,allDemoClasses]);

    useEffectOnce(() =>{
        dispatch(actionToGetAllDemoClassesDetails());
    },[]);

    return (
        <div className={"container-fluid pt-4 px-4 datatable_container_main_div_section"}>
            <div className={"bg-light rounded h-100 p-4"}>
                {(allDemoClasses?.loading) ?
                    <div className={"d-flex justify-content-center h-100"}>
                        <div className={"spinner-border"} role={"status"}>
                            <span className={"sr-only"}>Loading...</span>
                        </div>
                    </div> :
                    <DataTable
                        title="Classes List"
                        columns={tableColumns}
                        data={filterClass}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="1400px"
                        responsive
                        highlightOnHover
                        defaultSortAsc
                        subHeader
                        progressComponent
                        subHeaderComponent={<input type="text" placeholder="Search here" className="w-25 form-control"  value={search} onChange={(e)=>setSearch(e.target.value)}/>}
                    />
                }
            </div>
        </div>

    )
}