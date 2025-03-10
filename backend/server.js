import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import dotenv  from 'dotenv';
import path  from 'path';
import commonRouter from "./routers/commonRouter.js";
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import upload from "./models/upload.js";
import {updateCommonApiCall} from "./models/commonModel.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import pool from "./models/connection.js";

dotenv.config();
const app = express();
const host = 'localhost'
//const port = 4001;
const port = 4001;
const server = http.createServer(app);
export let allChannelsInGroupCall = [];
export let allChannelsInGroupCallData = {};
export let allChanelWhiteBoardEditingData = {};
export let membersInChannelWithDetails = {};
export let canvasReservedJsonActiveIndex = {};
let currentUserIdInGroupCall = {};
//let alias = 'api-call-tutor';
let alias = 'api-call-tutor';

const clients = {};

setupWebSocket();
function setupWebSocket() {
    const getUniqueID = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4();
    };
    const wsServer = new WebSocket.Server({server});

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
                                let whereCondition = `id = ?`;
                                let updateData = {
                                    column: setData,
                                    value: [dataToSend?.classEndTime,dataToSend.groupId],
                                    whereCondition: whereCondition,
                                    tableName: 'class_assigned_teacher_batch'
                                };
                                updateCommonApiCall(updateData);
                            }else{
                                let setData = `class_end_date_time = ?`;
                                let whereCondition = `id = ?`;
                                let updateData = {column: setData, value: [dataToSend?.classEndTime,dataToSend.classId], whereCondition: whereCondition, tableName: 'class_timetable_with_class_batch_assigned'};
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

// Define allowed origins from environment variables or default to localhost
const allowedOrigins = [
    'http://localhost:3000', // Allow your frontend origin
    'https://121tuition.in', // Allow your production frontend origin
];

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true, limit: '250mb' }));
app.use(express.json({ limit: '250mb' }));
app.use(cookieParser());

// MySQL Session Store Configuration
const MySQLSessionStore = MySQLStore(session);
const sessionStore = new MySQLSessionStore(
    {
        clearExpired: true,
        checkExpirationInterval: 900000, // Clear expired sessions every 15 mins
        expiration: 86400000, // Sessions expire after 1 day (24 hours)
    },
    pool
);

// Trust proxy for secure cookies
app.set('trust proxy', 1);

// Session Middleware
app.use(
    session({
        store: sessionStore,
        secret: '121-tuition-session-store', // Use environment variable for secret
        resave: false,
        saveUninitialized: false,
        name: '121-tuition-app-session', // Use dynamic session name
        cookie: {
            expires: new Date(Date.now() + 31536000000), // 1 year expiration
            httpOnly: true,  // Prevents client-side access (security best practice)
            secure: true, // Set to `true` only for HTTPS
            sameSite: 'None', // `None` required for cross-origin
            maxAge: 31536000000, // 1 year in milliseconds
        }
    })
);


// CORS Middleware
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            // Check if the origin is in the allowedOrigins array
            if (allowedOrigins.includes(origin)) {
                return callback(null, origin); // Explicitly allow the origin
            } else {
                return callback(new Error('Not allowed by CORS')); // Block other origins
            }
        },
        credentials: true, // Allow cookies to be sent for allowed origins only
        methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE', // Allowed methods
        allowedHeaders: 'X-Requested-With, content-type, Accept', // Allowed headers
    })
);

///////// USER API GET ////////////////
app.use(`/${alias}/common`, commonRouter);
///////// USER API GET ////////////////

const uploadPath = "/var/www/html/tuition/recording-upload-data";

// Handle video chunks
app.post(`/${alias}/recording-video-chuncks`, (req, res) => {
    try {
        const { groupId, data } = req.body;

        if (!groupId || !data) {
            return res.status(400).json({ message: "Invalid request. Missing groupId or data." });
        }

        // Convert base64 to buffer
        const chunkBuffer = Buffer.from(data, "base64");

        const tempFilePath = path.join(uploadPath, `TempRecording_${groupId}.webm.part`);
        fs.appendFileSync(tempFilePath, chunkBuffer);

        res.status(200).json({ message: `Chunk received for group ${groupId}` });
    } catch (error) {
        console.error("Error processing chunk:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Merge and save video file
app.post(`/${alias}/recording-video-finish`, async (req, res) => {
    try {
        const { groupId, duration } = req.body;

        const tempFilePath = path.join(uploadPath, `TempRecording_${groupId}.webm.part`);
        const originalFilePath = path.join(uploadPath, `RecordingVideo_${groupId}.webm`);

        if (!groupId || !duration || !fs.existsSync(tempFilePath)) {
            return res.status(400).json({ message: "No recorded chunks found or invalid request." });
        }

        // Fix WebM duration using FFmpeg
        ffmpeg(tempFilePath)
            .outputOptions([
                "-c:v copy",        // Copy video codec (no re-encoding)
                "-c:a copy",        // Copy audio codec
                `-t ${duration}`,   // Set correct duration
                "-movflags +faststart" // Optimize for streaming
            ])
            .output(originalFilePath)
            .on("end", async () => {
                console.log(`✅ Fixed video saved: ${originalFilePath}`);

                // Delete temp file to save space
                try {
                    await fs.promises.unlink(tempFilePath);
                    console.log(`🗑️ Deleted temp video: ${tempFilePath}`);
                } catch (unlinkError) {
                    console.error("❌ Error deleting temp video:", unlinkError);
                }

                res.json({ save: true, name: `RecordingVideo_${groupId}.webm` });
            })
            .on("error", (err) => {
                console.error("❌ FFmpeg processing error:", err);
                res.status(500).json({ message: "FFmpeg processing failed" });
            })
            .run(); // Execute FFmpeg

    } catch (error) {
        console.error("❌ Error processing video:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get(`/${alias}/getFineByName`, function(req, res){
    const file = `${uploadPath}/${req.query.name}`;
    res.download(file); // Set disposition and send it.
});
app.post(`/${alias}/uploadAssignmentApiCall`, upload.single("file"), function (req, res) {
    if (!req.file) {
        //If the file is not uploaded, then throw custom error with message: FILE_MISSING
        throw Error("FILE_MISSING")
    } else {
        //If the file is uploaded, then send a success response.
        res.send({ status: "success" })
    }
})
app.get(`/${alias}`, (req, res) => {
    res?.status(200).send({message:`Node Server is ready port ${port}`});
});

server.listen(port,host, function() {
    console.log('[ SOCKET SERVER CONNECTED TO PORT ]',port);
})

