import {
    ALL_SCHOOL_BOARD_DATA_LIST_REQUEST,
    ALL_SCHOOL_BOARD_DATA_LIST_SUCCESS,
    ALL_SUBJECT_DATA_LIST_REQUEST,
    ALL_SUBJECT_DATA_LIST_SUCCESS,
    ANNOTATOR_UNDO_REDO_CAPTURE,
    ANNOTATOR_USER_ON_CAPTURE,
    CALL_SOCKET_MESSAGE_BROADCAST,
    CAPTURE_ANNOTATOR_JSON_DATA,
    CHAT_MODULE_ALL_STARTED_CALL,
    CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS,
    CHAT_MODULE_CURRENT_CALL_GROUP_DATA,
    CHAT_MODULE_INCOMING_CALL_GROUP_DATA,
    CHAT_MODULE_NEW_USER_ADDED_IN_CURRENT_CALL,
    CHAT_MODULE_NEW_USER_LEAVE_CURRENT_CALL,
    GET_IP_ADDRESS,
    OPEN_CLOSE_LOGIN_POPUP,
    OPEN_CLOSE_SIGNUP_POPUP,
    ALL_STUDENT_SUBSCRIPTION_DATA_LIST_REQUEST,
    ALL_STUDENT_SUBSCRIPTION_DATA_LIST_SUCCESS,
    ALL_STUDENT_DATA_LIST_REQUEST,
    ALL_STUDENT_DATA_LIST_SUCCESS,
    STUDENT_ALL_CLASS_LIST_REQUEST,
    STUDENT_ALL_CLASS_LIST_SUCCESS,
    STUDENT_ALL_TIME_CLASS_LIST_SUCCESS,
    STUDENT_ALL_TODAY_CLASS_LIST_SUCCESS,
    ALL_TEACHER_DATA_LIST_REQUEST,
    ALL_TEACHER_DATA_LIST_SUCCESS,
    ALL_CLASSES_DATA_LIST_REQUEST,
    ALL_CLASSES_DATA_LIST_SUCCESS,
    TEACHER_ALL_CLASS_LIST_REQUEST,
    TEACHER_ALL_CLASS_LIST_SUCCESS,
    TEACHER_ALL_DEMO_CLASS_LIST_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    WINDOW_RESIZE_COUNT,
    OPEN_CLOSE_TEACHER_RATING_POPUP,
    ALL_NEW_STUDENT_PROFILE_DATA_LIST_SUCCESS,
    ALL_NEW_STUDENT_PROFILE_DATA_LIST_REQUEST,
    ALL_ATTENDANCE_AND_ASSIGNMENT_REQUEST,
    ALL_ATTENDANCE_AND_ASSIGNMENT_SUCCESS,
    ALL_DEMO_CLASSES_REQUEST,
    ALL_DEMO_CLASSES_SUCCESS,
    ALL_TEACHER_DATA_TO_ASSIGN_CLASS_REQUEST,
    ALL_TEACHER_DATA_TO_ASSIGN_CLASS_SUCCESS,
    LATEST_TEACHER_DATA_LIST_REQUEST,
    LATEST_TEACHER_DATA_LIST_SUCCESS,
    LATEST_STUDENT_PROFILE_DATA_LIST_REQUEST,
    LATEST_STUDENT_PROFILE_DATA_LIST_SUCCESS,
    OPEN_CLOSE_CLASS_ASSIGN_POPUP,
    ALL_CLASS_TO_ASSIGN_CLASS_REQUEST,
    ALL_CLASS_TO_ASSIGN_CLASS_SUCCESS,
    LATEST_SUBSCRIPTION_DATA_LIST_REQUEST,
    LATEST_SUBSCRIPTION_DATA_LIST_SUCCESS,
    LATEST_DEMO_CLASSES_REQUEST,
    TODAY_PROFILE_DATA_LIST_REQUEST,
    TODAY_PROFILE_DATA_LIST_SUCCESS,
    OPEN_CLOSE_TEACHER_EDIT_POPUP,
    LATEST_DEMO_CLASSES_SUCCESS,
    ALL_RECORDED_CLASSES_REQUEST,
    ALL_RECORDED_CLASSES_SUCCESS,
    TEACHER_ALL_TODAY_CLASS_LIST_SUCCESS,
    TEACHER_ALL_TODAY_CLASS_LIST_REQUEST,
    TEACHER_ALL_DEMO_CLASS_LIST_REQUEST,
    STUDENT_ALL_DEMO_CLASS_LIST_REQUEST,
    STUDENT_ALL_DEMO_CLASS_LIST_SUCCESS,
    STUDENT_ALL_TODAY_CLASS_LIST_REQUEST,
    EDITOR_ACTIVE_EDITOR_JSON,
    TEACHER_CLASS_ATTEND_WITH_ASSIGNMENT_DATA_REQUEST,
    TEACHER_CLASS_ATTEND_WITH_ASSIGNMENT_DATA_SUCCESS,
    STUDENT_ALL_TIME_CLASS_LIST_REQUEST, ZOOM_IN_ZOOM_OUT_TEACHER_VIDEO, IN_CLASS_STATUS_TEACHER_STUDENT
} from "../constants/CommonConstants";

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return { loading: false, userInfo: {}};
        default:
            return state;
    }
};
export const allSubjectDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_SUBJECT_DATA_LIST_REQUEST:
            return { loading: true,subjectData:[] ,prevId:action.payload};
        case ALL_SUBJECT_DATA_LIST_SUCCESS:
            return { loading: false,subjectData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const allStudentDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_STUDENT_DATA_LIST_REQUEST:
            return { loading: true,studentData:[] ,prevId:action.payload};
        case ALL_STUDENT_DATA_LIST_SUCCESS:
            return { loading: false,studentData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};

export const allStudentDemoDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_ALL_DEMO_CLASS_LIST_REQUEST:
            return { loading: true,classData:[] ,prevId:action.payload};
        case STUDENT_ALL_DEMO_CLASS_LIST_SUCCESS:
            return { loading: false,classData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const editorActiveEditorJsonReducer = (state = {}, action) => {
    switch (action.type) {
        case EDITOR_ACTIVE_EDITOR_JSON:
            return action.payload;
        default:
            return state;
    }
};

export const inClassStatusTeacherStudentReducer = (state = {}, action) => {
    switch (action.type) {
        case IN_CLASS_STATUS_TEACHER_STUDENT:
            return action.payload;
        default:
            return state;
    }
};
export const zoomInZoomOutTeacherVideoReducer = (state = {}, action) => {
    switch (action.type) {
        case ZOOM_IN_ZOOM_OUT_TEACHER_VIDEO:
            return action.payload;
        default:
            return state;
    }
};
export const allStudentTodayDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_ALL_TODAY_CLASS_LIST_REQUEST:
            return { loading: true,classData:[] ,prevId:action.payload};
        case STUDENT_ALL_TODAY_CLASS_LIST_SUCCESS:
            return { loading: false,classData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const teacherClassAttendWithAssignmentDataReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHER_CLASS_ATTEND_WITH_ASSIGNMENT_DATA_REQUEST:
            return { loading: true,classData:[] ,prevId:action.payload};
        case TEACHER_CLASS_ATTEND_WITH_ASSIGNMENT_DATA_SUCCESS:
            return { loading: false,classData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const allNewStudentProfileDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_NEW_STUDENT_PROFILE_DATA_LIST_REQUEST:
            return { loading: true,studentData:[] ,prevId:action.payload};
        case ALL_NEW_STUDENT_PROFILE_DATA_LIST_SUCCESS:
            return { loading: false,studentData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const todayStudentProfileDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case TODAY_PROFILE_DATA_LIST_REQUEST:
            return { loading: true,studentData:[] ,prevId:action.payload};
        case TODAY_PROFILE_DATA_LIST_SUCCESS:
            return { loading: false,studentData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const allStudentSubscriptionDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_STUDENT_SUBSCRIPTION_DATA_LIST_REQUEST:
            return { loading: true,studentData:[] ,prevId:action.payload};
        case ALL_STUDENT_SUBSCRIPTION_DATA_LIST_SUCCESS:
            return { loading: false,studentData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const allAttendanceAndAssignmentReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_ATTENDANCE_AND_ASSIGNMENT_REQUEST:
            return { loading: true,attendanceData:[] ,prevId:action.payload};
        case ALL_ATTENDANCE_AND_ASSIGNMENT_SUCCESS:
            return { loading: false,attendanceData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};

export const allTeacherDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_TEACHER_DATA_LIST_REQUEST:
            return { loading: true,teacherData:[] ,prevId:action.payload};
        case ALL_TEACHER_DATA_LIST_SUCCESS:
            return { loading: false,teacherData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const latestTeachersDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case LATEST_TEACHER_DATA_LIST_REQUEST:
            return { loading: true,teacherData:[] ,prevId:action.payload};
        case LATEST_TEACHER_DATA_LIST_SUCCESS:
            return { loading: false,teacherData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const latestSubscriptionsDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case LATEST_SUBSCRIPTION_DATA_LIST_REQUEST:
            return { loading: true,subscriptionData:[] ,prevId:action.payload};
        case LATEST_SUBSCRIPTION_DATA_LIST_SUCCESS:
            return { loading: false,subscriptionData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const latestStudentsDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case LATEST_STUDENT_PROFILE_DATA_LIST_REQUEST:
            return { loading: true,studentData:[] ,prevId:action.payload};
        case LATEST_STUDENT_PROFILE_DATA_LIST_SUCCESS:
            return { loading: false,studentData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const allClassesDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_CLASSES_DATA_LIST_REQUEST:
            return { loading: true,classesData:[] ,prevId:action.payload};
        case ALL_CLASSES_DATA_LIST_SUCCESS:
            return { loading: false,classesData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const allTeacherDataToAssignClassReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_TEACHER_DATA_TO_ASSIGN_CLASS_REQUEST:
            return { loading: true,teacherData:[] ,prevId:action.payload};
        case ALL_TEACHER_DATA_TO_ASSIGN_CLASS_SUCCESS:
            return { loading: false,teacherData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const allDemoClassesReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_DEMO_CLASSES_REQUEST:
            return { loading: true,classesData:[] ,prevId:action.payload};
        case ALL_DEMO_CLASSES_SUCCESS:
            return { loading: false,classesData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const allRecordedClassesReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_RECORDED_CLASSES_REQUEST:
            return { loading: true,classesData:[] ,prevId:action.payload};
        case ALL_RECORDED_CLASSES_SUCCESS:
            return { loading: false,classesData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const latestDemoClassesReducer = (state = {}, action) => {
    switch (action.type) {
        case LATEST_DEMO_CLASSES_REQUEST:
            return { loading: true,classesData:[] ,prevId:action.payload};
        case LATEST_DEMO_CLASSES_SUCCESS:
            return { loading: false,classesData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const allSchoolBoardDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_SCHOOL_BOARD_DATA_LIST_REQUEST:
            return { loading: true,boardData:[] ,prevId:action.payload};
        case ALL_SCHOOL_BOARD_DATA_LIST_SUCCESS:
            return { loading: false,boardData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const allClassToAssignClassReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_CLASS_TO_ASSIGN_CLASS_REQUEST:
            return { loading: true,classData:[] ,prevId:action.payload};
        case ALL_CLASS_TO_ASSIGN_CLASS_SUCCESS:
            return { loading: false,classData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const studentAllClassesListReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_ALL_CLASS_LIST_REQUEST:
            return { loading: true,classData:[] ,prevId:action.payload};
        case STUDENT_ALL_CLASS_LIST_SUCCESS:
            return { loading: false,classData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const teacherAllClassesListReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHER_ALL_CLASS_LIST_REQUEST:
            return { loading: true,classData:[] ,prevId:action.payload};
        case TEACHER_ALL_CLASS_LIST_SUCCESS:
            return { loading: false,classData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const teacherAllTodayClassesListReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHER_ALL_TODAY_CLASS_LIST_REQUEST:
            return { loading: true,classData:[] ,prevId:action.payload};
        case TEACHER_ALL_TODAY_CLASS_LIST_SUCCESS:
            return { loading: false,classData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const teacherAllDemoClassesListReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHER_ALL_DEMO_CLASS_LIST_REQUEST:
            return { loading: true,classData:[] ,prevId:action.payload};
        case TEACHER_ALL_DEMO_CLASS_LIST_SUCCESS:
            return { loading: false,classData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const captureAnnotatorJSONDataReducer = (state = {}, action) => {
    switch (action.type) {
        case CAPTURE_ANNOTATOR_JSON_DATA:
            return action.payload;
        default:
            return state;
    }
};
export const annotatorUserOnCaptureReducer = (state = {}, action) =>{
    switch (action.type){
        case ANNOTATOR_USER_ON_CAPTURE:
            return action.payload;
        default:
            return state;
    }
}
export const getCaptureAnnotatorUndoRedoReducer = (state = {}, action) =>{
    switch (action.type){
        case ANNOTATOR_UNDO_REDO_CAPTURE:
            return action.payload;
        default:
            return state;
    }
}
export const getIPAddressDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_IP_ADDRESS:
            return action.payload;
        default:
            return state;
    }
}

export const studentAllTimeClassListReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_ALL_TIME_CLASS_LIST_REQUEST:
            return { loading: true,classData:{} ,prevId:action.payload};
        case STUDENT_ALL_TIME_CLASS_LIST_SUCCESS:
            return { loading: false,classData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};

export const windowResizeCountReducer = (state = {}, action) => {
    switch (action.type) {
        case WINDOW_RESIZE_COUNT:
            return action.payload;
        default:
            return state;
    }
};
export const openCloseSignupPopupReducer = (state = {}, action) => {
    switch (action.type) {
        case OPEN_CLOSE_SIGNUP_POPUP:
            return action.payload;
        default:
            return state;
    }
};
export const openCloseClassAssignPopupReducer = (state = {}, action) => {
    switch (action.type) {
        case OPEN_CLOSE_CLASS_ASSIGN_POPUP:
            return action.payload;
        default:
            return state;
    }
};
export const openCloseEditTeacherPopupReducer = (state = {}, action) => {
    switch (action.type) {
        case OPEN_CLOSE_TEACHER_EDIT_POPUP:
            return action.payload;
        default:
            return state;
    }
};
export const openCloseTeacherRatingPopupReducer = (state = {}, action) => {
    switch (action.type) {
        case OPEN_CLOSE_TEACHER_RATING_POPUP:
            return action.payload;
        default:
            return state;
    }
};
export const openCloseLoginPopupReducer = (state = {}, action) => {
    switch (action.type) {
        case OPEN_CLOSE_LOGIN_POPUP:
            return action.payload;
        default:
            return state;
    }
};
export const chatModuleAllGroupStartedCallReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAT_MODULE_ALL_STARTED_CALL:
            return action.payload;
        default:
            return state;
    }
};
export const chatModuleIncomingCallGroupDataReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAT_MODULE_INCOMING_CALL_GROUP_DATA:
            return action.payload;
        default:
            return state;
    }
};
export const chatModuleCurrentCallGroupDataReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAT_MODULE_CURRENT_CALL_GROUP_DATA:
            return action.payload;
        default:
            return state;
    }
};
export const chatModuleNewUserLeaveUserInCallDataReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAT_MODULE_NEW_USER_LEAVE_CURRENT_CALL:
            return action.payload;
        default:
            return state;
    }
};
export const chatModuleCurrentCallGroupMembersReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS:
            return action.payload;
        default:
            return state;
    }
};
export const chatModuleNewUserAddedInCurrentCallReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAT_MODULE_NEW_USER_ADDED_IN_CURRENT_CALL:
            return action.payload;
        default:
            return state;
    }
};
export const callSocketMessageBroadcastReducer = (state = {}, action) => {
    switch (action.type) {
        case CALL_SOCKET_MESSAGE_BROADCAST:
            return action.payload;
        default:
            return state;
    }
};
