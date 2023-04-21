import {
    actionToEndCurrentCurrentCallLocally, actionToGetActiveEditorJson,
    actionToGetTeacherAllClasses,
    actionToGetUserAllClasses,
    actionToMuteUnmuteUserCallLocally,
    actionToOpenRatingModalPopup,
    actionToSetCaptureAnnotatorJSONData,
    actionToSetCurrentCallDataGroupData,
    actionToSetMemberInGroupCall,
    handleWebSocketEventCall
} from "../actions/CommonAction";
import {CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS} from "../constants/CommonConstants";
import {cloneDeep} from "lodash";


let timeInterval = null;
let webSocketClient;
const setUserUniqueClientId = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    let uniqueId = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    localStorage.setItem('clientId',uniqueId);
}

export function getWebsocketConnectedMessage(W3CWebSocket,dispatch,userData) {
    setUserUniqueClientId();
    if (webSocketClient) {
        webSocketClient.onerror = webSocketClient.onopen = webSocketClient.onclose = null;
        webSocketClient.close();
    }
    let wsUrl = `wss://121tuition.in/api-call-tutor`;

    webSocketClient = new W3CWebSocket(wsUrl, null, {
        headers: {
            'Accept-Language': 'en,en-US;q=0.9,ru;q=0.8,de;q=0.7',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
        }
    })
    webSocketClient.onopen = () => {
        console.log('-------------- Websocket connection opened ------------',webSocketClient);
    }
    webSocketClient.onerror = () => {
        console.log('-------------- Reconnect websocket ------------',webSocketClient);
        getWebsocketConnectedMessage(W3CWebSocket,dispatch,userData);
    }
    webSocketClient.onmessage = (message) => {
        let result;
        try {
            result = JSON.parse(message.data);
        }  catch (e) {
            console.log('- websocket message error -------');
        }

        if (typeof(result) !== 'undefined' && typeof(result.error) !== 'undefined') {
            console.log('- websocket message error -------');
        } else {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer?.clientId !== localStorage.getItem('clientId'))
                dispatch(handleWebSocketEventCall(dataFromServer))
        }
    };
    webSocketClient.onclose = function () {
        console.log('-------------- Closed Reconnect websocket ------------',webSocketClient);
        setTimeout(function(){
            getWebsocketConnectedMessage(W3CWebSocket,dispatch,userData);
        },1000)
    }

    if(timeInterval != null)
        clearInterval(timeInterval);

    timeInterval = setInterval(function(){
        let data = {type:'wakeupMessage',message:'wakeup'};
        sendWebsocketRequest(JSON.stringify(data));
    },10000)
}

export function sendWebsocketRequestMedia(data){
    if(webSocketClient != null) {
        const ws = webSocketClient;
        const waitForConnection = function (callback, interval) {
            if (ws.readyState === 1) {
                callback();
            } else {
                //optional: implement backoff for interval here
                setTimeout(function () {
                    waitForConnection(callback, interval);
                }, interval);
            }
        };
        waitForConnection(function () {
            ws.send(data);
        }, 1000);
    }
}
export function sendWebsocketRequest(data){
    if(webSocketClient != null) {
        const ws = webSocketClient;
        const waitForConnection = function (callback, interval) {
            if (ws.readyState === 1) {
                callback();
            } else {
                //optional: implement backoff for interval here
                setTimeout(function () {
                    waitForConnection(callback, interval);
                }, interval);
            }
        };
        waitForConnection(function () {
            ws.send(data);
        }, 1000);
    }
}
export function handleWebSocketEvent(dispatch,state,data){
    //const {userInfo} = state.userSignin;
    const studentAllClassesList = state.studentAllClassesList;
    const chatModuleCurrentCallGroupData = state.chatModuleCurrentCallGroupData;
    switch(data.type){
        case 'logOutUserFromOtherDevices': {
            // if(data?.data?.id == userInfo?.id){
            //     dispatch(signout());
            // }
            }
            break;
        case 'startNewCallInGroupChannel': {
            let userFound = false;
            data?.members?.map((member)=>{
                if(studentAllClassesList?.classData?.id === member?.id){
                    userFound = true;
                }
            })
            if(userFound){
                dispatch(actionToSetCurrentCallDataGroupData(data.classGroupData));
                dispatch({type: CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS, payload: [...data?.members]});
            }
            break;
        }
        case 'addNewMemberDataInGroup':
            dispatch(actionToSetMemberInGroupCall(data.groupId,data.groupMembersInCurrentCall,data.memberData));
            break;
        case 'annotatorImageJson': {
            if(chatModuleCurrentCallGroupData?.id === data?.groupId) {
                dispatch(actionToSetCaptureAnnotatorJSONData(data.jsonObject, data.type));
            }
            break;
        }
        case 'actionToEndCurrentCurrentCall':
            if(chatModuleCurrentCallGroupData?.id === data?.groupId) {
                if(!chatModuleCurrentCallGroupData?.is_demo_class)
                    dispatch(actionToOpenRatingModalPopup(true,cloneDeep(chatModuleCurrentCallGroupData)));
                dispatch(actionToEndCurrentCurrentCallLocally(data?.groupId));
            }
            break;
        case 'actionToChangeActiveIndexEditorJson':
            if(chatModuleCurrentCallGroupData?.id === data?.groupId) {
                dispatch(actionToGetActiveEditorJson(data?.groupId));
            }
            break;
        case 'handleMuteUnmuteInCall': {
            dispatch(actionToMuteUnmuteUserCallLocally(data?.userId));
            break;
        }
        case 'refreshClassListDataForUser': {
            dispatch(actionToGetUserAllClasses(true));
            dispatch(actionToGetTeacherAllClasses(true));
            break;
        }
    }
}