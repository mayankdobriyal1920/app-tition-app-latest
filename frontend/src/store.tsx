import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
    allSchoolBoardDataListReducer,
    allSubjectDataListReducer,
    annotatorUserOnCaptureReducer, callSocketMessageBroadcastReducer,
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
    studentAllClassesListReducer, studentAllTimeClassListReducer,
    studentAllTodayClassListReducer,
    teacherAllClassesListReducer,
    teacherAllDemoClassListReducer,
    userSigninReducer,
    windowResizeCountReducer,
} from "./reducers/CommonReducers";

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo') || `{}`)
            : null,
    },
    openCloseSignupPopup: {isOpen:false},
    openCloseLoginPopup: {isOpen:false},
    windowResizeCount: 0,
    allSubjectDataList:{prevId:'',loading:true,subjectData:[]},
    allStudentDataList:{prevId:'',loading:true,subjectData:[]},
    allSchoolBoardDataList:{prevId:'',loading:true,boardData:[]},
    studentAllClassesList:{prevId:'',loading:true,classData:[]},
    teacherAllClassesList:{prevId:'',loading:true,classData:[]},
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
};
export const rootReducer = combineReducers({
    studentAllTimeClassList: studentAllTimeClassListReducer,
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
