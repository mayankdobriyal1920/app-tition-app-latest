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
    CALL_SOCKET_MESSAGE_BROADCAST, STUDENT_ALL_TIME_CLASS_LIST_SUCCESS
} from "../constants/CommonConstants";

import Axios from "axios";
import {handleWebSocketEvent, sendWebsocketRequest} from "../helper/WebSocketHelper";
import {setAuthSignInByRole} from "./helper/CommonActionHelper";
import {cloneDeep} from "lodash";
import {_generateUniqueId} from "../helper/CommonHelper";
import moment from "moment";

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


export const actionToSignInUserIntoApp = () => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
         let userData = {
              id:1,
              name:'Mayank'
         }
         dispatch({ type: USER_SIGNIN_SUCCESS, payload: userData});
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                'Error',
        });
    }
};
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
export const actionToGetAllSchoolBoardDataList = () => async (dispatch) => {
    dispatch({type: ALL_SCHOOL_BOARD_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllSchoolBoardDataListApiCall`);
    dispatch({type: ALL_SCHOOL_BOARD_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetAllStudentDataList = () => async (dispatch) => {
    dispatch({type: ALL_STUDENT_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllStudentDataListApiCall `);
    dispatch({type: ALL_STUDENT_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetAllTeacherDataList = () => async (dispatch) => {
    dispatch({type: ALL_TEACHER_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllTeacherDataListApiCall `);
    dispatch({type: ALL_TEACHER_DATA_LIST_SUCCESS, payload:[...data?.response]});
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
export const actionToSetCaptureAnnotatorJSONData = (jsonObject) => (dispatch,getState) => {
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

    data?.response?.map((classData)=>{
        if(classData?.is_demo_class){
            todayClasses.push(classData);
        }
    })
    dispatch({type: TEACHER_ALL_CLASS_LIST_SUCCESS, payload:cloneDeep(data?.response)});
    dispatch({type: TEACHER_ALL_DEMO_CLASS_LIST_SUCCESS, payload:[...todayClasses]});
}
export const actionToSetCurrentCallDataGroupData = (groupData) => async (dispatch) => {
    dispatch({ type: CHAT_MODULE_CURRENT_CALL_GROUP_DATA, payload: groupData});
}
export const actionToRemoveDataFromIncomingCall = () => async (dispatch) => {
    dispatch({ type: CHAT_MODULE_INCOMING_CALL_GROUP_DATA, payload: {}});
}
export const actionToRemoveInGroupData = (groupId) => async (dispatch,getState) => {
    const chatModuleAllGroupStartedCall = getState().chatModuleAllGroupStartedCall;
    if(chatModuleAllGroupStartedCall.includes(groupId)){
        chatModuleAllGroupStartedCall.splice(chatModuleAllGroupStartedCall.indexOf(groupId),1);
    }
    dispatch({ type: CHAT_MODULE_ALL_STARTED_CALL, payload: [...chatModuleAllGroupStartedCall]});
}
export const actionToMuteUnmuteUserCallLocally = (payload) => async (dispatch) => {
    payload?.users?.map((id)=>{
        let audio = document.getElementById(`VIDEO-${id}`);
        if(audio != null && audio) {
            audio.muted = payload?.audio === 'MUTE' ? true : false;
        }
    })
}
export const actionToMuteUnmuteUserCall = (users,audio,groupId) => async (dispatch) => {
    dispatch(actionToMuteUnmuteUserCallLocally({users,audio}));
    sendWebsocketRequest(JSON.stringify({
        clientId:localStorage.getItem('clientId'),
        users:users,
        audio:audio,
        groupId:groupId,
        type: "handleMuteUnmuteInCall"
    }));
}
export const actionToSetCallBroadcastMessage = (message) => async (dispatch) => {
    dispatch({type: CALL_SOCKET_MESSAGE_BROADCAST, payload:''});
    dispatch({type: CALL_SOCKET_MESSAGE_BROADCAST, payload:message});
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
export const actionToRemoveUserFromCurrentCallAndEndCall = (userId,groupId) => async (dispatch) => {

    let setData = `class_end_time = ?`;
    let whereCondition = `id = '${groupId}'`;
    let dataToSend = {column: setData, value: [moment().format('YYYY-MM-DD hh:mm:ss')], whereCondition: whereCondition, tableName: 'classes_assigned_to_teacher'};
    dispatch(commonUpdateFunction(dataToSend));

    sendWebsocketRequest(JSON.stringify({
        clientId:localStorage.getItem('clientId'),
        userId:userId,
        groupId:groupId,
        type: "leaveCurrentRunningCall"
    }));
}
export const actionToEndCurrentCurrentCall = (groupId) => async (dispatch,getState) => {
    dispatch(actionToRemoveDataFromIncomingCall());
    dispatch(actionToRemoveInGroupData(groupId));
    const chatModuleCurrentCallGroupData = getState().chatModuleCurrentCallGroupData;
    if(chatModuleCurrentCallGroupData?.id === groupId){
        dispatch({ type: CHAT_MODULE_CURRENT_CALL_GROUP_DATA, payload: {}});
        dispatch({type: CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS, payload: []});
    }
}
export const actionToRemoveUserFromCurrentCallLocally = (userId) => async (dispatch,getState) => {
    let chatModuleCurrentCallGroupMembers = getState().chatModuleCurrentCallGroupMembers;
    let index = null;
    chatModuleCurrentCallGroupMembers?.map((user,key)=>{
        if(user.id === userId){
            index = key;
        }
    })
    chatModuleCurrentCallGroupMembers.splice(index,1);
    if(index !== null){
        dispatch({type: CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS, payload: cloneDeep(chatModuleCurrentCallGroupMembers)});
    }
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
export const actionToStoreAndRemoveNewAddedCallInGroupData = (groupId) => async (dispatch,getState) => {
    const chatModuleAllGroupStartedCall = getState().chatModuleAllGroupStartedCall;
    if(!chatModuleAllGroupStartedCall.includes(groupId)){
        chatModuleAllGroupStartedCall.push(groupId);
    }
    dispatch({ type: CHAT_MODULE_ALL_STARTED_CALL, payload: [...chatModuleAllGroupStartedCall]});
}
export const actionToAddDataFromIncomingCall = (groupData,members) => async (dispatch,getState) => {
    if(members?.includes(getState()?.userSignin?.userInfo?.id))
        dispatch({ type: CHAT_MODULE_INCOMING_CALL_GROUP_DATA, payload: cloneDeep(groupData)});
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