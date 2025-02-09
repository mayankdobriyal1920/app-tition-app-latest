import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import dotenv  from 'dotenv';
import commonRouter from "./routers/commonRouter.js";
import { PeerServer }  from 'peer';
import {fixWebmDuration} from "fix-webm-duration";

dotenv.config();
const app = express();
const host = 'localhost'
const port = 4001;
const peerServerPort = 4002;
const server = http.createServer(app);
import fs from 'fs';
import upload from "./models/upload.js";
import {updateCommonApiCall} from "./models/commonModel.js";
export let allChannelsInGroupCall = [];
export let allChannelsInGroupCallData = {};
export let allChanelWhiteBoardEditingData = {};
export let membersInChannelWithDetails = {};
export let canvasReservedJsonActiveIndex = {};
let currentUserIdInGroupCall = {};

const clients = {};

setupWebSocket();
function setupWebSocket() {
    const getUniqueID = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4();
    };
    const wsServer = new WebSocket.Server({server});
    const sendMessage = (jsonData,connection) => {
        // We are sending the current data to all connected clients
        Object.keys(clients).map((client) => {
            if(clients[client] !== connection){
                clients[client].send(JSON.stringify(jsonData));
            }
        });
    }

    wsServer.on('connection', function(connection) {
        const userID = getUniqueID();
        clients[userID] = connection;
        connection.on('message', function(message) {
            let dataToSend = JSON.parse(message);
            switch (dataToSend.type){
                case 'startNewCallInGroupChannel':
                    allChannelsInGroupCall.push(dataToSend.groupId);
                    allChannelsInGroupCallData[dataToSend.groupId] = dataToSend.classGroupData;
                    membersInChannelWithDetails[dataToSend.groupId] = dataToSend?.members;

                    if(canvasReservedJsonActiveIndex[dataToSend.groupId] === undefined)
                        canvasReservedJsonActiveIndex[dataToSend.groupId] = 0;

                    if(allChanelWhiteBoardEditingData[dataToSend.groupId] === undefined)
                        allChanelWhiteBoardEditingData[dataToSend.groupId] = {};

                    membersInChannelWithDetails[dataToSend.groupId] = dataToSend?.members;
                    currentUserIdInGroupCall[userID] = dataToSend.memberData.id;
                    break;
                case 'annotatorImageJson':
                    let canvasIndex = canvasReservedJsonActiveIndex[dataToSend.groupId];
                    let objectKey = `canvas-${canvasIndex}`
                    if(!allChanelWhiteBoardEditingData[dataToSend.groupId]){
                        allChanelWhiteBoardEditingData[dataToSend.groupId] = {};
                        allChanelWhiteBoardEditingData[dataToSend.groupId][objectKey] = [dataToSend];
                    }else{
                        if(!allChanelWhiteBoardEditingData[dataToSend.groupId][objectKey]) {
                            allChanelWhiteBoardEditingData[dataToSend.groupId][objectKey] = [dataToSend];
                        } else{
                            allChanelWhiteBoardEditingData[dataToSend.groupId][objectKey].push(dataToSend);
                        }
                    }
                    break;
                case 'addNewMemberDataInGroup':
                    if(membersInChannelWithDetails[dataToSend.groupId] !== undefined && membersInChannelWithDetails[dataToSend.groupId].length) {
                        ///// USER ALREADY IN LIST /////
                        let found = false;
                        membersInChannelWithDetails[dataToSend.groupId]?.map((user)=>{
                            if(user.id === dataToSend.memberData.id){
                                found = true;
                            }
                        })
                        ///// USER ALREADY IN LIST /////
                        if(!found)
                            membersInChannelWithDetails[dataToSend.groupId].push(dataToSend.memberData);

                        currentUserIdInGroupCall[userID] = dataToSend.memberData.id;

                        dataToSend = {
                            clientId: dataToSend.clientId,
                            groupId:dataToSend.groupId,
                            memberData:dataToSend.memberData,
                            groupMembersInCurrentCall: membersInChannelWithDetails[dataToSend.groupId],
                            type: 'addNewMemberDataInGroup'
                        }
                    }
                    break;
                case 'handleMuteUnmuteInCall':
                    if(membersInChannelWithDetails[dataToSend.groupId] !== undefined){
                        membersInChannelWithDetails[dataToSend.groupId] = dataToSend?.users;
                        dataToSend = {
                            clientId: dataToSend.clientId,
                            userId:dataToSend?.userId,
                            groupId:dataToSend.groupId,
                            type: 'handleMuteUnmuteInCall'
                        }
                    }
                    break;
                case 'actionToChangeActiveIndexEditorJson':
                    canvasReservedJsonActiveIndex[dataToSend.groupId] = dataToSend.newIndex;
                    let newIndexObjectKey = `canvas-${dataToSend.newIndex}`
                    if(!allChanelWhiteBoardEditingData[dataToSend.groupId]){
                        allChanelWhiteBoardEditingData[dataToSend.groupId] = {};
                        allChanelWhiteBoardEditingData[dataToSend.groupId][newIndexObjectKey] = [];
                    }else{
                        if(!allChanelWhiteBoardEditingData[dataToSend.groupId][newIndexObjectKey]) {
                            allChanelWhiteBoardEditingData[dataToSend.groupId][newIndexObjectKey] = [];
                        }
                    }
                    break;
                case 'actionToEndCurrentCurrentCall':
                    if(membersInChannelWithDetails[dataToSend.groupId] !== undefined && membersInChannelWithDetails[dataToSend.groupId].length){
                        if(currentUserIdInGroupCall[userID] !== undefined)
                            delete currentUserIdInGroupCall[userID];
                        if(allChannelsInGroupCall?.length && allChannelsInGroupCall.includes(dataToSend.groupId))
                            allChannelsInGroupCall.splice(allChannelsInGroupCall.indexOf(dataToSend.groupId),1);

                        if(membersInChannelWithDetails[dataToSend.groupId] !== undefined) {
                            delete membersInChannelWithDetails[dataToSend.groupId];

                            if (allChannelsInGroupCallData[dataToSend.groupId] !== undefined)
                                delete allChannelsInGroupCallData[dataToSend.groupId];

                            if (allChanelWhiteBoardEditingData[dataToSend.groupId] !== undefined)
                                delete allChanelWhiteBoardEditingData[dataToSend.groupId];

                            if (canvasReservedJsonActiveIndex[dataToSend.groupId] !== undefined)
                                delete canvasReservedJsonActiveIndex[dataToSend.groupId];

                            if(!dataToSend.classId) {
                                let setData = `class_end_time = ?`;
                                let whereCondition = `id = '${dataToSend.groupId}'`;
                                let updateData = {
                                    column: setData,
                                    value: [dataToSend?.classEndTime],
                                    whereCondition: whereCondition,
                                    tableName: 'class_assigned_teacher_batch'
                                };
                                updateCommonApiCall(updateData);
                            }else{
                                let setData = `class_end_date_time = ?`;
                                let whereCondition = `class_assigned_teacher_batch_id = '${dataToSend.groupId}' AND DATE(start_from_date_time) = '${dataToSend?.startDate}'`;
                                let updateData = {column: setData, value: [dataToSend?.classEndTime], whereCondition: whereCondition, tableName: 'class_timetable_with_class_batch_assigned'};
                                updateCommonApiCall(updateData);
                            }
                        }
                    }
                    break;
            }
            wsServer.clients.forEach((client)=>{
                if(client !== connection){
                    client.send(JSON.stringify(dataToSend));
                }
            })
        })
    })
}



app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.urlencoded({ extended: true,limit: '250mb' }));

app.use(express.json({limit: '250mb'}));

///////// USER API GET ////////////////
app.use('/api-call-tutor/common', commonRouter);
///////// USER API GET ////////////////
const uploadPath = "/var/www/vhosts/121tuition.in/httpdocs/tuition/recording-upload-data";
let chunks = [];
// Handle video chunks
app.post('/api-call-tutor/recording-video-chuncks', (req, res) => {
    try {
        const { groupId } = req.body;

        if (!req.body.data) {
            return res.status(400).send({ message: "No video data received" });
        }

        // Convert base64 to buffer
        const chunkBuffer = Buffer.from(req.body.data, 'base64');

        // Store chunk in memory
        if (!chunks[groupId]) {
            chunks[groupId] = [];
        }
        chunks[groupId].push(chunkBuffer);

        res.status(200).send({ message: `Chunk received for group ${groupId}` });
    } catch (error) {
        console.error("Error processing chunk:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Merge and save the video file
app.post('/api-call-tutor/recording-video-finish', async (req, res) => {
    try {
        const { groupId, duration } = req.body;

        if (!chunks[groupId] || chunks[groupId].length === 0) {
            return res.status(400).send({ message: "No recorded chunks found" });
        }

        // Merge all chunks into a single buffer
        const videoBuffer = Buffer.concat(chunks[groupId]);

        // Fix WebM duration
        const finalBlob = await fixWebmDuration(videoBuffer, duration);

        // Convert Blob to Buffer
        const arrayBuffer = await finalBlob.arrayBuffer(); // Convert Blob to ArrayBuffer
        const finalBuffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer

        // Generate file name
        const fileName = `RecordingVideo_${groupId}_${Date.now()}.webm`;
        const filePath = `${uploadPath}/${fileName}`;

        // Save file
        fs.writeFileSync(filePath, finalBuffer);

        // Clear chunks from memory
        delete chunks[groupId];

        console.log(`Video saved successfully: ${filePath}`);
        res.send({ save: true, name: fileName });
    } catch (error) {
        console.error("Error saving video:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});
app.get('/api-call-tutor/getFineByName', function(req, res){
    const file = `${uploadPath}/${req.query.name}`;
    res.download(file); // Set disposition and send it.
});
app.post("/api-call-tutor/uploadAssignmentApiCall", upload.single("file"), function (req, res) {
    if (!req.file) {
        //If the file is not uploaded, then throw custom error with message: FILE_MISSING
        throw Error("FILE_MISSING")
    } else {
        //If the file is uploaded, then send a success response.
        res.send({ status: "success" })
    }
})
app.get('/api-call-tutor', (req, res) => {
    res?.status(200).send({message:`Node Server is ready port ${port}`});
});

server.listen(port,host, function() {
    console.log('[ SOCKET SERVER CONNECTED TO PORT ]',port);
    PeerServer({ port: peerServerPort, path: '/peerApp' });
    console.log('[Peer Js server connected on port ]',peerServerPort);
})

