import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../../../helper/UseEffectOnce";
import {actionToGetAllStudentDataList, actionToGetAllStudentSubscriptionDataList} from "../../../actions/CommonAction";
import DataTable from "react-data-table-component";

export default function AllSubscribedClassesComponent(){
    const dispatch = useDispatch();
    const studentListArray = useSelector((state) => state.allStudentSubscriptionDataList);
    const [search, setSearch] = useState("")
    const [FilterSubject, setFilterSubject] = useState([])
    const tableColumns = [
        {
            name: "Student Id",
            selector: (row) => row.subject_id,
            sortable: true,
        },
        {
            name: "Student Name",
            selector: (row) => row.student_name,
            sortable: true,
        },
        {
            name: "Student Email",
            selector: (row) => row.student_email,
            sortable: true,
        },
        {
            name: "Subject Name",
            selector: (row) => row.subject_name,
            sortable: true,
        },
        {
            name: "School Board",
            selector: (row) => row.school_board_name,
            sortable: true,
        },
        {
            name: "Subscription End Date",
            selector: (row) => row.student_subscription_end_date,
            sortable: true,
        },
        {
            name: " Assigned Teacher Name",
            selector: (row) => (row.teacher_name==null) ?'N/A' : row.teacher_name,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => <button class='btn btn-primary' onClick={() => alert(row.subject_id)}> Edit</button>,
        }
    ]
    useEffectOnce(() =>{
        dispatch(actionToGetAllStudentSubscriptionDataList());
    },[]);
    useEffect(() => {
        const resultName = studentListArray.studentData.filter((student) => {
            return student.student_name.toLowerCase().match(search.toLowerCase());
        });
        setFilterSubject(resultName);

    }, [search]);
    return (
        <div className={"container-fluid pt-4 px-4"}>
            <div className={"bg-light rounded h-100 p-4"}>
                {(studentListArray.loading) ?
                    <div className={"d-flex justify-content-center h-100"}>
                        <div className={"spinner-border"} role={"status"}>
                            <span className={"sr-only"}>Loading...</span>
                        </div>
                    </div> :
                <DataTable
                    title="Student Subscription"
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