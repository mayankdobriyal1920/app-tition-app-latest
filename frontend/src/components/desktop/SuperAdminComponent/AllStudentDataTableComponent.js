import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import DataTable from "react-data-table-component";
import {actionToGetAllStudentDataList} from "../../../actions/CommonAction";
import {useEffectOnce} from "../../../helper/UseEffectOnce";

export default function AllStudentDataTableComponent() {
    const dispatch = useDispatch();
    const studentListArray = useSelector((state) => state.allStudentDataList);
    const [search, setSearch] = useState("")
    const [FilterSubject, setFilterSubject] = useState([])
    const tableColumns = [
        {
            name: "Student Id",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Father Name",
            selector: (row) => row.father_name,
            sortable: true,
        },
        {
            name: "Mother Name",
            selector: (row) => row.mother_name,
            sortable: true,
        },
        {
            name: "School Name",
            selector: (row) => row.school_name,
            sortable: true,
        },
        {
            name: "Board",
            selector: (row) => row.school_board_name,
            sortable: true,
        },
        {
            name: "Class",
            selector: (row) => row.student_class,
            sortable: true,
        },
        {
            name: "State",
            selector: (row) => row.state,
            sortable: true,
        },
        {
            name: "City",
            selector: (row) => row.city,
            sortable: true,
        },
        {
            name: "Active",
            selector: (row) => (row.is_active=='1') ? 'Active' :'Inactive',
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => <button class='btn btn-primary' onClick={() => alert(row.id)}> Edit</button>,
        }
    ]
    useEffectOnce(() =>{
        dispatch(actionToGetAllStudentDataList());
        console.log(studentListArray);
    },[]);
    useEffect(() => {
        const resultName = studentListArray.studentData.filter((student) => {
            return student.name.toLowerCase().match(search.toLowerCase());
        });
        setFilterSubject(resultName);

    }, [search]);
    return (
        <div className={"container-fluid pt-4 px-4"}>
        <div className={"bg-light rounded h-100 p-4"}>
            {(studentListArray.loading ) ?
                <div className={"d-flex justify-content-center h-100"}>
                    <div className={"spinner-border"} role={"status"}>
                        <span className={"sr-only"}>Loading...</span>
                    </div>
                </div> :
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
            }
            </div>
        </div>
    )
}