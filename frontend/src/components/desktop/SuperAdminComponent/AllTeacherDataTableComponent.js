import React, {useEffect, useState} from 'react';
import { actionToGetAllTeacherDataList} from "../../../actions/CommonAction";
import {useDispatch, useSelector} from "react-redux";
import DataTable from 'react-data-table-component';
import {useEffectOnce} from "../../../helper/UseEffectOnce";

export default function AllTeacherDataTableComponent(){
    const dispatch = useDispatch();
    const teacherListArray = useSelector((state) => state.allTeacherDataList);
    const [search,setSearch] = useState("")
    const [filterTeacher,setFilterTeacher] = useState([])
    const tableColumns = [
        {
            name:"Teacher Id",
            selector:(row) => row.id,
            sortable:true,
        },
        {
            name:"Teacher Name",
            selector:(row) => row.name,
            sortable:true,
        },
        {
            name:"Email Address",
            selector:(row) => row.email,
            sortable:true,
        },
        {
            name:"Address",
            selector:(row) => row.address,
            sortable:true,
        },
        {
            name:"Action",
            cell:(row) => <button className='btn btn-primary' onClick={() => alert(row.id)}> Assign Class</button>  ,
        }
    ]
    useEffectOnce(() =>{
        dispatch(actionToGetAllTeacherDataList());
    },[]);
    useEffect(() =>{
        const result = teacherListArray.teacherData.filter((teacher) => {
        return teacher.name.toLowerCase().match(search.toLowerCase());
        });
        setFilterTeacher(result);
    },[search,teacherListArray]);
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
                  data={filterTeacher}
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