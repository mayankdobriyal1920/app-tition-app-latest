import {fabric} from 'fabric';
import $ from 'jquery';
import {eventBus} from "./EventBus";

let drawActive = false;
let selectedToolColor = '#FF0000';
let selectedToolStroke = 2;
let pathShapeName = 'path';
let userId,custom_editor_id;

fabric.Object.prototype.toObject = (function (toObject) {
    return function (properties) {
        return fabric.util.object.extend(toObject.call(this, properties), {
            id : this.id,
            userId : this.userId,
            customEditorId : this.customEditorId,
            shapeName: this.shapeName,
            lastModifiedTime: this.lastModifiedTime
        });
    };
})(fabric.Object.prototype.toObject);

export function setUserId(id){
    userId = id;
}

export function drawObjectInCanvas(id,selectedCanvas,color){
    let activeObjectElement= selectedCanvas.getActiveObject();
    selectedCanvas.isDrawingMode = true;
    selectedCanvas.freeDrawingBrush = new fabric.PencilBrush(selectedCanvas);
    selectedCanvas.freeDrawingBrush.color = selectedToolColor;
    selectedCanvas.freeDrawingBrush.width = 0;
    drawActive= false;

    switch(id){
        case 'draw':
            changeObjectSelection(false, selectedCanvas);
            drawActive= true;
            selectedCanvas.freeDrawingBrush = new fabric.PencilBrush(selectedCanvas);
            selectedCanvas.freeDrawingBrush.width = Number(selectedToolStroke);
            selectedCanvas.freeDrawingBrush.color = selectedToolColor;
            enableFreeDrawing(selectedCanvas,'free draw');
            return;
        case 'undo':
        case 'redo':
            removeEvents(selectedCanvas);
            break;
        case 'select':
            removeEvents(selectedCanvas);
            selectedCanvas.isDrawingMode = false;
            //Changing cursor of canvas brush
            $(".modal_screenshot_image").addClass('modal_screenshot_image_cursor_move');
            $(".modal_screenshot_image").removeClass('modal_screenshot_image_cursor_crosshair');
            changeObjectSelection(true, selectedCanvas);
            break;
        case 'circle':
            changeObjectSelection(false, selectedCanvas);
            drawCircle(selectedCanvas);
            break;
        case 'arrow':
            changeObjectSelection(false, selectedCanvas);
            drawLineArrow(selectedCanvas);
            break;
        case 'rectangle':
            changeObjectSelection(false, selectedCanvas);
            drawRectangle(selectedCanvas);
            break;

    }
}

export function setSelectToolColorToEditor(selected_canvas,color){
    selectedToolColor = color;
    selected_canvas.freeDrawingBrush.color = color;
    // if(typeof selected_canvas.getActiveObject() != "undefined" && selected_canvas.getActiveObject() != null) {
    //     const currentSelectedObject = selected_canvas.getActiveObject();
    //     currentSelectedObject.set('stroke',color);
    // }
    selected_canvas.renderAll();
}
export function enableFreeDrawing(selected_canvas,shapeName){
    removeEvents(selected_canvas);
    console.log('selectedToolColor',selectedToolColor);
    selected_canvas.freeDrawingBrush.color = selectedToolColor;
    selected_canvas.isDrawingMode = true;

    let isDown;
    selected_canvas.on('mouse:down', function () {
        isDown= true;
        pathShapeName = shapeName;
    });
    selected_canvas.on('mouse:up', function () {
        if (!isDown) return;
        isDown = false;
    });
}
export function changeObjectSelection(value, selected_canvas) {
    if(value){
        $(".modal_screenshot_image").addClass('modal_screenshot_image_cursor_move');
        $(".modal_screenshot_image").removeClass('modal_screenshot_image_cursor_crosshair');
    }else{
        window.fabricCanvas._activeObject = null;
    }

    selected_canvas.forEachObject(function (obj) {
        if (obj.stroke == '#f1f1f100') {
            obj.selectable = false;
            selected_canvas.sendToBack(obj);
        }else if(obj.shapeName == 'polygon-start'){
            selected_canvas.remove(obj);
        }else if(obj.backgroundColor == '#capture') {
            obj.selectable = false;
        } else {
            obj.selectable = value;
            obj.hasControls = value;
            obj.hasBorders = value;
            obj.borderColor = '#000';
            obj.cornerColor = '#6B7587';
            obj.cornerStyle = 'circle';
            obj.cornerSize = 10;
            obj.padding = 0;
            obj.LockRotation = value;
            obj.transparentCorners = false;
        }
    });
    selected_canvas.renderAll();
}
export function drawLineArrow(selected_canvas){
    removeEvents(selected_canvas);
    selected_canvas.isDrawingMode = true;
    selected_canvas.freeDrawingBrush.color = "#f1f1f100";
    selected_canvas.freeDrawingBrush.width = 0;
    // Extended fabric line class
    var canvas = selected_canvas;
    var triangle,triangle2, isDown, origX, origY,height,width;

    canvas.on('mouse:down', function(o) {
        isDown = true;
        var pointer = canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        width= origX;
        height=origY;
        triangle = new fabric.Triangle({
            left: origX,
            top: origY,
            originX: 'center',
            originY: 'center',
            selectable: false,
            pointType: 'arrow_start',
            angle: -45,
            width: selectedToolStroke+22,
            height: selectedToolStroke+20,
            fill: selectedToolColor
        });
        triangle2 = new fabric.Triangle({
            left: origX,
            top: origY,
            originX: 'center',
            originY: 'center',
            selectable: false,
            pointType: 'arrow_end',
            angle: -45,
            width: selectedToolStroke+9,
            height: selectedToolStroke+22,
            fill: selectedToolColor,
            absolutePositioned: true
        });
        canvas.add(triangle2, triangle);

    });

    var _FabricCalcArrowAngle = (x1, y1, x2, y2) =>{
        var angle = 0, x, y;
        x = (x2 - x1);
        y = (y2 - y1);
        if (x === 0) {
            angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
        } else if (y === 0) {
            angle = (x > 0) ? 0 : Math.PI;
        } else {
            angle = (x < 0) ? Math.atan(y / x) + Math.PI :
                (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
        }
        return (angle * 180 / Math.PI + 90);
    };
    var _FabricCalcArrowAngle2 = (x1, y1, x2, y2) =>{
        var angle = 0, x, y;
        x = (x2 - x1);
        y = (y2 - y1);
        if (x === 0) {
            angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
        } else if (y === 0) {
            angle = (x > 0) ? 0 : Math.PI;
        } else {
            angle = (x < 0) ? Math.atan(y / x) + Math.PI :
                (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
        }
        return (angle * 180 / Math.PI + 270);
    };
    var _getDistance = (xA, yA, xB, yB)=> {
        var xDiff = xA - xB;
        var yDiff = yA - yB;

        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    };
    var _getMidpoint =(x1, x2, y1, y2)=>
    {
        return {left:(x1 + x2) / 2 , top:(y1 + y2) / 2};
    }

    canvas.on('mouse:move', function(o) {
        if (isDown) {
            var pointer = canvas.getPointer(o.e);
            var distance =  _getDistance(origX,origY,pointer.x,pointer.y);
            var midPoint = _getMidpoint(origX,pointer.x,origY,pointer.y);
            triangle.set({
                'left': pointer.x,
                'top': pointer.y,
                'angle': _FabricCalcArrowAngle(origX,
                    origY,
                    pointer.x,
                    pointer.y)
            });
            triangle2.set({
                left:midPoint.left,
                top:midPoint.top,
                'height':distance-7,
                'angle': _FabricCalcArrowAngle2(origX,
                    origY,
                    pointer.x,
                    pointer.y)
            });
            width= Math.abs(origX - pointer.x);
            height=Math.abs(origY - pointer.y);
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;
        var group = new fabric.Group([triangle,triangle2], {
                id:'line-arrow'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
                userId: userId,
                customEditorId:custom_editor_id,
                shapeName:'line arrow',
                lastModifiedTime:new Date(),
                selectable:true,
                hasControls:true,
                borderColor:'#000',
                hasBorders:true,
                cornerStyle:'circle',
                cornerSize:10,
                cornerColor:'#6B7587',
                padding:0,
                LockRotation: true,
                transparentCorners:false,
                fill: selectedToolColor,
                strokeWidth:selectedToolStroke
            }
        );

        group.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            br: false,
            tl: false,
            //mtr: false,
        });

        canvas.remove(triangle,triangle2);// removing old object
        // console.log(group,'group',height, origY , width, origX)
        if(height == origY && width == origX){
            return true;
        }else {
            canvas.add(group);
            canvas.setActiveObject(group);
            //canvas.isDrawingMode = false;
            eventBus.dispatch('send-to-websocket-fabric', {type: 'add', userPointer: group});
        }
    });

}
function drawCircle(selected_canvas) {
    let circle, isDown, origX, origY;
    removeEvents(selected_canvas);
    selected_canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        circle = new fabric.Circle({
            top: origY,
            left: origX,
            radius: 0,
            noScaleCache: false,
            strokeUniform: true,
            id: 'circle' + new Date().getTime() + Math.random().toString(36).substr(2, 8) + userId,
            userId: userId,
            customEditorId: custom_editor_id,
            fill: '',
            strokeWidth: selectedToolStroke,
            stroke: selectedToolColor,
            shapeName: 'circle',
            lastModifiedTime: new Date(),
            selectable: true,
            hasControls: true,
            borderColor: '#000',
            hasBorders: true,
            cornerStyle: 'circle',
            cornerSize: 10,
            cornerColor: '#6B7587',
            padding: 0,
            LockRotation: true,
            transparentCorners: false,
        });
        selected_canvas.add(circle);
    });

    selected_canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        let pointer = selected_canvas.getPointer(o.e);
        if (origX > pointer.x) {
            circle.set({
                left: (pointer.x)
            });
        }

        if (origY > pointer.y) {
            circle.set({
                top: (pointer.y)
            });
        }

        circle.set({
            radius: Math.abs(origX - pointer.x) / 2
        });

        selected_canvas.renderAll();
    });

    selected_canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;

        if(circle.radius == 0){
            selected_canvas.remove(circle);
        }else{
            circle.setControlsVisibility({mb:false,
                ml:false,
                mt:false,
                mr:false,
                mtr:false});
            circle.setCoords();
            selected_canvas.setActiveObject(circle);
            eventBus.dispatch('send-to-websocket-fabric',{type:'add',userPointer:circle,resize:true});
        }
        selected_canvas.renderAll();
    });
}
function drawRectangle(selected_canvas) {
    let rect, isDown, origX, origY;
    removeEvents(selected_canvas);
    selected_canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        rect = new fabric.Rect({
            left: origX,
            top: origY,
            originX: 'left',
            originY: 'top',
            width: pointer.x - origX,
            height: pointer.y - origY,
            angle: 0,
            fill: '',
            strokeWidth: selectedToolStroke,
            stroke: selectedToolColor,
            noScaleCache: false,
            strokeUniform: true,
            id:'rectangle'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
            userId: userId,
            customEditorId:custom_editor_id,
            shapeName:'rectangle',
            lastModifiedTime:new Date(),
            selectable:true,
            hasControls:true,
            borderColor:'#000',
            hasBorders:true,
            cornerStyle:'circle',
            cornerSize:10,
            cornerColor:'#6B7587',
            padding:0,
            LockRotation: true,
            transparentCorners:false,
        });
        selected_canvas.add(rect);
    });

    selected_canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        let pointer = selected_canvas.getPointer(o.e);
        if (origX > pointer.x) {
            rect.set({
                left: pointer.x
            });
        }
        if (origY > pointer.y) {
            rect.set({
                top: pointer.y
            });
        }
        rect.set({
            width: Math.abs(origX - pointer.x)
        });
        rect.set({
            height: Math.abs(origY - pointer.y)
        });
        selected_canvas.renderAll();
    });

    selected_canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;
        rect.setCoords();
        if(rect.width === 0 && rect.height === 0){
            selected_canvas.remove(rect);
        }else{
            selected_canvas.setActiveObject(rect);
            eventBus.dispatch('send-to-websocket-fabric',{type:'add',userPointer:rect,resize:true});
        }
        selected_canvas.renderAll();
    });
}
export function createCopyOfFreeDraw(selected_canvas, oldPath,shapeName){
    // if (fabric.util.getKlass(oldPath.type).async) {
    oldPath.clone(function (clone) {
        clone.set({
            id:shapeName+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
            userId: userId,
            customEditorId:custom_editor_id,
            shapeName:shapeName,
            lastModifiedTime:new Date(),
            selectable:true,
            hasControls:true,
            borderColor:'#000',
            hasBorders:true,
            cornerStyle:'circle',
            cornerSize:10,
            cornerColor:'#6B7587',
            padding:0,
            LockRotation: true,
            transparentCorners:false,
        });
        if(shapeName === 'fabric brush'){
            clone.set({
                fill: selectedToolColor,
            })
        }
        selected_canvas.remove(oldPath);
        setTimeout(()=>{
            selected_canvas.add(clone);
            selected_canvas.setActiveObject(clone);
            selected_canvas.renderAll();
            const canvasIndex = selected_canvas?.lowerCanvasEl?.getAttribute('data-index');
            const captureId = selected_canvas?.lowerCanvasEl?.getAttribute('data-capture-id');
            eventBus.dispatch('send-to-websocket-fabric',{type:'add',userPointer:clone, fabricCanvas: selected_canvas,canvasIndex,captureId});
        },20);
    });
    //}
}
export function returnPathShapeName(path = ''){
    if(path)
        pathShapeName = path;
    return pathShapeName;
}
export function removeEvents(selected_canvas) {
    selected_canvas.selection = false;
    selected_canvas.off('mouse:down');
    selected_canvas.off('mouse:up');
    selected_canvas.off('mouse:move');
}