import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../../../helper/UseEffectOnce";
import {
    actionToGetAllStudentDataList, actionToGetLatestStudentProfileDataList,
    actionToGetLatestTeachersDataList
} from "../../../actions/CommonAction";
import moment from "moment/moment";
import {_getFirstLatterOfName} from "../../../helper/CommonHelper";
export default function SuperAdminDesktopDashboard() {
    const dispatch = useDispatch();
    const teacherListArray = useSelector((state) => state.latestTeacherDataList);
    const studentListArray = useSelector((state) => state.latestStudentDataList);
    useEffectOnce(() =>{
        dispatch(actionToGetLatestTeachersDataList());
        dispatch(actionToGetLatestStudentProfileDataList());
    },[]);
    return (
        <div className="content">
            {/*-- Sale & Revenue Start --*/}
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i className="fa fa-chart-line fa-3x text-primary"></i>
                            <div className="ms-3">
                                <p className="mb-2">Today Sale</p>
                                <h6 className="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i className="fa fa-chart-bar fa-3x text-primary"></i>
                            <div className="ms-3">
                                <p className="mb-2">Total Sale</p>
                                <h6 className="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i className="fa fa-chart-area fa-3x text-primary"></i>
                            <div className="ms-3">
                                <p className="mb-2">Today Revenue</p>
                                <h6 className="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i className="fa fa-chart-pie fa-3x text-primary"></i>
                            <div className="ms-3">
                                <p className="mb-2">Total Revenue</p>
                                <h6 className="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*-- Recent Sales Start --*/}
            <div className="container-fluid pt-4 px-4">
                <div className="bg-light text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Recent Salse</h6>
                        <a href="">Show All</a>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                            <tr className="text-dark">
                                <th scope="col"><input className="form-check-input" type="checkbox"/></th>
                                <th scope="col">Date</th>
                                <th scope="col">Invoice</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><input className="form-check-input" type="checkbox"/></td>
                                <td>01 Jan 2045</td>
                                <td>INV-0123</td>
                                <td>Jhon Doe</td>
                                <td>$123</td>
                                <td>Paid</td>
                                <td><a className="btn btn-sm btn-primary" href="">Detail</a></td>
                            </tr>
                            <tr>
                                <td><input className="form-check-input" type="checkbox"/></td>
                                <td>01 Jan 2045</td>
                                <td>INV-0123</td>
                                <td>Jhon Doe</td>
                                <td>$123</td>
                                <td>Paid</td>
                                <td><a className="btn btn-sm btn-primary" href="">Detail</a></td>
                            </tr>
                            <tr>
                                <td><input className="form-check-input" type="checkbox"/></td>
                                <td>01 Jan 2045</td>
                                <td>INV-0123</td>
                                <td>Jhon Doe</td>
                                <td>$123</td>
                                <td>Paid</td>
                                <td><a className="btn btn-sm btn-primary" href="">Detail</a></td>
                            </tr>
                            <tr>
                                <td><input className="form-check-input" type="checkbox"/></td>
                                <td>01 Jan 2045</td>
                                <td>INV-0123</td>
                                <td>Jhon Doe</td>
                                <td>$123</td>
                                <td>Paid</td>
                                <td><a className="btn btn-sm btn-primary" href="">Detail</a></td>
                            </tr>
                            <tr>
                                <td><input className="form-check-input" type="checkbox"/></td>
                                <td>01 Jan 2045</td>
                                <td>INV-0123</td>
                                <td>Jhon Doe</td>
                                <td>$123</td>
                                <td>Paid</td>
                                <td><a className="btn btn-sm btn-primary" href="">Detail</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*-- Recent Sales end --*/}
            {/*-- Widgets Start --*/}
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <div className="col-sm-12 col-md-6 col-xl-6">
                        <div className="h-100 bg-light rounded p-4">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h6 className="mb-0">Teachers</h6>
                                <a href="/dashboard/teacher-datatable">Show All</a>
                            </div>
                            {(teacherListArray?.teacherData?.map((teacherData,index)=>(
                                <div className="d-flex align-items-center border-bottom py-3">
                                    <div className={"name_initial rounded-circle flex-shrink-0"}>{_getFirstLatterOfName(teacherData?.name)}
                                    </div>
                                    <div className="w-100 ms-3">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h6 className="mb-0">{teacherData?.name}</h6>
                                            <small>{moment(teacherData?.created_at).format('LLL')}</small>
                                        </div>
                                        <span>{teacherData?.highest_qualification},{teacherData?.school_board_name}</span>
                                    </div>
                                </div>
                                )))}
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-6">
                        <div className="h-100 bg-light rounded p-4">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h6 className="mb-0">Students</h6>
                                <a href="/dashboard/student-datatable">Show All</a>
                            </div>
                            {(studentListArray?.studentData?.map((studentData,index)=>(
                                <div className="d-flex align-items-center border-bottom py-3">

                                    <div className={"name_initial name_initial rounded-circle flex-shrink-0"}>{_getFirstLatterOfName(studentData?.name)}
                                    </div>
                                    <div className="w-100 ms-3">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h6 className="mb-0">{studentData?.name}</h6>
                                            <small>{moment(studentData?.created_at).format('LLL')}</small>
                                        </div>
                                        <span>{studentData?.student_class},{studentData?.school_board_name}</span>
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>
                </div>
            </div>
            {/*-- Widgets End --*/}
        </div>
    )
}
