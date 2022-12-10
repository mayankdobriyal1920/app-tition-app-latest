import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import DataTable from "react-data-table-component";
import {actionToGetAllStudentDataList} from "../../../actions/CommonAction";

export default function AllStudentDataTableComponent() {
    const dispatch = useDispatch();
    const teacherListArray = useSelector((state) => state.allStudentDataList);
    const [search, setSearch] = useState("")
    const [FilterSubject, setFilterSubject] = useState([])
    const tableColumns = [
        {
            name: "Subject Id",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Subject Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => <button class='btn btn-primary' onClick={() => alert(row.id)}> Edit</button>,
        }
    ]
    useEffect(() =>{
        // dispatch(actionToGetAllStudentDataList());
        // console.log(teacherListArray);
        // // getTeachers();
    },[]);
    useEffect(() => {
        const result = teacherListArray.subjectData.filter((teacher) => {
            return teacher.name.toLowerCase().match(search.toLowerCase());
        });
        setFilterSubject(result);
    }, [search]);
    return (
        <DataTable
            title="Student List"
            columns={tableColumns}
            data={FilterSubject}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="1400px;"
            responsive
            highlightOnHover
            defaultSortAsc
            subHeader
            progressComponent
            subHeaderComponent={<input type="text" placeholder="Search here" className="w-25 form-control"
                                       value={search} onChange={(e) => setSearch(e.target.value)}/>}
        />
    )
}