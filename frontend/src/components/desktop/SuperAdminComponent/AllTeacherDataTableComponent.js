import React, {useEffect, useState} from 'react';
import { actionToGetAllTeacherDataList} from "../../../actions/CommonAction";
import {useDispatch, useSelector} from "react-redux";
import DataTable from 'react-data-table-component';
import {useEffectOnce} from "../../../helper/UseEffectOnce";

export default function AllTeacherDataTableComponent(){
    const dispatch = useDispatch();
    const teacherListArray = useSelector((state) => state.allTeacherDataList);
    const [search,setSearch] = useState("")
    const [FilterSubject,setFilterSubject] = useState([])
    const tableColumns = [
        {
            name:"Subject Id",
            selector:(row) => row.id,
            sortable:true,
        },
        {
            name:"Subject Name",
            selector:(row) => row.name,
            sortable:true,
        },
        {
            name:"Action",
            cell:(row) => <button class='btn btn-primary' onClick={() => alert(row.id)}> Edit</button>  ,
        }
    ]
    // useEffect(() =>{
    //     // dispatch(actionToGetAllSubjectDataList());
    //     console.log(teacherListArray);
    //     // getTeachers();
    // });
    useEffectOnce(() =>{
        dispatch(actionToGetAllTeacherDataList());
    },[]);
    useEffect(() =>{
        const result = teacherListArray.teacherData.filter((teacher) => {
        return teacher.name.toLowerCase().match(search.toLowerCase());
        });
        setFilterSubject(result);
    },[search]);
 return (
     <div className={"container-fluid pt-4 px-4"}>
         <div className={"bg-light rounded h-100 p-4"}>
             {(teacherListArray.loading) ?
                 <div className={"d-flex justify-content-center h-100"}>
                     <div className={"spinner-border"} role={"status"}>
                         <span className={"sr-only"}>Loading...</span>
                     </div>
                 </div> :
              <DataTable
                  title="Teacher List"
                  columns={tableColumns}
                  data={FilterSubject}
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