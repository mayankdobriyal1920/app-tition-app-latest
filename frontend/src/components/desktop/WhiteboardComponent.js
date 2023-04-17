import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fabric} from 'fabric';
import {
    createCopyOfFreeDraw,
    drawLineArrow,
    drawObjectInCanvas,
    setUserId,
    returnPathShapeName, setSelectToolColorToEditor
} from "../../helper/EditorToolbar";
import {eventBus} from "../../helper/EventBus";
import {useEffectOnce} from "../../helper/UseEffectOnce";
import {cloneDeep} from "lodash";
import {actionToSendFabricDataToOtherUser, actionToUpdateIpAddress} from "../../actions/CommonAction";
import {ANNOTATOR_UNDO_REDO_CAPTURE, ANNOTATOR_USER_ON_CAPTURE} from "../../constants/CommonConstants";
import {_generateUniqueId} from "../../helper/CommonHelper";
import {FacebookLoader} from "../Loader/FacebookLoader";

let undo,redo,undoArray=[];
const customAnnotationId = _generateUniqueId();
let canvasReservedJson = [];
export default function WhiteboardComponent({groupId}){
    const captureAnnotatorJSONData = useSelector((state) => state.captureAnnotatorJSONData);
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const [activeSelectedTool,setActiveSelectedTool] = useState('draw');
    const [canvasLoading,setCanvasLoading] = useState(true);
    const captureAnnotatorUndoRedoArray = useSelector((state) => state.captureAnnotatorUndoRedoArray);
    const [selectActiveTool,setSelectActiveTool] = useState(false);
    const [selectedToolColor,setSelectedToolColor] = useState('#FF0000');
    const [canvasActivePage,setCanvasActivePage] = useState(0);
    redo = captureAnnotatorUndoRedoArray.redo;
    undo = captureAnnotatorUndoRedoArray.undo;
    const dispatch = useDispatch();

    const editCanvasRef = useRef();

    const callFunctionToActiveSelectTool = (id)=>{
        drawObjectInCanvas(id,window.fabricCanvas)
        setActiveSelectedTool(id);
    }
    const goToPrevCanvasPage = (index)=>{
        if(index >= 0) {
            canvasReservedJson[index] = JSON.stringify(window.fabricCanvas);
            window.fabricCanvas.clear();
            let newIndex = index - 1;
            setCanvasActivePage(newIndex);
            if(canvasReservedJson[newIndex]) {
                window.fabricCanvas.loadFromJSON(canvasReservedJson[newIndex], function () {
                    window.fabricCanvas.renderAll();
                })
            }
        }
    }
    const goToNextCanvasPage = (index)=>{
        if(index >= 0) {
            canvasReservedJson[index] = JSON.stringify(window.fabricCanvas);
            let newIndex = index + 1;
            setCanvasActivePage(index + 1);
            window.fabricCanvas.clear();
            if(canvasReservedJson[newIndex]) {
                window.fabricCanvas.loadFromJSON(canvasReservedJson[newIndex], function () {
                    window.fabricCanvas.renderAll();
                })
            }
        }
    }
    const callFunctionToSetChangeColor = (color)=>{
        setSelectToolColorToEditor(window.fabricCanvas,color)
        setSelectedToolColor(color);
    }
    const storeUndoAndRedo = (userPointer,type,userObject = '')=>{
        if(type != 'select'){
            let undoType= type === 'add' ? 'remove' : type === 'remove' ? 'add' : type;
            let undo = cloneDeep(undoArray);
            undo.push({type:type,userPointer: cloneDeep(userPointer),undoType:undoType,userObject:userObject.userObject,undoRedoCanvasSizeArray:userObject.undoRedoCanvasSizeArray});
            undoArray=undo;
            dispatch({type:ANNOTATOR_UNDO_REDO_CAPTURE,payload:{undo:undo,redo:[]}});
        }
    }

    const applyUndoRedo = (type)=>{
        if((type === 'undo' && undo.length > 0) || (type === 'redo' && redo.length > 0)) {
            let last;
            let lastElement = false;
            if (type === 'undo') {
                last = undo.pop();
                redo.push(last);
                lastElement = last;
            } else {
                last = redo.pop();
                undo.push(last);
                lastElement = last;
            }
            if(lastElement){
                if(undo.length > 19)
                    undo.splice(0,1);
                if(redo.length > 19)
                    redo.splice(0,1);

                dispatch({type:ANNOTATOR_UNDO_REDO_CAPTURE,payload:{undo:undo,redo:redo}});
                let userPointer = lastElement.userPointer;
                let userObject = lastElement.userObject;
                let fabricCanvas = window.fabricCanvas;
                let lastType = (type === 'undo') ? lastElement.undoType : lastElement.type;

                switch(lastType){
                    case 'add': {
                        let zoom = window.fabricCanvas.getZoom();
                        let height = window.fabricCanvas.getHeight();
                        let width = window.fabricCanvas.getWidth();
                        window.fabricCanvas.add(userPointer);
                        window.fabricCanvas.setZoom(zoom);
                        window.fabricCanvas.setHeight(height);
                        window.fabricCanvas.setWidth(width);
                        window.fabricCanvas.renderAll();
                        sendToWebsocketFabric(userPointer,lastType);
                        break;
                    }
                    case 'remove': {
                        let zoom = window.fabricCanvas.getZoom();
                        let height = window.fabricCanvas.getHeight();
                        let width = window.fabricCanvas.getWidth();
                        fabricCanvas.forEachObject(function (obj) {
                            if (userPointer && obj.id === userPointer.id) {
                                window.fabricCanvas.remove(obj);
                                window.fabricCanvas.setZoom(zoom);
                                window.fabricCanvas.setHeight(height);
                                window.fabricCanvas.setWidth(width);
                                window.fabricCanvas.renderAll();
                                sendToWebsocketFabric(obj,lastType);
                            }
                        });
                        break;
                    }
                    default:
                        fabricCanvas.forEachObject(function(obj){
                            if(obj.id === userPointer.id) {
                                if(type === 'undo'){
                                    obj.set(userObject);
                                }else{
                                    obj.set({
                                        left:userPointer.left,
                                        skewX:userPointer.skewX,
                                        skewY:userPointer.skewY,
                                        top:userPointer.top,
                                        width:userPointer.width,
                                        height:userPointer.height,
                                        scaleX:userPointer.scaleX,
                                        scaleY:userPointer.scaleY,
                                        angle:userPointer.angle
                                    });
                                }
                                obj.setCoords();
                                window.fabricCanvas.renderAll();
                                sendToWebsocketFabric(obj,lastType);
                            }});
                }
            }
        }
    }
    const removeFromFabric = () =>{
        window.fabricCanvas.off("path:created", addDrawLineElement);
    }
    const eventOnFabric = () =>{
        setTimeout(function() {
            removeFromFabric();
            window.fabricCanvas.on("path:created", addDrawLineElement);
        });
    }
    const addDrawLineElement = (opt) => {
        let pathShapeName = returnPathShapeName();
        if(pathShapeName === 'free draw' && opt.path.shapeName !== 'free draw'){
            createCopyOfFreeDraw(window.fabricCanvas,opt.path,pathShapeName);
        } else {
            window.fabricCanvas.remove(opt.path);
        }
        returnPathShapeName('path');
    }
    const callFunctionToLoadImageInCanvas = ()=>{
        window.fabricCanvas = window._canvas = new fabric.Canvas('modal_screenshot_image_canvas');
        window.fabricCanvas.selection = false;
        window.fabricCanvas.freeDrawingBrush.color = 'red';
        window.fabricCanvas.isDrawingMode = true;

        let clientWidth = document.querySelector('.center_white_board_video_main_container').clientWidth;
        let clientHeight = document.querySelector('.center_white_board_video_main_container').clientHeight;

        console.log('clientWidth',clientWidth);
        console.log('clientHeight',clientHeight);

        setTimeout(function(){
            let rect = new fabric.Rect({
                width: clientWidth,
                height: clientHeight,
                fill: 'white'
            });
            window.fabricCanvas.setDimensions({width: clientWidth, height: clientHeight});
            window.fabricCanvas.add(rect);
            drawLineArrow(window.fabricCanvas);
            callFunctionToActiveSelectTool('draw');
            eventOnFabric();
            setCanvasLoading(false);
        })
    }
    const sendToWebsocketFabric = (userPointer,type)=>{
        sendToWebsocketFabricToOtherUser(userPointer,type);
    }
    const sendToWebsocketFabricToOtherUser = (userPointer,type)=>{
        if(userPointer?.id){
            let canvas_object = {height:window.fabricCanvas.height,width:window.fabricCanvas.width};
            let jsonObject = JSON.stringify(canvas_object).toString();
            let currentIndex = window.fabricCanvas.getObjects().indexOf(userPointer);
            canvasReservedJson[canvasActivePage] = JSON.stringify(window.fabricCanvas);
            dispatch(actionToSendFabricDataToOtherUser({groupId:groupId,canvasReservedJson:canvasReservedJson,userId:(userInfo != null ? userInfo.id : 0),canvasJson:jsonObject,custom_editor_id:customAnnotationId,
                type:type,userPointer:userPointer,objectId:userPointer?.id,currentIndex:currentIndex}));
        }
    }
    const sendToWebsocketFabricData = (data) => {
        switch(data.type){
            case 'add':
                if(data.userPointer.shapeName !== 'path'){
                    sendToWebsocketFabric(data.userPointer,data.type);
                    storeUndoAndRedo(data.userPointer,data.type);
                }
                break;
            case 'remove':
                sendToWebsocketFabric(data.userPointer,data.type);
                storeUndoAndRedo(data.userPointer,data.type);
                break;
            case 'undo':
            case 'redo':
                sendToWebsocketFabric(data.userPointer,data.type);
                storeUndoAndRedo(data.userPointer,data.type);
                break;
        }
    }
    const generateUserPosition = (left,top,height,shapeName,scaleY) => {
        let userLeft,userTop, userIconHeightAdjust = 2;
        let zoom = window.fabricCanvas.getZoom();
        switch(shapeName){
            case 'circle':
                userLeft = left;
                userTop = top+(height*scaleY)+userIconHeightAdjust;
                break;
            default:
                userLeft = left;
                userTop = top+(height*scaleY)+userIconHeightAdjust;
                break;
        }
        return {userLeft:userLeft*zoom, userTop:userTop*zoom}
    }
    const refreshUserDraw = () => {
        let userDetailData = [];
        if( window.fabricCanvas){
            let canvasJson = window.fabricCanvas.toObject().objects;
            Object.keys(canvasJson).forEach(function(key) {
                let obj = canvasJson[key];
                if(obj != null){
                    if(obj.userId && obj.shapeName !== 'path'){
                        let {userLeft,userTop} = generateUserPosition(obj.left,obj.top,obj.height,obj.shapeName,obj.scaleY);
                        userDetailData.unshift({userLeft:userLeft,
                            userTop:userTop,
                            userId: obj.userId,
                            customEditorIdValue:obj.customEditorId,
                            shapeName:obj.shapeName,
                            id:obj.id,
                            lastModifiedTime:obj.lastModifiedTime,
                            text:obj.text
                        });
                    }
                }
            });
        }
        dispatch({type:ANNOTATOR_USER_ON_CAPTURE,payload:userDetailData});
    }

    const drawFromWebSocket = (jsonObject,type,userPointer,sizeArray,currentIndex) =>{
        if(jsonObject != null){
            let scaledHeight = jsonObject.height;
            let scaledWidth = jsonObject.width;
            let originalHeight = window.fabricCanvas.height;
            let originalWidth = window.fabricCanvas.width;
            let widthRatio = 0;
            let heightRatio = 0;
            widthRatio = originalWidth / scaledWidth;
            heightRatio = originalHeight / scaledHeight;
            let scale = Math.min(widthRatio, heightRatio);
            let fabricCanvas = window.fabricCanvas;

            switch(type){
                case 'add':
                    fabric.util.enlivenObjects([userPointer], function(objects) {
                        objects.forEach(function(o) {
                            o.left = o.left * scale;
                            o.top = o.top * scale;
                            window.fabricCanvas.add(o);
                            window.fabricCanvas.renderAll();
                        });
                    });
                    setTimeout(function (){
                        refreshUserDraw();
                    })
                    break;
                case 'remove':
                    fabricCanvas.forEachObject(function(obj){
                        console.log('obj',obj);
                        if(userPointer && obj.id === userPointer.id) {
                            window.fabricCanvas.remove(obj);
                            window.fabricCanvas.renderAll();
                            refreshUserDraw();
                        }});
                    break;
                case 'select':
                    console.log('select')
                    break;
                default:
                    fabricCanvas.forEachObject(function(obj){
                        if(obj.id === userPointer.id) {
                            window.fabricCanvas.remove(obj)
                        }});

                    fabric.util.enlivenObjects([userPointer], function(objects) {
                        objects.forEach(function(o) {
                            window.fabricCanvas.add(o);
                            if(currentIndex >= 0)
                                window.fabricCanvas.moveTo(o,currentIndex);
                            window.fabricCanvas.renderAll();
                            refreshUserDraw();
                        });
                    });
            }
        }
    }

    useEffectOnce(()=>{
        callFunctionToLoadImageInCanvas();
        eventBus.remove('send-to-websocket-fabric');
        eventBus.on('send-to-websocket-fabric',sendToWebsocketFabricData);
        dispatch(actionToUpdateIpAddress());
        setUserId(userInfo?.id);
        setSelectedToolColor('#FF0000');
        return ()=>{
            eventBus.remove('send-to-websocket-fabric',sendToWebsocketFabricData);
        }
    },[editCanvasRef]);

    React.useEffect(()=>{
        if(captureAnnotatorJSONData && window.fabricCanvas && captureAnnotatorJSONData.custom_editor_id != customAnnotationId && captureAnnotatorJSONData.canvasJson){
            drawFromWebSocket(JSON.parse(captureAnnotatorJSONData.canvasJson),captureAnnotatorJSONData.type,captureAnnotatorJSONData.userPointer,captureAnnotatorJSONData.sizeArray,captureAnnotatorJSONData.currentIndex);
        }
    },[captureAnnotatorJSONData]);


    return(
        <div>
            {(canvasLoading) ?
                <div style={{background:'#fff'}} className={"canvas_editor_tools_main_section mt-55"}>
                  <FacebookLoader type={"facebookStyle"} item={5}/>
                </div>
                :''
            }
            <div>
                <div className={"canvas_editor_tools_main_section mt-30"}>
                    <div className={"canvas_editor_inner_main_section"}>
                    <button onClick={()=>callFunctionToActiveSelectTool('draw')} className={"canvas_tool "+(activeSelectedTool === 'draw' ? 'active' : '')}>
                        <svg width="18" height="18" viewBox="0 0 20 20.002"><path d="M144,345.24a1,1,0,0,0-.29-.71l-4.24-4.24a1.014,1.014,0,0,0-1.42,0l-2.83,2.83h0l-10.93,10.93a1,1,0,0,0-.29.71V359a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.76-.29l10.87-10.93h0l2.84-2.78a1.183,1.183,0,0,0,.22-.33.963.963,0,0,0,0-.24.654.654,0,0,0,0-.14ZM128.83,358H126v-2.83l9.93-9.93,2.83,2.83Zm11.34-11.34-2.83-2.83,1.42-1.41,2.82,2.82Z" transform="translate(-124 -340)" fill="#fff"></path></svg>
                    </button>
                    {/*<button onClick={()=>callFunctionToActiveSelectTool('select')} className={"canvas_tool "+(activeSelectedTool === 'select' ? 'active' : '')}>*/}
                    {/*   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path id="mouse-pointer" d="M6.051,15.5.062,1.126A.813.813,0,0,1,1.126.063L15.5,6.051a.813.813,0,0,1-.052,1.521L10.426,9.277l4.513,4.513a.813.813,0,1,1-1.149,1.149L9.277,10.426,7.571,15.448A.811.811,0,0,1,6.828,16H6.8A.812.812,0,0,1,6.051,15.5Zm.673-2.612L8.158,8.666a.807.807,0,0,1,.509-.508l4.22-1.434L2.322,2.323Z" transform="translate(0)" fill="#fff"></path></svg>*/}
                    {/*</button>*/}
                    <button onClick={()=>callFunctionToActiveSelectTool('arrow')} className={"canvas_tool "+(activeSelectedTool === 'arrow' ? 'active' : '')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" viewBox="0 0 200.981 200.981"><path d="M17.511 10.264h111.557V0H.007v129.068h10.25l.014-111.553L193.72 200.981l7.254-7.254z" fill="#fff"/></svg>
                    </button>
                    <button onClick={()=>callFunctionToActiveSelectTool('circle')} className={"canvas_tool "+(activeSelectedTool === 'circle' ? 'active' : '')}>
                        <svg width="18" height="18" viewBox="0 0 20 20"><defs></defs><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" transform="translate(-2 -2)" fill="#fff"></path></svg>
                    </button>
                    <button onClick={()=>callFunctionToActiveSelectTool('rectangle')} className={"canvas_tool "+(activeSelectedTool === 'rectangle' ? 'active' : '')}>
                        <svg width="18" height="18" viewBox="0 0 20 20"><defs></defs><path d="M21,2H3A1,1,0,0,0,2,3V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM20,20H4V4H20Z" transform="translate(-2 -2)" fill="#fff"></path></svg>
                    </button>
                    <button onClick={()=>undo.length > 0 ? applyUndoRedo('undo') : ''}
                            className={"canvas_tool " + (undo.length > 0 ? 'undo_redo_enable': 'undo_redo_disable')}>
                        <svg width="15" height="18" viewBox="0 0 17.5 20"><path d="M5.469,5.883c7.453,0,9.844,1.118,9.844,5.566,0,4.72-2.542,6.618-9.775,6.13a1.125,1.125,0,0,0-1.161,1.1A1.151,1.151,0,0,0,5.4,19.929c8.372.565,12.1-2.221,12.1-8.481,0-3.387-1.291-5.6-3.783-6.769-1.9-.886-4.228-1.15-8.248-1.15V0L0,4.706,5.469,9.413Z" fill="#fff"></path></svg>
                    </button>
                    <button onClick={()=>redo.length > 0 ? applyUndoRedo('redo') : ''}
                            className={"canvas_tool " + (redo.length > 0 ? 'undo_redo_enable': 'undo_redo_disable')}>
                        <svg width="15" height="18" viewBox="0 0 17.5 20"><defs></defs><path d="M12.031,5.883C4.578,5.883,2.188,7,2.188,11.449c0,4.72,2.542,6.618,9.775,6.13a1.125,1.125,0,0,1,1.161,1.1A1.151,1.151,0,0,1,12.1,19.929C3.729,20.493,0,17.707,0,11.448c0-3.387,1.291-5.6,3.783-6.769,1.9-.886,4.228-1.15,8.248-1.15V0L17.5,4.706,12.031,9.413Z" fill="#fff"></path></svg>
                    </button>
                </div>
                    <div className="supported_tools_main_ctrl test">
                        <div className="st_colors">
                            <div
                                onClick={()=>setSelectActiveTool(false)}
                                className={"color_varians_main_ctrl "+(selectActiveTool ? 'select_tool_active' : '')}
                                id="color_variant_main_ctrl">
                                <div className="cv_innr_ctrl" data-color={selectedToolColor}>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#FF0000') ? 'active' : '')}
                                         style={{background: "#FF0000"}}
                                         data-id="#FF0000"
                                         onClick={()=>callFunctionToSetChangeColor('#FF0000')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#FD612C') ? 'active' : '')}
                                         style={{background: "#FD612C"}}
                                         data-id="#FD612C"
                                         onClick={()=>callFunctionToSetChangeColor('#FD612C')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#FD9A00') ? 'active' : '')}
                                         style={{background: "#FD9A00"}}
                                         data-id="#FD9A00"
                                         onClick={()=>callFunctionToSetChangeColor('#FD9A00')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#EEC300') ? 'active' : '')}
                                         style={{background: "#EEC300"}}
                                         data-id="#EEC300"
                                         onClick={()=>callFunctionToSetChangeColor('#EEC300')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#A4CF30') ? 'active' : '')}
                                         style={{background: "#A4CF30"}}
                                         data-id="#A4CF30"
                                         onClick={()=>callFunctionToSetChangeColor('#A4CF30')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#62D26F') ? 'active' : '')}
                                         style={{background: "#62D26F"}}
                                         data-id="#62D26F"
                                         onClick={()=>callFunctionToSetChangeColor('#62D26F')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#37C5AB') ? 'active' : '')}
                                         style={{background: "#37C5AB"}}
                                         data-id="#37C5AB"
                                         onClick={()=>callFunctionToSetChangeColor('#37C5AB')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#20AAEA') ? 'active' : '')}
                                         style={{background: "#20AAEA"}}
                                         data-id="#20AAEA"
                                         onClick={()=>callFunctionToSetChangeColor('#20AAEA')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#4186E0') ? 'active' : '')}
                                         style={{background: "#4186E0"}}
                                         data-id="#4186E0"
                                         onClick={()=>callFunctionToSetChangeColor('#4186E0')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#7A6FF0') ? 'active' : '')}
                                         style={{background: "#7A6FF0"}}
                                         data-id="#7A6FF0"
                                         onClick={()=>callFunctionToSetChangeColor('#7A6FF0')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#AA62E3') ? 'active' : '')}
                                         style={{background: "#AA62E3"}}
                                         data-id="#AA62E3"
                                         onClick={()=>callFunctionToSetChangeColor('#AA62E3')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#EA4E9D') ? 'active' : '')}
                                         style={{background: "#EA4E9D"}}
                                         data-id="#EA4E9D"
                                         onClick={()=>callFunctionToSetChangeColor('#EA4E9D')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#A98BAF') ? 'active' : '')}
                                         style={{background: "#A98BAF"}}
                                         data-id="#A98BAF"
                                         onClick={()=>callFunctionToSetChangeColor('#A98BAF')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#FC91AD') ? 'active' : '')}
                                         style={{background: "#FC91AD"}}
                                         data-id="#FC91AD"
                                         onClick={()=>callFunctionToSetChangeColor('#FC91AD')}>
                                    </div>
                                    <div className={"colored_icon_ctrl "+((selectedToolColor === '#666666') ? 'active' : '')}
                                         style={{background: "#666666"}}
                                         data-id="#666666"
                                         onClick={()=>callFunctionToSetChangeColor('#666666')}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"center_white_board_video_main_container"}>
                    <canvas ref={editCanvasRef} id="modal_screenshot_image_canvas"></canvas>
                </div>
                <div className={"canvas_next_prev_button_container"}>
                    <div className={"next_prev_button"}>
                        <button disabled={!canvasActivePage} onClick={()=>goToPrevCanvasPage(canvasActivePage)} type={"button"}>PREV</button>
                    </div>
                    <div className={"next_prev_button page_number"}>
                        <button type={"button"}>{canvasActivePage+1}</button>
                    </div>
                    <div className={"next_prev_button"}>
                        <button onClick={()=>goToNextCanvasPage(canvasActivePage)} type={"button"}>NEXT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}