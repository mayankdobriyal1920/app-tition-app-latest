import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
    allSchoolBoardDataListReducer,
    allSubjectDataListReducer,
    annotatorUserOnCaptureReducer,
    callSocketMessageBroadcastReducer,
    captureAnnotatorJSONDataReducer,
    chatModuleAllGroupStartedCallReducer,
    chatModuleCurrentCallGroupDataReducer,
    chatModuleCurrentCallGroupMembersReducer,
    chatModuleIncomingCallGroupDataReducer,
    chatModuleNewUserAddedInCurrentCallReducer,
    chatModuleNewUserLeaveUserInCallDataReducer,
    getCaptureAnnotatorUndoRedoReducer,
    getIPAddressDataReducer,
    openCloseLoginPopupReducer,
    openCloseSignupPopupReducer,
    allStudentDataListReducer,
    allNewStudentProfileDataListReducer,
    todayStudentProfileDataListReducer,
    allStudentSubscriptionDataListReducer,
    studentAllClassesListReducer,
    studentAllTimeClassListReducer,
    allTeacherDataListReducer,
    latestTeachersDataListReducer,
    latestStudentsDataListReducer,
    latestSubscriptionsDataListReducer,
    allClassesDataListReducer,
    teacherAllClassesListReducer,
    userSigninReducer,
    windowResizeCountReducer,
    openCloseTeacherRatingPopupReducer,
    allAttendanceAndAssignmentReducer,
    allDemoClassesReducer,
    allTeacherDataToAssignClassReducer,
    openCloseClassAssignPopupReducer,
    openCloseEditTeacherPopupReducer,
    allClassToAssignClassReducer,
    latestDemoClassesReducer,
    allRecordedClassesReducer,
    teacherAllTodayClassesListReducer,
    teacherAllDemoClassesListReducer,
    allStudentDemoDataListReducer,
    allStudentTodayDataListReducer,
    editorActiveEditorJsonReducer,
    teacherClassAttendWithAssignmentDataReducer,
    zoomInZoomOutTeacherVideoReducer, inClassStatusTeacherStudentReducer,
} from "./reducers/CommonReducers";

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo') || `{}`)
            : null,
    },
    openCloseSignupPopup: {isOpen:false},
    openCloseLoginPopup: {isOpen:false},
    openCloseTeacherRatingPopup: {isOpen:false,dropdownData:{}},
    openCloseTeacherEditPopup: {isOpen:false,dropdownData:{}},
    openCloseClassAssignPopup: {isOpen:false,dropdownData:{}},
    windowResizeCount: 0,
    allSubjectDataList:{prevId:'',loading:true,subjectData:[]},
    allStudentDataList:{prevId:'',loading:true,studentData:[]},
    allNewStudentProfileDataList:{prevId:'',loading:true,studentData:[]},
    allStudentSubscriptionDataList:{prevId:'',loading:true,studentData:[]},
    allTeacherDataList:{prevId:'',loading:true,teacherData:[]},
    latestTeacherDataList:{prevId:'',loading:true,teacherData:[]},
    latestStudentDataList:{prevId:'',loading:true,studentData:[]},
    todayStudentProfileDataList:{prevId:'',loading:true,studentData:[]},
    latestSubscriptionDataList:{prevId:'',loading:true,subscriptionData:[]},
    latestDemoClassDataList:{prevId:'',loading:true,classData:[]},
    allSchoolBoardDataList:{prevId:'',loading:true,boardData:[]},
    studentAllClassesList:{prevId:'',loading:true,classData:[]},
    teacherAllClassesList:{prevId:'',loading:true,classData:[]},
    teacherAllTodayClassesList:{prevId:'',loading:true,classData:[]},
    allDemoClasses:{prevId:'',loading:true,classData:[]},
    allRecordedClasses:{prevId:'',loading:true,classData:[]},
    studentAllTimeClassList:{prevId:'',loading:true,classData:{}},
    chatModuleAllGroupStartedCall:[],
    chatModuleCurrentCallGroupData:{},
    chatModuleIncomingCallGroupData:{},
    captureAnnotatorUndoRedoArray:{undo:[],redo:[]},
    ipAddress:'',
    captureAnnotatorJSONData: {},
    annotatorUserOnCapture:{},
    editorActiveEditorJson:[],
    chatModuleCurrentCallGroupMembers:[],
    chatModuleNewUserAddedInCurrentCall:{},
    chatModuleNewUserLeaveUserInCallData:{},
    callSocketMessageBroadcast:'',
    allAttendanceAndAssignment:{prevId:'',loading:true,attendanceData:[]},
    allTeacherDataToAssignClass:{prevId:'',loading:true,teacherData:[]},
    allClassToAssignClass:{prevId:'',loading:true,classData:[]},
    allAdminClassesDataList:{prevId:'',loading:true,classesData:[]},
    teacherAllDemoClassesList:{prevId:'',loading:true,classesData:[]},
    allStudentDemoDataList:{prevId:'',loading:true,classesData:[]},
    allStudentTodayDataList:{prevId:'',loading:true,classesData:[]},
    teacherClassAttendWithAssignmentData:{prevId:'',loading:true,classData:[]},
    zoomInZoomOutTeacherVideo:false,
    inClassStatusTeacherStudent:'PREJOIN',
};
export const rootReducer = combineReducers({
    inClassStatusTeacherStudent: inClassStatusTeacherStudentReducer,
    zoomInZoomOutTeacherVideo: zoomInZoomOutTeacherVideoReducer,
    editorActiveEditorJson: editorActiveEditorJsonReducer,
    allStudentDemoDataList: allStudentDemoDataListReducer,
    allStudentTodayDataList: allStudentTodayDataListReducer,
    teacherClassAttendWithAssignmentData: teacherClassAttendWithAssignmentDataReducer,
    allClassToAssignClass: allClassToAssignClassReducer,
    openCloseClassAssignPopup: openCloseClassAssignPopupReducer,
    allTeacherDataToAssignClass: allTeacherDataToAssignClassReducer,
    allDemoClasses: allDemoClassesReducer,
    allRecordedClasses: allRecordedClassesReducer,
    allAttendanceAndAssignment: allAttendanceAndAssignmentReducer,
    studentAllTimeClassList: studentAllTimeClassListReducer,
    openCloseTeacherRatingPopup: openCloseTeacherRatingPopupReducer,
    openCloseTeacherEditPopup: openCloseEditTeacherPopupReducer,
    callSocketMessageBroadcast: callSocketMessageBroadcastReducer,
    chatModuleNewUserLeaveUserInCallData:chatModuleNewUserLeaveUserInCallDataReducer,
    chatModuleCurrentCallGroupMembers:chatModuleCurrentCallGroupMembersReducer,
    chatModuleNewUserAddedInCurrentCall:chatModuleNewUserAddedInCurrentCallReducer,
    annotatorUserOnCapture:annotatorUserOnCaptureReducer,
    captureAnnotatorJSONData:captureAnnotatorJSONDataReducer,
    ipAddress: getIPAddressDataReducer,
    captureAnnotatorUndoRedoArray:getCaptureAnnotatorUndoRedoReducer,
    chatModuleIncomingCallGroupData:chatModuleIncomingCallGroupDataReducer,
    chatModuleCurrentCallGroupData:chatModuleCurrentCallGroupDataReducer,
    chatModuleAllGroupStartedCall:chatModuleAllGroupStartedCallReducer,
    teacherAllClassesList: teacherAllClassesListReducer,
    teacherAllTodayClassesList: teacherAllTodayClassesListReducer,
    teacherAllDemoClassesList: teacherAllDemoClassesListReducer,
    studentAllClassesList: studentAllClassesListReducer,
    allSchoolBoardDataList: allSchoolBoardDataListReducer,
    allSubjectDataList: allSubjectDataListReducer,
    allStudentDataList: allStudentDataListReducer,
    allNewStudentProfileDataList: allNewStudentProfileDataListReducer,
    allStudentSubscriptionDataList: allStudentSubscriptionDataListReducer,
    allTeacherDataList: allTeacherDataListReducer,
    latestTeacherDataList: latestTeachersDataListReducer,
    latestStudentDataList: latestStudentsDataListReducer,
    todayStudentProfileDataList: todayStudentProfileDataListReducer,
    latestSubscriptionDataList: latestSubscriptionsDataListReducer,
    latestDemoClassDataList: latestDemoClassesReducer,
    allAdminClassesDataList: allClassesDataListReducer,
    windowResizeCount: windowResizeCountReducer,
    userSignin: userSigninReducer,
    openCloseSignupPopup: openCloseSignupPopupReducer,
    openCloseLoginPopup: openCloseLoginPopupReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancer =  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof rootReducer>
export default store;
