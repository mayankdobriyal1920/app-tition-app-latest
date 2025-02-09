import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    OPEN_CLOSE_SIGNUP_POPUP,
    OPEN_CLOSE_LOGIN_POPUP,
    WINDOW_RESIZE_COUNT,
    USER_SIGNOUT,
    ALL_SUBJECT_DATA_LIST_REQUEST,
    ALL_SUBJECT_DATA_LIST_SUCCESS,
    ALL_SCHOOL_BOARD_DATA_LIST_REQUEST,
    ALL_SCHOOL_BOARD_DATA_LIST_SUCCESS,
    ALL_STUDENT_DATA_LIST_REQUEST,
    ALL_STUDENT_DATA_LIST_SUCCESS,
    STUDENT_ALL_CLASS_LIST_REQUEST,
    STUDENT_ALL_CLASS_LIST_SUCCESS,
    STUDENT_ALL_TODAY_CLASS_LIST_SUCCESS,
    ALL_TEACHER_DATA_LIST_REQUEST,
    ALL_TEACHER_DATA_LIST_SUCCESS,
    ALL_CLASSES_DATA_LIST_REQUEST,
    ALL_CLASSES_DATA_LIST_SUCCESS,
    LATEST_TEACHER_DATA_LIST_SUCCESS,
    LATEST_TEACHER_DATA_LIST_REQUEST,
    TEACHER_ALL_CLASS_LIST_REQUEST,
    TEACHER_ALL_DEMO_CLASS_LIST_SUCCESS,
    TEACHER_ALL_CLASS_LIST_SUCCESS,
    CHAT_MODULE_ALL_STARTED_CALL,
    CHAT_MODULE_INCOMING_CALL_GROUP_DATA,
    GET_IP_ADDRESS,
    CAPTURE_ANNOTATOR_JSON_DATA,
    CHAT_MODULE_CURRENT_CALL_GROUP_DATA,
    CHAT_MODULE_NEW_USER_ADDED_IN_CURRENT_CALL,
    CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS,
    CALL_SOCKET_MESSAGE_BROADCAST,
    STUDENT_ALL_TIME_CLASS_LIST_SUCCESS,
    OPEN_CLOSE_TEACHER_RATING_POPUP,
    ALL_STUDENT_SUBSCRIPTION_DATA_LIST_REQUEST,
    ALL_STUDENT_SUBSCRIPTION_DATA_LIST_SUCCESS,
    ALL_NEW_STUDENT_PROFILE_DATA_LIST_REQUEST,
    ALL_NEW_STUDENT_PROFILE_DATA_LIST_SUCCESS,
    ALL_ATTENDANCE_AND_ASSIGNMENT_REQUEST,
    ALL_ATTENDANCE_AND_ASSIGNMENT_SUCCESS,
    ALL_DEMO_CLASSES_REQUEST,
    ALL_DEMO_CLASSES_SUCCESS,
    LATEST_STUDENT_PROFILE_DATA_LIST_REQUEST,
    LATEST_STUDENT_PROFILE_DATA_LIST_SUCCESS,
    OPEN_CLOSE_CLASS_ASSIGN_POPUP,
    ALL_TEACHER_DATA_TO_ASSIGN_CLASS_REQUEST,
    ALL_TEACHER_DATA_TO_ASSIGN_CLASS_SUCCESS,
    ALL_CLASS_TO_ASSIGN_CLASS_REQUEST,
    ALL_CLASS_TO_ASSIGN_CLASS_SUCCESS,
    LATEST_SUBSCRIPTION_DATA_LIST_REQUEST,
    LATEST_SUBSCRIPTION_DATA_LIST_SUCCESS,
    LATEST_DEMO_CLASSES_REQUEST,
    LATEST_DEMO_CLASSES_SUCCESS,
    TODAY_PROFILE_DATA_LIST_REQUEST,
    TODAY_PROFILE_DATA_LIST_SUCCESS,
    OPEN_CLOSE_CLASS_EDIT_TEACHER_POPUP,
    OPEN_CLOSE_TEACHER_EDIT_POPUP,
    ALL_RECORDED_CLASSES_REQUEST,
    ALL_REQUESTED_CLASSES_SUCCESS,
    ALL_RECORDED_CLASSES_SUCCESS,
    TEACHER_ALL_TODAY_CLASS_LIST_REQUEST,
    TEACHER_ALL_TODAY_CLASS_LIST_SUCCESS,
    TEACHER_ALL_DEMO_CLASS_LIST_REQUEST,
    STUDENT_ALL_DEMO_CLASS_LIST_REQUEST,
    STUDENT_ALL_TODAY_CLASS_LIST_REQUEST,
    STUDENT_ALL_DEMO_CLASS_LIST_SUCCESS,
    EDITOR_ACTIVE_EDITOR_JSON,
    TEACHER_CLASS_ATTEND_WITH_ASSIGNMENT_DATA_REQUEST,
    STUDENT_ALL_TIME_CLASS_LIST_REQUEST,
    ZOOM_IN_ZOOM_OUT_TEACHER_VIDEO, IN_CLASS_STATUS_TEACHER_STUDENT
} from "../constants/CommonConstants";

import Axios from "axios";
import {handleWebSocketEvent, sendWebsocketRequest} from "../helper/WebSocketHelper";
import {formatTeacherAssignmentDataByDate, setAuthSignInByRole} from "./helper/CommonActionHelper";
import {cloneDeep} from "lodash";
import {_generateUniqueId} from "../helper/CommonHelper";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import {isTeacherMasterLogin} from "../middlewear/auth";

const api = Axios.create({
    baseURL: `https://121tuition.in/api-call-tutor/`
})
export const callInsertDataFunction = (payload) => async () => {
    try {
        const { data } = await api.post('common/insertCommonApiCall',payload);
        return data;
    } catch (error) {
        console.log(error,'error');
    }
}

export const commonUpdateFunction = (payload) => async () => {
    try {
        const { data } = await api.post('common/updateCommonApiCall',payload);
        return data;
    } catch (error) {
        console.log(error,'error');
    }
}

export const callDeleteDataFunction = (payload) => async () => {
    try {
        const { data } = await api.post('common/deleteCommonApiCall',payload);
        return data;
    } catch (error) {
        console.log(error,'error');
    }
}

export const handleWebSocketEventCall = (data) => async (dispatch,getState) => {
    handleWebSocketEvent(dispatch,getState(),data);
}
export const actionToSetTeacherZoomInOut = (groupId) => async (dispatch) => {
    dispatch(actionToSetTeacherZoomInOutLocally());
    sendWebsocketRequest(JSON.stringify({
        clientId: localStorage.getItem('clientId'),
        type: 'actionToSetTeacherZoomInOutLocally',
        groupId:groupId
    }));
}
export const actionToSetTeacherZoomInOutLocally = () => async (dispatch,getState) => {
    const zoomInZoomOutTeacherVideo = getState().zoomInZoomOutTeacherVideo;
    dispatch({type: ZOOM_IN_ZOOM_OUT_TEACHER_VIDEO, payload:!zoomInZoomOutTeacherVideo});
}
export const actionToSetWindowSizeCount = (count) => async (dispatch) => {
    dispatch({type: WINDOW_RESIZE_COUNT, payload:count});
}
export const actionToOpenCloseSignupPopup = (action) => async (dispatch) => {
    dispatch({ type: OPEN_CLOSE_SIGNUP_POPUP, payload: {isOpen:action}});
};
export const actionToOpenCloseLoginPopup = (action) => async (dispatch) => {
    dispatch({ type: OPEN_CLOSE_LOGIN_POPUP, payload: {isOpen:action}});
};
export const actionToOpenCloseClassAssignPopup = (action,data) => async (dispatch) => {
    let payload = {isOpen:action,dropdownData:data};
    dispatch({ type: OPEN_CLOSE_CLASS_ASSIGN_POPUP, payload: cloneDeep(payload)});
};

export const actionToOpenCloseEditTeacherPopup = (action,data) => async (dispatch) => {
    let payload = {isOpen:action,dropdownData:data};
    dispatch({ type: OPEN_CLOSE_TEACHER_EDIT_POPUP, payload: cloneDeep(payload)});
};

export const actionToSetTeacherStudentInClassStatus = (status) => async (dispatch) => {
    dispatch({ type: IN_CLASS_STATUS_TEACHER_STUDENT, payload: status});
};
export const actionToSetDataInAssignPopupLocally = (selectedClassAssignId,start_from_date_time,dateTime) => async (dispatch,getState) => {
    let {dropdownData} = getState().openCloseClassAssignPopup;
    let foundIndex = null;
    dropdownData?.class_timetable_with_class_batch_assigned?.map((classData,key)=>{
        if(classData?.start_from_date_time === start_from_date_time){
            foundIndex = key;
        }
    })
    if(foundIndex !== null){
        dropdownData.class_timetable_with_class_batch_assigned[foundIndex].start_from_date_time = dateTime;
    }else{
        dropdownData.class_timetable_with_class_batch_assigned.push({start_from_date_time:dateTime,id:_generateUniqueId()})
    }
    let payload = {isOpen:true,dropdownData:dropdownData};
    dispatch({ type: OPEN_CLOSE_CLASS_ASSIGN_POPUP, payload: cloneDeep(payload)});
}

export const actionToRescheduleClassTime = (selectedClassAssignId,profile_subject_with_batch_id,start_from_date_time,dateTime) => async (dispatch) => {
    let setData = `start_from_date_time = ?,class_end_date_time = ?`;
    let whereCondition = `class_assigned_teacher_batch_id = '${selectedClassAssignId}' and start_from_date_time = '${start_from_date_time}'`;
    let dataToSend = {column: setData, value: [dateTime,null], whereCondition: whereCondition, tableName: 'class_timetable_with_class_batch_assigned'};
    await dispatch(commonUpdateFunction(dataToSend));
    dispatch(actionToSetDataInAssignPopupLocally(selectedClassAssignId,start_from_date_time,dateTime));
    dispatch(actionToGetAllDemoClassesDetails(true));
    dispatch(actionToGetAllClassesDataList(true));
    sendWebsocketRequest(JSON.stringify({
        clientId: localStorage.getItem('clientId'),
        type: 'refreshClassListDataForUser',
        profile_subject_with_batch_id:profile_subject_with_batch_id
    }));
}

export const actionToInsertRescheduleClassTime = (selectedClassAssignId,profile_subject_with_batch_id,start_from_date_time,dateTime) => async (dispatch) => {

    let timetableId = _generateUniqueId()
    let aliasArray = ['?', '?', '?'];
    let columnArray = ['id', 'start_from_date_time', 'class_assigned_teacher_batch_id'];
    let valuesArray = [timetableId, dateTime, selectedClassAssignId];
    let insertData = {
        alias: aliasArray,
        column: columnArray,
        values: valuesArray,
        tableName: 'class_timetable_with_class_batch_assigned'
    };
    await dispatch(callInsertDataFunction(insertData));

    dispatch(actionToSetDataInAssignPopupLocally(selectedClassAssignId,start_from_date_time,dateTime));
    dispatch(actionToGetAllDemoClassesDetails(true));
    dispatch(actionToGetAllClassesDataList(true));
    sendWebsocketRequest(JSON.stringify({
        clientId: localStorage.getItem('clientId'),
        type: 'refreshClassListDataForUser',
        profile_subject_with_batch_id:profile_subject_with_batch_id
    }));
}

export const actionToUpdateClassAssignedBatchData = (selectedClassAssignId,profile_subject_with_batch_id,selectedTeacherId,classBatchName) => async (dispatch) => {
    let setData = `class_batch_name = ?,teacher_id = ?`;
    let whereCondition = `id = '${selectedClassAssignId}'`;
    let dataToSend = {column: setData, value: [classBatchName,selectedTeacherId], whereCondition: whereCondition, tableName: 'class_assigned_teacher_batch'};
    await dispatch(commonUpdateFunction(dataToSend));
    dispatch(actionToGetAllDemoClassesDetails(true));
    dispatch(actionToGetAllClassesDataList(true));
    sendWebsocketRequest(JSON.stringify({
        clientId: localStorage.getItem('clientId'),
        type: 'refreshClassListDataForUser',
        profile_subject_with_batch_id:profile_subject_with_batch_id
    }));
}
export const actionToCreateAndAssignClassData = (payload) => async (dispatch) => {
    let classAssignId = _generateUniqueId();
    if(payload?.class_assign_id){
        classAssignId = payload?.class_assign_id
    }else{
        let aliasArray = ['?','?','?','?','?','?','?','?','?'];
        let columnArray = ['id','teacher_id','starting_from_date','batch','is_demo_class','subject_id','school_board','student_class','class_batch_name'];
        let valuesArray = [classAssignId,payload?.teacher_id,payload?.starting_from_date ? payload?.starting_from_date : null,payload?.batch,payload?.is_demo_class,payload?.subject_id,payload?.school_board,payload?.student_class,payload?.class_batch_name];
        let insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'class_assigned_teacher_batch'};
        await dispatch(callInsertDataFunction(insertData));
    }


    if(!payload?.is_demo_class) {
        await Promise.all(
            payload?.all_class_date_time?.map(async (dateTime) => {
                let timetableId = _generateUniqueId()
                let aliasArray = ['?', '?', '?'];
                let columnArray = ['id', 'start_from_date_time', 'class_assigned_teacher_batch_id'];
                let valuesArray = [timetableId, dateTime, classAssignId];
                let insertData = {
                    alias: aliasArray,
                    column: columnArray,
                    values: valuesArray,
                    tableName: 'class_timetable_with_class_batch_assigned'
                };
                await dispatch(callInsertDataFunction(insertData));
            })
        )
    }


    let setData = `class_assigned_teacher_batch_id = ?`;
    let whereCondition = `id = '${payload?.profile_subject_with_batch_id}'`;
    let dataToSend = {column: setData, value: [classAssignId], whereCondition: whereCondition, tableName: 'profile_subject_with_batch'};
    await dispatch(commonUpdateFunction(dataToSend));

    dispatch(actionToGetAllDemoClassesDetails(true));
    dispatch(actionToGetAllClassesDataList(true));
    sendWebsocketRequest(JSON.stringify({
        clientId: localStorage.getItem('clientId'),
        type: 'refreshClassListDataForUser',
        profile_subject_with_batch_id:payload.profile_subject_with_batch_id
    }));
};

export const actionToGetUserByMobileNumber = (mobileNumber) => async () => {
    const {data} = await api.post(`common/actionToValidateMobileNumberApiCall`,{mobileNumber});
    return data.response;
};
export const actionToVerifyUserOtpByMobileNumber = (mobileNumber,otp) => async () => {
    const {data} = await api.post(`common/actionToVerifyUserOtpByMobileNumberApiCall`,{mobileNumber,otp});
    return data.response;
};
export const actionToSigninWithPassword = (mobileNumber,password,setVerifyDataLoader,setPasswordValidationError) => async (dispatch) => {
    const {data} = await api.post(`common/actionToSigninWithPasswordApiCall`,{mobileNumber,password});

    if(data.response?.status){
        dispatch(actionToLoginUserByUserData(data.response));
    }else{
        setPasswordValidationError('Sorry password you have entered is wrong!!')
    }
    setVerifyDataLoader(false);
    return data.response;
};
export const actionToSendOtpInMobileNumber = (mobileNumber) => async () => {
    const {data} = await api.post(`common/actionToSendOtpInMobileNumberApiCall`,{mobileNumber});
    return data.response;
};
export const actionToGetWhiteBoardPrevDataForGroupId = (groupDataId) => async (dispatch) => {
    const {data} = await api.post(`common/actionToGetWhiteBoardPrevDataForGroupIdApiCall`,{groupDataId});
    data?.response?.map((anData)=>{
        dispatch(actionToSetCaptureAnnotatorJSONData(anData.jsonObject));
    })
}
export const actionToUpdateAttendanceClassStatus = (profileData,classData,demoClass) => async (dispatch) => {
    if(!profileData?.taken_single_demo) {
        let setData = `taken_single_demo = ?`;
        let whereCondition = `id = '${profileData?.id}'`;
        let dataToSend = {column: setData, value: [1], whereCondition: whereCondition, tableName: 'student_profile'};
        dispatch(commonUpdateFunction(dataToSend));
    }

    if(demoClass) {
        let setData = `has_taken_demo = ?`;
        let whereCondition = `id = '${classData?.profile_subject_with_batch_id}'`;
        let dataToSend = {column: setData, value: [1], whereCondition: whereCondition, tableName: 'profile_subject_with_batch'};
        dispatch(commonUpdateFunction(dataToSend));
    }else{
        let aliasArray = ['?','?','?','?'];
        let columnArray = ['id','class_timetable_with_class_batch_assigned_id','student_profile_id','profile_subject_with_batch_id'];
        let valuesArray = [_generateUniqueId(),classData?.class_id,profileData?.id,classData?.profile_subject_with_batch_id];
        let insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'student_class_attend'};
        await dispatch(callInsertDataFunction(insertData));
    }
}
export const actionToUpdateSubscriptionPlanDetailForUser = (classDataId,month) => async (dispatch) => {
    let setData = `subscription_end_date = ?`;
    let whereCondition = `id = '${classDataId}'`;
    let dataToSend = {column: setData, value: [moment().add(month,'months').format('YYYY-MM-DD HH:mm:ss')], whereCondition: whereCondition, tableName: 'student_profile'};
    await dispatch(commonUpdateFunction(dataToSend));
    dispatch(actionToGetUserAllClasses(true));
}
export const actionToCreateTeacherProfile = (payload) => async (dispatch) => {
    const aliasArray = ['?','?','?','?','?','?','?','?','?','?'];
    const columnArray = ['id','name','email','address','mobile','password','role','has_profile','highest_qualification','board'];
    const valuesArray = [payload?.id,payload?.name,payload?.email,payload?.address,payload?.mobile,payload?.password,payload?.role,payload?.has_profile,payload?.highest_qualification,payload?.board];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'app_user'};
    await dispatch(callInsertDataFunction(insertData));

    payload?.subjects?.map(async (subject)=>{
        await payload?.teacherClass?.map(async (teacherClass)=> {
            let aliasArray = ['?', '?', '?', '?'];
            let columnArray = ['id', 'teacher_id', 'subject_id', 'teacher_class'];
            let valuesArray = [_generateUniqueId(), payload?.id, subject?.id, teacherClass?.id];
            let insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'teacher_subject_and_class'};
            await dispatch(callInsertDataFunction(insertData));
        })
    })
}
export const actionToSaveStudyMaterialData = (payload) => async (dispatch) => {
    const aliasArray = ['?','?','?','?','?','?'];
    const columnArray = ['subject','topic_name','link','lecture_order','tab_type','sub_tab_heading'];
    const valuesArray = [payload?.subjectName,payload?.topicName,payload?.link,payload?.lectureOrder,payload?.tabType,payload?.subTabType];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'sk_mondal_class_test_study_material'};
    await dispatch(callInsertDataFunction(insertData));
}
export const actionToUpdateTeacherProfile = (payload) => async (dispatch) => {
    let setData = `name = ?,email = ?,password = ?,address = ?`;
    let whereCondition = `id = '${payload?.id}'`;
    let dataToSend = {column: setData, value: [payload?.name,payload?.email,payload?.password,payload?.address], whereCondition: whereCondition, tableName: 'app_user'};
    await dispatch(commonUpdateFunction(dataToSend));
    dispatch(actionToOpenCloseEditTeacherPopup(false,{}));
    dispatch(actionToGetAllTeacherDataList());
}
export const actionToUpdateUserProfile = (payload,setUpdateProfileLoader) => async (dispatch) => {
    let setData = `name = ?,email = ?,father_name = ?,mother_name = ?,school_name = ?,school_board = ?,state = ?,city = ?`;
    let whereCondition = `id = '${payload?.id}'`;
    let dataToSend = {column: setData, value: [payload?.name,payload?.email,payload?.fatherName,payload?.motherName,payload?.schoolName,payload?.schoolBoard,payload?.state,payload?.city], whereCondition: whereCondition, tableName: 'student_profile'};
    await dispatch(commonUpdateFunction(dataToSend));
    setTimeout(function(){
        setUpdateProfileLoader(false);
        dispatch(actionToGetUserAllClasses(true));
    },2000)
}

export const actionToCreateUserProfile = (payload) => async (dispatch,getState) => {

    let userInfo = getState().userSignin.userInfo;
    let setData = `has_profile = ?`;
    let whereCondition = `id = '${userInfo?.id}'`;
    let dataToSend = {column: setData, value: [1], whereCondition: whereCondition, tableName: 'app_user'};
    dispatch(commonUpdateFunction(dataToSend));

    let aliasArray = ['?','?','?','?','?','?','?','?','?','?','?','?'];
    let columnArray = ['id','name','email','father_name','mother_name','school_name','school_board','state','city','created_by','student_class','batch'];
    let valuesArray = [payload?.id,payload?.name,payload?.email,payload?.fatherName,payload?.motherName,payload?.schoolName,payload?.schoolBoard,payload?.state,payload?.city,userInfo?.id,payload?.studentClass,payload?.batch];
    let insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'student_profile'};
    await dispatch(callInsertDataFunction(insertData));

    payload?.subjects?.map(async (subject)=>{
        let aliasArray = ['?','?','?','?','?'];
        let columnArray = ['id','profile_id','subject_id','batch','board'];
        let valuesArray = [_generateUniqueId(),payload?.id,subject?.id,payload?.batch,payload?.schoolBoard];
        let insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'profile_subject_with_batch'};
        await dispatch(callInsertDataFunction(insertData));
    })

    userInfo.has_profile = 1;
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: cloneDeep(userInfo)});
    localStorage.setItem('userInfo',JSON.stringify(userInfo));
    setAuthSignInByRole(userInfo);
    setTimeout(function(){
        window.location.reload();
    },2000)
}
export const actionToLoginUserByUserData = (payload) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: payload});
    localStorage.setItem('userInfo',JSON.stringify(payload));
    setAuthSignInByRole(payload);
    window.location.reload();
}
export const actionToGetAllSubjectDataList = () => async (dispatch) => {
    dispatch({type: ALL_SUBJECT_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllSubjectDataListApiCall`);
    dispatch({type: ALL_SUBJECT_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToSearchTeacherAccordingToTheCondition = (payload) => async (dispatch) => {
    dispatch({type: ALL_TEACHER_DATA_TO_ASSIGN_CLASS_REQUEST});
    const {data} = await api.post(`common/actionToSearchTeacherAccordingToTheConditionApiCall`, {
        subject_id: payload?.subject_id,
        school_board: payload?.school_board,
        student_class: payload?.student_class,
    })
    dispatch({type: ALL_TEACHER_DATA_TO_ASSIGN_CLASS_SUCCESS, payload:[...data?.response]});
}
export const actionToAlreadyCreatedClassAccordingToTheCondition = (payload) => async (dispatch) => {
    dispatch({type: ALL_CLASS_TO_ASSIGN_CLASS_REQUEST});
    let weekStartDate = moment().startOf('week').format('YYYY-MM-DD')
    let weekEndDate = moment().endOf('week').format('YYYY-MM-DD')


    const {data} = await api.post(`common/actionToAlreadyCreatedClassAccordingToTheConditionApiCall`, {
        weekStartDate,weekEndDate,
        subject_id: payload?.subject_id,
        school_board: payload?.school_board,
        student_class: payload?.student_class,
        batch: payload?.batch,
    })
    let finalData = [];
    if(data?.response){
        data?.response?.map((classData)=>{
            if(classData?.class_timetable_with_class_batch_assigned){
                classData.class_timetable_with_class_batch_assigned = JSON.parse(classData.class_timetable_with_class_batch_assigned);
            }
            if(classData?.batch === 2 && classData?.class_count < 3){
                finalData.push(classData);
            }else if(classData?.batch === 3 && classData?.class_count < 5) {
                finalData.push(classData);
            }
        })
    }
    console.log(finalData);
    dispatch({type: ALL_CLASS_TO_ASSIGN_CLASS_SUCCESS, payload:[...finalData]});
}
export const actionToGetAllDemoClassesDetails = (idLoaderDisable = false) => async (dispatch) => {
    if(!idLoaderDisable)
       dispatch({type: ALL_DEMO_CLASSES_REQUEST});

    const {data} = await api.post(`common/actionToGetAllDemoClassesDetailsApiCall`);
    dispatch({type: ALL_DEMO_CLASSES_SUCCESS, payload:[...data?.response]});
}
export const actionToGetAllRecordedClassesDetails = (idLoaderDisable = false) => async (dispatch) => {
    if(!idLoaderDisable)
        dispatch({type: ALL_RECORDED_CLASSES_REQUEST});

    const {data} = await api.post(`common/actionToGetAllRecordedClassesDetailsApiCall`);
    dispatch({type: ALL_RECORDED_CLASSES_SUCCESS, payload:[...data?.response]});
}
export const actionToGetLatestDemoClassesDetails = (idLoaderDisable = false) => async (dispatch) => {
    if(!idLoaderDisable)
        dispatch({type: LATEST_DEMO_CLASSES_REQUEST});

    const {data} = await api.post(`common/actionToGetLatestDemoClassesDetailsApiCall`);
    dispatch({type: LATEST_DEMO_CLASSES_SUCCESS, payload:[...data?.response]});
}
export const actionToGetTeacherClassAttendWithAssignmentData = (isLoaderDisable = false) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;

    if(!isLoaderDisable)
        dispatch({type: TEACHER_CLASS_ATTEND_WITH_ASSIGNMENT_DATA_REQUEST});

    let weekStartDate = moment().startOf('week').format('YYYY-MM-DD')
    let weekEndDate = moment().endOf('week').format('YYYY-MM-DD')
    if(!isTeacherMasterLogin()) {
        const {data} = await api.post(`common/actionToGetStudentClassAssignmentDataWithClassAttendApiCall`, {
            userId: userInfo?.id,
            weekStartDate,
            weekEndDate
        });
        formatTeacherAssignmentDataByDate(data.response,dispatch);
    }else{
        const {data} = await api.post(`common/actionToGetAllClassAssignmentDataWithClassAttendApiCall`, {
            userId: userInfo?.id,
            weekStartDate,
            weekEndDate
        });
        formatTeacherAssignmentDataByDate(data.response,dispatch);
    }
}
export const actionToGetAllSchoolBoardDataList = () => async (dispatch) => {
    dispatch({type: ALL_SCHOOL_BOARD_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllSchoolBoardDataListApiCall`);
    dispatch({type: ALL_SCHOOL_BOARD_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetUserFreshData = (id) => async (dispatch) => {
    const {data} = await api.post(`common/actionToGetUserFreshDataApiCall`,{id});
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: cloneDeep(data?.response)});
    localStorage.setItem('userInfo',JSON.stringify(data?.response));
    setAuthSignInByRole(data?.response);
}
export const actionToGetAllStudentDataList = () => async (dispatch) => {
    dispatch({type: ALL_STUDENT_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllStudentDataListApiCall `);
    dispatch({type: ALL_STUDENT_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetAllNewStudentProfileDataList = () => async (dispatch) => {
    dispatch({type: ALL_NEW_STUDENT_PROFILE_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllNewStudentProfileDataListApiCall `);
    dispatch({type: ALL_NEW_STUDENT_PROFILE_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetTodayProfileDataList = () => async (dispatch) => {
    dispatch({type: TODAY_PROFILE_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetTodayProfileDataListApiCall `);
    dispatch({type: TODAY_PROFILE_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetLatestSubscriptionsDataList = () => async (dispatch) => {
    dispatch({type: LATEST_SUBSCRIPTION_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetLatestSubscriptionsDataListApiCall `);
    dispatch({type: LATEST_SUBSCRIPTION_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetLatestStudentProfileDataList = () => async (dispatch) => {
    dispatch({type: LATEST_STUDENT_PROFILE_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetLatestStudentProfileDataListApiCall `);
    dispatch({type: LATEST_STUDENT_PROFILE_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetAllStudentSubscriptionDataList = () => async (dispatch) => {
    dispatch({type: ALL_STUDENT_SUBSCRIPTION_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllStudentSubscriptionDataListApiCall `);
    dispatch({type: ALL_STUDENT_SUBSCRIPTION_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetAllTeacherDataList = () => async (dispatch) => {
    dispatch({type: ALL_TEACHER_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllTeacherDataListApiCall `);
    dispatch({type: ALL_TEACHER_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetLatestTeachersDataList = () => async (dispatch) => {
    dispatch({type: LATEST_TEACHER_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetLatestTeacherDataListApiCall `);
    dispatch({type: LATEST_TEACHER_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetAllClassesDataList = (idLoaderDisable = false) => async (dispatch) => {
    if(!idLoaderDisable)
        dispatch({type: ALL_CLASSES_DATA_LIST_REQUEST});
    let weekStartDate = moment().startOf('week').format('YYYY-MM-DD')
    let weekEndDate = moment().endOf('week').format('YYYY-MM-DD')

    const {data} = await api.post(`common/actionToGetAllClassesDataListApiCall`,{weekStartDate,weekEndDate});
    let finalDataArray = [];
    data?.response?.map((dataClass)=>{
        if(dataClass?.class_timetable_with_class_batch_assigned){
            dataClass.class_timetable_with_class_batch_assigned = JSON.parse(dataClass.class_timetable_with_class_batch_assigned);
        }
        finalDataArray.push(dataClass);
    })

    dispatch({type: ALL_CLASSES_DATA_LIST_SUCCESS, payload:[...finalDataArray]});
}
export const actionToCreatePaymentIntend = (setClientSecret,amount,totalMonths) => async () => {
    const {data} = await api.post(`common/actionToCreatePaymentIntendApiCall`, {amount,totalMonths});
    setClientSecret(data.clientSecret)
}
export const actionToConfigStripeSetup = (setStripePromise) => async () => {
    const {data} = await api.post(`common/actionToConfigStripeSetupApiCall`);
    setStripePromise(loadStripe(data.publishableKey));
}
export const actionToGetUserAllClasses = (isLoaderDisable = false) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;

    if(!isLoaderDisable)
      dispatch({type: STUDENT_ALL_CLASS_LIST_REQUEST});

    const {data} = await api.post(`common/actionToGetUserAllClassesApiCall`,{userId:userInfo?.id});
    dispatch({type: STUDENT_ALL_CLASS_LIST_SUCCESS, payload:cloneDeep(data?.response)});
}
export const actionToGetStudentTimetableData = (isLoaderDisable = false) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;

    if(!isLoaderDisable)
      dispatch({type: STUDENT_ALL_TIME_CLASS_LIST_REQUEST});

    let eventData = [];
    if(isTeacherMasterLogin()) {
        const {data} = await api.post(`common/actionToGetTeacherAllTimetableClassesApiCall`, {userId: userInfo?.id});
        data?.response?.map((allUserClasses) => {
            eventData[moment(allUserClasses?.start_from_date_time).format('YYYY-MM-DD')] = []
            eventData[moment(allUserClasses?.start_from_date_time).format('YYYY-MM-DD')].push({
                subject: allUserClasses?.subject_name,
                instructor: allUserClasses?.teacher_name,
                time: moment(allUserClasses?.start_from_date_time).format('hh:mm a')
            })
        })
    }else{
        const {data} = await api.post(`common/actionToGetStudentAllTimetableClassesApiCall`, {userId: userInfo?.id});
        data?.response?.map((allUserClasses) => {
            eventData[moment(allUserClasses?.start_from_date_time).format('YYYY-MM-DD')] = []
            eventData[moment(allUserClasses?.start_from_date_time).format('YYYY-MM-DD')].push({
                subject: allUserClasses?.subject_name,
                instructor: allUserClasses?.teacher_name,
                time: moment(allUserClasses?.start_from_date_time).format('hh:mm a')
            })
        })
    }
    dispatch({type: STUDENT_ALL_TIME_CLASS_LIST_SUCCESS, payload: eventData});
}
export const actionToSendFabricDataToOtherUser = (jsonObject) => async ()=> {
    sendWebsocketRequest(JSON.stringify({
        clientId: localStorage.getItem('clientId'),
        type: 'annotatorImageJson',
        userId:jsonObject.userId,
        //canvasReservedJson:jsonObject.canvasReservedJson,
        groupId:jsonObject.groupId,
        objectId:jsonObject.objectId,
        canvasIndex:jsonObject.canvasIndex,
        jsonObject: JSON.stringify(jsonObject)
    }));
}
export const actionToChangeActiveIndexEditorJson = (groupId,newIndex) => async ()=> {
    sendWebsocketRequest(JSON.stringify({
        clientId: localStorage.getItem('clientId'),
        type: 'actionToChangeActiveIndexEditorJson',
        groupId:groupId,
        newIndex:newIndex
    }));
}
export const actionToOpenRatingModalPopup = (action,payload) => (dispatch) => {
    let data = {isOpen:action,dropdownData:payload}
    dispatch({type:OPEN_CLOSE_TEACHER_RATING_POPUP,payload:data});
}
export const actionToGetActiveEditorJson = (groupId) => async (dispatch) => {
    const {data} = await api.post(`common/actionToGetActiveEditorJsonApiCall`,{groupId});
    dispatch({type: EDITOR_ACTIVE_EDITOR_JSON, payload:cloneDeep(data?.response)});
}
export const actionToGetEditorCompleteJsonDataWithIndex = (groupId) => async () => {
    const {data} = await api.post(`common/actionToGetEditorCompleteJsonDataWithIndexApiCall`,{groupId});
    return data?.response;
}
export const actionToSetCaptureAnnotatorJSONData = (jsonObject) => (dispatch) => {
    if(jsonObject) {
        let annotatorData = JSON.parse(jsonObject);
        let annotatorJSONData = {
            userId: annotatorData.userId,
            canvasJson: annotatorData.canvasJson,
            custom_editor_id: annotatorData.custom_editor_id,
            type: annotatorData.type,
            userPointer: annotatorData.userPointer,
            sizeArray: annotatorData.sizeArray,
            currentIndex: annotatorData.currentIndex,
            canvasIndex: annotatorData.canvasIndex
        };
        dispatch({type: CAPTURE_ANNOTATOR_JSON_DATA, payload: cloneDeep(annotatorJSONData)});
    }
}
export const actionToUpdateIpAddress = () => async(dispatch) =>{
    try{
        await Axios.get('https://geolocation-db.com/json/').then(res=>{
            dispatch({type: GET_IP_ADDRESS, payload:res.data.IPv4});
        });
    } catch {
        dispatch({type: GET_IP_ADDRESS, payload:'10.2.99.129'});
    }
}

export const actionToGetStudentAllTodayClasses = (isLoaderDisable = false) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;

    if(!isLoaderDisable)
        dispatch({type: STUDENT_ALL_TODAY_CLASS_LIST_REQUEST});

    let todayDate = moment().format('YYYY-MM-DD');
    const {data} = await api.post(`common/actionToGetStudentAllTodayClassesApiCall`,{userId:userInfo?.id,todayDate});
    dispatch({type: STUDENT_ALL_TODAY_CLASS_LIST_SUCCESS, payload:[...data?.response]});
}

export const actionToGetStudentAllDemoClasses = (isLoaderDisable = false) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;

    if(!isLoaderDisable)
        dispatch({type: STUDENT_ALL_DEMO_CLASS_LIST_REQUEST});

    const {data} = await api.post(`common/actionToGetStudentAllDemoClassesApiCall`,{userId:userInfo?.id});
    dispatch({type: STUDENT_ALL_DEMO_CLASS_LIST_SUCCESS, payload:[...data?.response]});
}

export const actionToGetTeacherAllClasses = (isLoaderDisable = false) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;

    if(!isLoaderDisable)
        dispatch({type: TEACHER_ALL_CLASS_LIST_REQUEST});

    const {data} = await api.post(`common/actionToGetTeacherAllClassesApiCall`,{userId:userInfo?.id});

    dispatch({type: TEACHER_ALL_CLASS_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetTeacherAllTodayClasses = (isLoaderDisable = false) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;

    if(!isLoaderDisable)
        dispatch({type: TEACHER_ALL_TODAY_CLASS_LIST_REQUEST});

    let todayDate = moment().format('YYYY-MM-DD');
    const {data} = await api.post(`common/actionToGetTeacherAllTodayClassesApiCall`,{userId:userInfo?.id,todayDate});
    dispatch({type: TEACHER_ALL_TODAY_CLASS_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetTeacherAllDemoClasses = (isLoaderDisable = false) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;

    if(!isLoaderDisable)
        dispatch({type: TEACHER_ALL_DEMO_CLASS_LIST_REQUEST});

    let todayDate = moment().format('YYYY-MM-DD');
    const {data} = await api.post(`common/actionToGetTeacherAllDemoClassesApiCall`,{userId:userInfo?.id,todayDate});
    dispatch({type: TEACHER_ALL_DEMO_CLASS_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToSetCurrentCallDataGroupData = (groupData) => async (dispatch) => {
    dispatch({ type: CHAT_MODULE_CURRENT_CALL_GROUP_DATA, payload: groupData});
}

export const actionToMuteUnmuteUserCallLocally = (id) => async (dispatch,getState) => {
   const chatModuleCurrentCallGroupMembers = getState().chatModuleCurrentCallGroupMembers;
   let allMembersInCall = [];
    chatModuleCurrentCallGroupMembers?.map((users)=>{
        if(users?.id === id)
            users.mute = !users.mute;
        allMembersInCall.push(users);
    })
    dispatch({type: CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS, payload: [...allMembersInCall]});
    return allMembersInCall;
}
export const actionToMuteUnmuteUserCall = (id,groupId) => async (dispatch) => {
    let allUsers = await dispatch(actionToMuteUnmuteUserCallLocally(id));
    sendWebsocketRequest(JSON.stringify({
        clientId:localStorage.getItem('clientId'),
        users:allUsers,
        userId:id,
        groupId:groupId,
        type: "handleMuteUnmuteInCall"
    }));
}
export const actionToSendVideoChunkDataToServer = (videoData) => async () => {
     api.post(`recording-video-chuncks`,videoData,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
export const actionToSendVideoChunkDataToServerFinishProcess = (classId,duration) => async (dispatch) => {
    const {data} = await api.post(`recording-video-finish`,{classId,duration});
    if(data?.name) {
        const aliasArray = ['?', '?', '?'];
        const columnArray = ['id', 'name', 'class_timetable_with_class_batch_assigned_id'];
        const valuesArray = [_generateUniqueId(), data.name, classId];
        const insertData = {
            alias: aliasArray,
            column: columnArray,
            values: valuesArray,
            tableName: 'class_call_recording'
        };
        dispatch(callInsertDataFunction(insertData));
    }
}
export const actionToRemoveCurrentGroupCallData = () => async (dispatch) => {
    dispatch({ type: CHAT_MODULE_CURRENT_CALL_GROUP_DATA, payload: {}});
    dispatch({type: CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS, payload: []});
}

export const actionToEndCurrentCurrentCallLocally = (groupId) => async (dispatch,getState) =>{
    const chatModuleCurrentCallGroupData = getState().chatModuleCurrentCallGroupData;
    if(chatModuleCurrentCallGroupData?.id === groupId){
        dispatch({ type: CHAT_MODULE_CURRENT_CALL_GROUP_DATA, payload: {}});
        dispatch({type: CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS, payload: []});
        setTimeout(()=>{
            if(getState().userSignin.userInfo.role === 1) {
                dispatch(actionToGetStudentAllTodayClasses(false));
                dispatch(actionToGetStudentAllDemoClasses(false));
            }else {
                dispatch(actionToGetTeacherAllTodayClasses(false));
                dispatch(actionToGetTeacherAllDemoClasses(false));
            }
        },2000)
    }
}

export const actionToGetPrevCallOnGroupClass = (classData) => async (dispatch) => {
    const {data} = await api.post(`common/actionToGetPrevCallOnGroupClassApiCall`,{profileId:classData?.id});
    if(data?.response?.classGroupData){
        dispatch(actionToSetCurrentCallDataGroupData(data?.response?.classGroupData));
        dispatch({type: CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS, payload: [...data?.response?.members]});
    }
}
export const actionToRateCurrentClass = (rating,classData) => async (dispatch,getState) => {
    let userInfo = getState().userSignin.userInfo;
    const aliasArray = ['?','?','?','?'];
    const columnArray = ['id','rating','user_id','class_timetable_with_class_batch_assigned_id'];
    const valuesArray = [_generateUniqueId(),rating,userInfo?.id,classData?.class_id];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'classes_rating'};
    await dispatch(callInsertDataFunction(insertData));
    dispatch(actionToOpenRatingModalPopup(false,{}));
}

export const actionToStoreAssignmentDataForTeacher = (fileName,pathName,id) => async (dispatch) => {
    const aliasArray = ['?','?','?','?'];
    const columnArray = ['id','class_timetable_with_class_batch_assigned_id','path','name'];
    const valuesArray = [_generateUniqueId(),id,pathName,fileName];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'teacher_class_attend_assignment'};
    await dispatch(callInsertDataFunction(insertData));
    dispatch(actionToGetTeacherClassAttendWithAssignmentData(false))
}
export const actionToStoreAssignmentData = (fileName,pathName,id) => async (dispatch) => {
    const aliasArray = ['?','?','?','?'];
    const columnArray = ['id','student_class_attend_id','path','name'];
    const valuesArray = [_generateUniqueId(),id,pathName,fileName];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'student_class_attend_assignment'};
    await dispatch(callInsertDataFunction(insertData));
    dispatch(actionToGetTeacherClassAttendWithAssignmentData(false))
}
export const actionToEndCurrentCurrentCall = (groupId,classId,startDate) => async (dispatch) => {
    dispatch(actionToEndCurrentCurrentCallLocally(groupId));
    sendWebsocketRequest(JSON.stringify({
        clientId: localStorage.getItem('clientId'),
        type: 'actionToEndCurrentCurrentCall',
        classEndTime:moment().format('YYYY-MM-DD HH:mm:ss'),
        groupId:groupId,
        classId:classId,
        startDate:startDate
    }));
}

export const actionToSetMemberInGroupCall = (groupId,allMembersArray,memberData) => async (dispatch,getState) => {
    if(getState()?.chatModuleCurrentCallGroupData?.id === groupId) {
        dispatch({type: CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS, payload: [...allMembersArray]});
        dispatch({type: CHAT_MODULE_NEW_USER_ADDED_IN_CURRENT_CALL, payload: cloneDeep(memberData)});
    }
}
export const actionToCreateUserSignupRequest = (payload) => async (dispatch) => {
    const aliasArray = ['?','?','?','?','?','?','?','?'];
    const columnArray = ['id','name','email','address','mobile','password','role','has_profile'];
    const valuesArray = [payload?.id,payload?.name,payload?.email,payload?.address,payload?.mobile,payload?.password,payload?.role,payload?.has_profile];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'app_user'};
    await dispatch(callInsertDataFunction(insertData));
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: payload});
    localStorage.setItem('userInfo',JSON.stringify(payload));
    setAuthSignInByRole(payload);
    window.location.reload();
}

export const signout = () => (dispatch) => {
    document.location.href = '/';
    localStorage.removeItem('userInfo');
    localStorage.removeItem('superAdminAuthentication');
    localStorage.removeItem('studentAuthentication');
    localStorage.removeItem('teacherAuthentication');
    setTimeout(function(){
        dispatch({ type: USER_SIGNOUT });
    },1000)
};