import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import DataTable from 'react-data-table-component';
import {useEffectOnce} from "../../../helper/UseEffectOnce";
import {
    actionToGetAllRecordedClassesDetails
} from "../../../actions/CommonAction";
import moment from "moment";
import ReactPlayer from 'react-player'

export default function AllRecordedClassDataTableComponent() {
    const dispatch = useDispatch();
    const allRecordedClasses = useSelector((state) => state.allRecordedClasses);
    const [search,setSearch] = useState("")
    const [filterClass,setFilterClasses] = useState([])
    const [openReactVideoPlayer,setOpenReactVideoPlayer] = useState('')
    const viewReccordingOnVideoPlayer = (recording)=>{
        let url = `https://121tuition.in/api-call-tutor/getFineByName?name=${recording?.recorded_video_title}`;
        setOpenReactVideoPlayer(url);
    }

    const tableColumns = [
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
            name:"Batch",
            selector:(row) => row?.classes_assigned_to_teacher_batch,
            sortable:true,
        },
        {
            name:"Teacher Name",
            selector:(row) => row?.teacher_name,
            sortable:true,
        },
        {
            name:"Teacher Email",
            selector:(row) => row?.teacher_email,
            sortable:true,
        },
        {
            name:"Recorded At",
            selector:(row) => moment(row?.class_recorded_at).format('D MMM YYYY, hh:mm a'),
            sortable:true,
        },
        {
            name:"Action",
            selector:(row) =><div onClick={()=>viewReccordingOnVideoPlayer(row)} className={"btn btn-success"}>View Recording</div>,
            sortable:true,
        }
    ]
    useEffect(() =>{
        if(allRecordedClasses?.classesData) {
            const result = allRecordedClasses?.classesData?.filter((classes) => {
                return classes?.subject_name?.toLowerCase().match(search?.toLowerCase());
            });
            setFilterClasses(result);
        }
    },[search,allRecordedClasses]);
    useEffectOnce(() =>{
        dispatch(actionToGetAllRecordedClassesDetails());
    },[]);
    return (
        <div className={"container-fluid pt-4 px-4 datatable_container_main_div_section"}>
            <div className={"bg-light rounded h-100 p-4"}>
                {(allRecordedClasses?.loading) ?
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