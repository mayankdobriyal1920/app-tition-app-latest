import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../../../helper/UseEffectOnce";
import {
    actionToGetAllStudentSubscriptionDataList,
    actionToGetLatestDemoClassesDetails,
    actionToGetLatestStudentProfileDataList, actionToGetLatestSubscriptionsDataList,
    actionToGetLatestTeachersDataList, actionToGetTodayProfileDataList
} from "../../../actions/CommonAction";
import moment from "moment/moment";
// import {_getFirstLatterOfName} from "../../../helper/CommonHelper";
export default function SuperAdminDesktopDashboard() {
    const dispatch = useDispatch();
    const teacherListArray = useSelector((state) => state?.latestTeacherDataList);
    const studentListArray = useSelector((state) => state?.latestStudentDataList);
    const subscriptionListArray = useSelector((state) => state?.latestSubscriptionDataList);
    const demoClassListArray = useSelector((state) => state?.latestDemoClassDataList);
    const allStudentListArray = useSelector((state) => state?.allStudentDataList);
    const allTeacherListArray = useSelector((state) => state.allTeacherDataList);
    const allSubscriptionListArray = useSelector((state) => state.allStudentSubscriptionDataList);
    const todayStudentProfileListArray = useSelector((state) => state.todayStudentProfileDataList);
    useEffectOnce(() =>{
        dispatch(actionToGetLatestTeachersDataList());
        dispatch(actionToGetLatestStudentProfileDataList());
        dispatch(actionToGetLatestSubscriptionsDataList());
        dispatch(actionToGetLatestDemoClassesDetails());
        dispatch(actionToGetAllStudentSubscriptionDataList());
        dispatch(actionToGetTodayProfileDataList());
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
                                <p className="mb-2">Total Student</p>
                                <h6 className="mb-0">{allStudentListArray?.studentData?.length}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i className="fa fa-chart-bar fa-3x text-primary"></i>
                            <div className="ms-3">
                                <p className="mb-2">Total Subscription</p>
                                <h6 className="mb-0">{allSubscriptionListArray?.studentData?.length}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i className="fa fa-chart-area fa-3x text-primary"></i>
                            <div className="ms-3">
                                <p className="mb-2">Today Profile</p>
                                <h6 className="mb-0">{todayStudentProfileListArray?.studentData?.length}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i className="fa fa-chart-pie fa-3x text-primary"></i>
                            <div className="ms-3">
                                <p className="mb-2">Total Teachers</p>
                                <h6 className="mb-0">{allTeacherListArray?.teacherData?.length}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid pt-4 px-4">
                <div className="bg-light text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Recent Profiles</h6>
                        <a href="/dashboard/new-student-profile-datatable">Show All</a>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                            <tr className="text-dark">
                                <th scope="col">Student Name</th>
                                <th scope="col">Student Email</th>
                                <th scope="col">Student Class</th>
                                <th scope="col">Board</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(subscriptionListArray?.subscriptionData?.map((subscriptionData,index)=>(
                                <tr>
                                    <td>{subscriptionData?.name}</td>
                                    <td>{subscriptionData?.email}</td>
                                    <td>{subscriptionData?.student_class}th</td>
                                    <td>{subscriptionData?.school_board_name}</td>
                                </tr>
                            )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="container-fluid pt-4 px-4">
                <div className="bg-light text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Recent Subscriptions</h6>
                        <a href="/dashboard/all-subscribed-classes">Show All</a>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                            <tr className="text-dark">
                                <th scope="col">Student Name</th>
                                <th scope="col">Student Email</th>
                                <th scope="col">Student Class</th>
                                <th scope="col">Board</th>
                                <th scope="col">Subscription End Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(subscriptionListArray?.subscriptionData?.map((subscriptionData,index)=>(
                            <tr>
                                <td>{subscriptionData?.name}</td>
                                <td>{subscriptionData?.email}</td>
                                <td>{subscriptionData?.student_class}th</td>
                                <td>{subscriptionData?.school_board_name}</td>
                                <td>{moment(subscriptionData?.subscription_end_date).format('D MMM YYYY, hh:mm a')}</td>
                            </tr>
                            )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="container-fluid pt-4 px-4">
                <div className="bg-light text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Latest Demo Classes</h6>
                        <a href="/dashboard/all-demo-classes">Show All</a>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                            <tr className="text-dark">
                                <th scope="col">Student Name</th>
                                <th scope="col">Student Email</th>
                                <th scope="col">Student Class</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Board</th>

                            </tr>
                            </thead>
                            <tbody>
                            {(demoClassListArray?.classesData?.map((classData,index)=>(
                                <tr>
                                    <td>{classData?.student_name}</td>
                                    <td>{classData?.student_email}</td>
                                    <td>{classData?.student_class}th</td>
                                    <td>{classData?.subject_name}</td>
                                    <td>{classData?.school_board_name}</td>

                                </tr>
                            )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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
                                    {/*<div className={"name_initial rounded-circle flex-shrink-0"}>{_getFirstLatterOfName(teacherData?.name)}</div>*/}
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

                                    {/*<div className={"name_initial name_initial rounded-circle flex-shrink-0"}>{_getFirstLatterOfName(studentData?.name)}*/}
                                    {/*</div>*/}
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
