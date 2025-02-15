import {
    STUDENT_ALL_DEMO_CLASS_LIST_SUCCESS,
    TEACHER_CLASS_ATTEND_WITH_ASSIGNMENT_DATA_SUCCESS
} from "../../constants/CommonConstants";
import moment from 'moment';

export function setAuthSignInByRole(payload){
    if(payload?.role === 1)
        localStorage.setItem('studentAuthentication',JSON.stringify(payload));
    else if(payload?.role === 2)
        localStorage.setItem('teacherAuthentication',JSON.stringify(payload));
    else if(payload?.role === 3)
        localStorage.setItem('superAdminAuthentication',JSON.stringify(payload));
}
export function formatTeacherAssignmentDataByDate(data, dispatch) {
    let finalClassData = [];
    let dateWiseDataKey = new Map();

    // Ensure data is sorted in descending order (latest date first)
    data.sort((a, b) => new Date(b.start_from_date_time) - new Date(a.start_from_date_time));

    data.forEach((classAttendData) => {
        let startDate = moment(classAttendData?.start_from_date_time).format('YYYY-MM-DD');

        if (!dateWiseDataKey.has(startDate)) {
            let dataDate = {
                date: startDate,
                classData: [classAttendData]
            };
            finalClassData.push(dataDate);
            dateWiseDataKey.set(startDate, finalClassData.length - 1);
        } else {
            finalClassData[dateWiseDataKey.get(startDate)].classData.push(classAttendData);
        }
    });

    dispatch({ type: TEACHER_CLASS_ATTEND_WITH_ASSIGNMENT_DATA_SUCCESS, payload: [...finalClassData] });
}
