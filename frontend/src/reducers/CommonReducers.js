import {
    ALL_SCHOOL_BOARD_DATA_LIST_REQUEST,
    ALL_SCHOOL_BOARD_DATA_LIST_SUCCESS,
    ALL_SUBJECT_DATA_LIST_REQUEST,
    ALL_SUBJECT_DATA_LIST_SUCCESS,
    ANNOTATOR_UNDO_REDO_CAPTURE,
    ANNOTATOR_USER_ON_CAPTURE, CALL_SOCKET_MESSAGE_BROADCAST,
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
    STUDENT_ALL_CLASS_LIST_REQUEST,
    STUDENT_ALL_CLASS_LIST_SUCCESS, STUDENT_ALL_TIME_CLASS_LIST_SUCCESS,
    STUDENT_ALL_TODAY_CLASS_LIST_SUCCESS,
    TEACHER_ALL_CLASS_LIST_REQUEST,
    TEACHER_ALL_CLASS_LIST_SUCCESS,
    TEACHER_ALL_DEMO_CLASS_LIST_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    WINDOW_RESIZE_COUNT
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
export const studentAllTodayClassListReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_ALL_TODAY_CLASS_LIST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
export const studentAllTimeClassListReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_ALL_TIME_CLASS_LIST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
export const teacherAllDemoClassListReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHER_ALL_DEMO_CLASS_LIST_SUCCESS:
            return action.payload;
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
