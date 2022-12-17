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
    allStudentSubscriptionDataListReducer,
    studentAllClassesListReducer,
    studentAllTimeClassListReducer,
    studentAllTodayClassListReducer,
    allTeacherDataListReducer,
    latestTeachersDataListReducer,
    latestStudentsDataListReducer,
    latestSubscriptionsDataListReducer,
    allClassesDataListReducer,
    teacherAllClassesListReducer,
    teacherAllDemoClassListReducer,
    userSigninReducer,
    windowResizeCountReducer,
    openCloseTeacherRatingPopupReducer,
    allAttendanceAndAssignmentReducer,
    allDemoClassesReducer,
    allTeacherDataToAssignClassReducer,
    openCloseClassAssignPopupReducer,
    allClassToAssignClassReducer, latestDemoClassesReducer,
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
    openCloseClassAssignPopup: {isOpen:false,dropdownData:{}},
    windowResizeCount: 0,
    allSubjectDataList:{prevId:'',loading:true,subjectData:[]},
    allStudentDataList:{prevId:'',loading:true,studentData:[]},
    allNewStudentProfileDataList:{prevId:'',loading:true,studentData:[]},
    allStudentSubscriptionDataList:{prevId:'',loading:true,studentData:[]},
    allTeacherDataList:{prevId:'',loading:true,teacherData:[]},
    latestTeacherDataList:{prevId:'',loading:true,teacherData:[]},
    latestStudentDataList:{prevId:'',loading:true,studentData:[]},
    latestSubscriptionDataList:{prevId:'',loading:true,subscriptionData:[]},
    latestDemoClassDataList:{prevId:'',loading:true,classData:[]},
    allSchoolBoardDataList:{prevId:'',loading:true,boardData:[]},
    studentAllClassesList:{prevId:'',loading:true,classData:[]},
    teacherAllClassesList:{prevId:'',loading:true,classData:[]},
    allDemoClasses:{prevId:'',loading:true,classData:[]},
    teacherAllDemoClassList:[],
    studentAllTodayClassList:[],
    studentAllTimeClassList:[],
    chatModuleAllGroupStartedCall:[],
    chatModuleCurrentCallGroupData:{},
    chatModuleIncomingCallGroupData:{},
    captureAnnotatorUndoRedoArray:{undo:[],redo:[]},
    ipAddress:'',
    captureAnnotatorJSONData: {},
    annotatorUserOnCapture:{},
    chatModuleCurrentCallGroupMembers:[],
    chatModuleNewUserAddedInCurrentCall:{},
    chatModuleNewUserLeaveUserInCallData:{},
    callSocketMessageBroadcast:'',
    allAttendanceAndAssignment:{prevId:'',loading:true,attendanceData:[]},
    allTeacherDataToAssignClass:{prevId:'',loading:true,teacherData:[]},
    allClassToAssignClass:{prevId:'',loading:true,classData:[]},
};
export const rootReducer = combineReducers({
    allClassToAssignClass: allClassToAssignClassReducer,
    openCloseClassAssignPopup: openCloseClassAssignPopupReducer,
    allTeacherDataToAssignClass: allTeacherDataToAssignClassReducer,
    allDemoClasses: allDemoClassesReducer,
    allAttendanceAndAssignment: allAttendanceAndAssignmentReducer,
    studentAllTimeClassList: studentAllTimeClassListReducer,
    openCloseTeacherRatingPopup: openCloseTeacherRatingPopupReducer,
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
    teacherAllDemoClassList: teacherAllDemoClassListReducer,
    teacherAllClassesList: teacherAllClassesListReducer,
    studentAllTodayClassList: studentAllTodayClassListReducer,
    studentAllClassesList: studentAllClassesListReducer,
    allSchoolBoardDataList: allSchoolBoardDataListReducer,
    allSubjectDataList: allSubjectDataListReducer,
    allStudentDataList: allStudentDataListReducer,
    allNewStudentProfileDataList: allNewStudentProfileDataListReducer,
    allStudentSubscriptionDataList: allStudentSubscriptionDataListReducer,
    allTeacherDataList: allTeacherDataListReducer,
    latestTeacherDataList: latestTeachersDataListReducer,
    latestStudentDataList: latestStudentsDataListReducer,
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
