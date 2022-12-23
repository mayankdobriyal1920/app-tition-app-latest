import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import DataTable from "react-data-table-component";
import {actionToGetAllStudentDataList} from "../../../actions/CommonAction";
import {useEffectOnce} from "../../../helper/UseEffectOnce";

export default function AllStudentDataTableComponent() {
    const dispatch = useDispatch();
    const studentListArray = useSelector((state) => state.allStudentDataList);
    const [search, setSearch] = useState("")
    const [filterStudent, setFilterStudent] = useState([])
    const tableColumns = [
        {
            name: "Name",
            selector: (row) => row?.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row?.email,
            sortable: true,
        },
        {
            name: "Father Name",
            selector: (row) => row?.father_name,
            sortable: true,
        },
        {
            name: "Mother Name",
            selector: (row) => row?.mother_name,
            sortable: true,
        },
        {
            name: "School Name",
            selector: (row) => row?.school_name,
            sortable: true,
        },
        {
            name: "Board",
            selector: (row) => row?.school_board_name,
            sortable: true,
        },
        {
            name: "Class",
            selector: (row) => row?.student_class,
            sortable: true,
        },
        {
            name: "State",
            selector: (row) => row?.state,
            sortable: true,
        },
        {
            name: "City",
            selector: (row) => row?.city,
            sortable: true,
        },
        {
            name: "Active",
            selector: (row) => (row?.is_active) ? 'Active' :'Inactive',
            sortable: true,
        }
    ]
    useEffectOnce(() =>{
        dispatch(actionToGetAllStudentDataList());
    },[]);
    useEffect(() => {
        const resultName = studentListArray?.studentData.filter((student) => {
            return student?.name?.toLowerCase().match(search?.toLowerCase());
        });
        setFilterStudent(resultName);
    }, [search,studentListArray]);
    return (
        <div className={"container-fluid pt-4 px-4 datatable_container_main_div_section"}>
        <div className={"bg-light rounded h-100 p-4"}>
            {(studentListArray?.loading ) ?
                <div className={"d-flex justify-content-center h-100"}>
                    <div className={"spinner-border"} role={"status"}>
                        <span className={"sr-only"}>Loading...</span>
                    </div>
                </div>
                :
                    <DataTable
                        title="Student List"
                        columns={tableColumns}
                        data={filterStudent}
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
            }
            </div>
        </div>
    )
}