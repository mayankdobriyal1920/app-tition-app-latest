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
    ALL_ATTENDANCE_AND_ASSIGNMENT_REQUEST, ALL_ATTENDANCE_AND_ASSIGNMENT_SUCCESS
} from "../constants/CommonConstants";

import Axios from "axios";
import {handleWebSocketEvent, sendWebsocketRequest} from "../helper/WebSocketHelper";
import {setAuthSignInByRole} from "./helper/CommonActionHelper";
import {cloneDeep} from "lodash";
import {_generateUniqueId} from "../helper/CommonHelper";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";

const api = Axios.create({
    baseURL: `https://apnafinances.com/api-call-tutor/`
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
export const actionToSetWindowSizeCount = (count) => async (dispatch) => {
    dispatch({type: WINDOW_RESIZE_COUNT, payload:count});
}
export const actionToOpenCloseSignupPopup = (action) => async (dispatch) => {
    dispatch({ type: OPEN_CLOSE_SIGNUP_POPUP, payload: {isOpen:action}});
};
export const actionToOpenCloseLoginPopup = (action) => async (dispatch) => {
    dispatch({ type: OPEN_CLOSE_LOGIN_POPUP, payload: {isOpen:action}});
};
export const actionToGetUserByMobileNumber = (mobileNumber) => async () => {
    const {data} = await api.post(`common/actionToValidateMobileNumberApiCall`,{mobileNumber});
    return data.response;
};

export const actionToInitializePaymentGateway = (payload,setPaymentData) => async () => {
    const {data} = await api.post(`common/actionToInitializePaymentGatewayApiCall`,payload);
    setPaymentData(data.response);
};

export const actionToUpdateAttendanceClassStatus = (profileData,classData,groupDataId) => async (dispatch) => {
    if(!profileData?.taken_single_demo) {
        let setData = `taken_single_demo = ?`;
        let whereCondition = `id = '${profileData?.id}'`;
        let dataToSend = {column: setData, value: [1], whereCondition: whereCondition, tableName: 'student_profile'};
        dispatch(commonUpdateFunction(dataToSend));
    }
    if(!classData?.has_taken_demo) {
        let setData = `has_taken_demo = ?`;
        let whereCondition = `id = '${classData?.id}'`;
        let dataToSend = {column: setData, value: [1], whereCondition: whereCondition, tableName: 'profile_subject_with_batch'};
        dispatch(commonUpdateFunction(dataToSend));
    }else{
        let aliasArray = ['?','?','?','?'];
        let columnArray = ['id','classes_assigned_to_teacher_id','student_profile_id','profile_subject_with_batch_id'];
        let valuesArray = [_generateUniqueId(),groupDataId,profileData?.id,classData?.id];
        let insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'student_class_attend'};
        await dispatch(callInsertDataFunction(insertData));
    }
}
export const actionToUpdateSubscriptionPlanDetailForUser = (classDataId) => async (dispatch) => {
    let setData = `subscription_end_date = ?`;
    let whereCondition = `id = '${classDataId}'`;
    let dataToSend = {column: setData, value: [moment().add(2,'months').format('YYYY-MM-DD HH:mm:ss')], whereCondition: whereCondition, tableName: 'student_profile'};
    dispatch(commonUpdateFunction(dataToSend));
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
export const actionToGetAllAttendClassWithAssignment = (profile_id) => async (dispatch) => {
    dispatch({type: ALL_ATTENDANCE_AND_ASSIGNMENT_REQUEST});
    const {data} = await api.post(`common/actionToGetAllAttendClassWithAssignmentApiCall`,{profile_id});
    dispatch({type: ALL_ATTENDANCE_AND_ASSIGNMENT_SUCCESS, payload:[...data?.response]});
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
export const actionToGetAllClassesDataList = () => async (dispatch) => {
    dispatch({type: ALL_CLASSES_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllClassesDataListApiCall `);
    dispatch({type: ALL_CLASSES_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToCreatePaymentIntend = (setClientSecret,amount) => async () => {
    const {data} = await api.post(`common/actionToCreatePaymentIntendApiCall`, {amount});
    setClientSecret(data.clientSecret)
}
export const actionToConfigStripeSetup = (setStripePromise) => async () => {
    const {data} = await api.post(`common/actionToConfigStripeSetupApiCall`);
    setStripePromise(loadStripe(data.publishableKey));
}
export const actionToGetUserAllClasses = () => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;
    dispatch({type: STUDENT_ALL_CLASS_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetUserAllClassesApiCall`,{userId:userInfo?.id});
    let todayClasses = [];
    data?.response?.profile_subject_with_batch?.map((classData)=>{
        if(classData?.classes_assigned_to_teacher){
            todayClasses.push(classData);
        }
    })
    dispatch({type: STUDENT_ALL_CLASS_LIST_SUCCESS, payload:cloneDeep(data?.response)});
    dispatch({type: STUDENT_ALL_TODAY_CLASS_LIST_SUCCESS, payload:[...todayClasses]});


    let eventData = [];
    data?.response?.profile_subject_with_batch?.map((allUserClasses)=>{
        let nowDate = moment(allUserClasses?.starting_from_date).format('YYYY-MM-DD');
        let i = 30;
        do{
            eventData.push({
                    title:JSON.stringify({
                        subject_name: allUserClasses?.subject_name,
                        teacher_name: allUserClasses?.teacher_name,
                        time: moment(allUserClasses?.starting_from_date).format('hh:mm a')
                    }),
                   date: nowDate,
                }
            )
            nowDate = moment(nowDate).add(1,'days').format('YYYY-MM-DD');
            i--;
        }while(i > 0)
    })
    dispatch({type: STUDENT_ALL_TIME_CLASS_LIST_SUCCESS, payload:[...eventData]});
}
export const actionToSendFabricDataToOtherUser = (jsonObject) => async ()=> {
    console.log('actionToSendFabricDataToOtherUser',jsonObject)
    sendWebsocketRequest(JSON.stringify({
        clientId: localStorage.getItem('clientId'),
        type: 'annotatorImageJson',
        userId:jsonObject.userId,
        objectId:jsonObject.objectId,
        canvasIndex:jsonObject.canvasIndex,
        jsonObject: JSON.stringify(jsonObject)
    }));
}
export const actionToOpenRatingModalPopup = (action,payload) => (dispatch) => {
    let data = {isOpen:action,dropdownData:payload}
    dispatch({type:OPEN_CLOSE_TEACHER_RATING_POPUP,payload:data});
    dispatch(actionToEndCurrentCurrentCallLocally(payload?.id));
}
export const actionToSetCaptureAnnotatorJSONData = (jsonObject) => (dispatch) => {
    let annotatorData = JSON.parse(jsonObject);
    let annotatorJSONData = {userId:annotatorData.userId,canvasJson:annotatorData.canvasJson,custom_editor_id:annotatorData.custom_editor_id,
        type:annotatorData.type,userPointer:annotatorData.userPointer,sizeArray:annotatorData.sizeArray,
        currentIndex:annotatorData.currentIndex,canvasIndex:annotatorData.canvasIndex};
    dispatch({type:CAPTURE_ANNOTATOR_JSON_DATA,payload:cloneDeep(annotatorJSONData)});
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
export const actionToGetTeacherAllClasses = () => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;
    dispatch({type: TEACHER_ALL_CLASS_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetTeacherAllClassesApiCall`,{userId:userInfo?.id});
    let todayClasses = [];
    let otherClasses = [];

    data?.response?.map((classData)=>{
        if(classData?.is_demo_class){
            todayClasses.push(classData);
        }
    })
    data?.response?.map((classData)=>{
        if(!classData?.is_demo_class){
            otherClasses.push(classData);
        }
    })
    dispatch({type: TEACHER_ALL_CLASS_LIST_SUCCESS, payload:[...otherClasses]});
    dispatch({type: TEACHER_ALL_DEMO_CLASS_LIST_SUCCESS, payload:[...todayClasses]});
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
    let allUsers = await dispatch(actionToMuteUnmuteUserCallLocally(id,true));
    sendWebsocketRequest(JSON.stringify({
        clientId:localStorage.getItem('clientId'),
        users:allUsers,
        userId:id,
        groupId:groupId,
        type: "handleMuteUnmuteInCall"
    }));
}
export const actionToSendVideoChunkDataToServer = (groupId,videoData) => async (dispatch) => {
    const {data} = await api.post(`recording-video-chuncks`,videoData,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
export const actionToSendVideoChunkDataToServerFinishProcess = (groupId) => async (dispatch) => {
    const {data} = await api.post(`recording-video-finish`,{groupId});
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
    }
}

export const actionToRateCurrentClass = (rating,classData) => async (dispatch,getState) => {
    let userInfo = getState().userSignin.userInfo;
    const aliasArray = ['?','?','?','?'];
    const columnArray = ['id','rating','user_id','classes_assigned_to_teacher_id'];
    const valuesArray = [_generateUniqueId(),rating,userInfo?.id,classData?.id];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'classes_rating'};
    await dispatch(callInsertDataFunction(insertData));
    dispatch(actionToOpenRatingModalPopup(false,{}));
}
export const actionToEndCurrentCurrentCall = (groupId) => async (dispatch) => {
    dispatch(actionToEndCurrentCurrentCallLocally(groupId));
    sendWebsocketRequest(JSON.stringify({
        clientId: localStorage.getItem('clientId'),
        type: 'actionToEndCurrentCurrentCall',
        classEndTime:moment().format('YYYY-MM-DD HH:mm:ss'),
        groupId:groupId
    }));
}

export const actionToSetMemberInGroupCall = (groupId,allMembersArray,memberData) => async (dispatch,getState) => {
    if(getState()?.chatModuleCurrentCallGroupData?.id === groupId) {
        dispatch({type: CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS, payload: [...allMembersArray]});
        dispatch({type: CHAT_MODULE_NEW_USER_ADDED_IN_CURRENT_CALL, payload: cloneDeep(memberData)});
    }
}
export const actionToCreateUserSignupRequest = (payload) => async (dispatch) => {
    const aliasArray = ['?','?','?','?','?','?','?','?','?','?','?'];
    const columnArray = ['id','name','email','address','mobile','password','role','has_profile','highest_qualification','education_medium','experience'];
    const valuesArray = [payload?.id,payload?.name,payload?.email,payload?.address,payload?.mobile,payload?.password,payload?.role,payload?.has_profile,payload?.highestQualification,payload?.educationMedium,payload?.experience];
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