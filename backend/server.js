import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import multer from 'multer';
import cors from 'cors';
import dotenv  from 'dotenv';
import commonRouter from "./routers/commonRouter.js";
import { PeerServer }  from 'peer';

dotenv.config();
const app = express();
const host = 'localhost'
const port = 4001;
const peerServerPort = 4002;
const server = http.createServer(app);
import fs from 'fs';
export let allChannelsInGroupCall = [];
export let membersInChannelWithDetails = {};
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
                    membersInChannelWithDetails[dataToSend.groupId] = [];
                    membersInChannelWithDetails[dataToSend.groupId].push(dataToSend.memberData);
                    currentUserIdInGroupCall[userID] = dataToSend.memberData.id;
                    break;
                case 'addNewMemberDataInGroup':
                    if(membersInChannelWithDetails[dataToSend.groupId] !== undefined && membersInChannelWithDetails[dataToSend.groupId].length) {

                        ///// USER ALREADY IN LIST /////
                        let found = false;
                        membersInChannelWithDetails[dataToSend.groupId]?.map((user)=>{
                            if(user.id === dataToSend.memberData){
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
                    if(membersInChannelWithDetails[dataToSend.groupId] != undefined){
                        let membersInCall =  membersInChannelWithDetails[dataToSend.groupId]?.members;
                        if(dataToSend?.users){
                            dataToSend?.users?.map((id)=>{
                                membersInCall?.map((user,key)=>{
                                    if(user.id == id){
                                        membersInCall[key].audio = dataToSend?.audio != 'MUTE' ? true : false;
                                    }
                                })
                            })
                        }
                        membersInChannelWithDetails[dataToSend.groupId].members = membersInCall;
                        dataToSend = {
                            clientId: dataToSend.clientId,
                            classGroupData: membersInChannelWithDetails[dataToSend.groupId],
                            data: {users:dataToSend?.users,audio:dataToSend?.audio},
                            groupId:dataToSend.groupId,
                            type: 'handleMuteUnmuteInCall'
                        }
                    }
                    break;
                case 'leaveCurrentRunningCall':
                    if(membersInChannelWithDetails[dataToSend.groupId] !== undefined && membersInChannelWithDetails[dataToSend.groupId].length){
                        let index = null;
                        let members = membersInChannelWithDetails[dataToSend.groupId];
                        members?.map((user,key)=>{
                            if(user?.id === dataToSend?.userId){
                                index = key;
                            }
                        })
                        if(index !== null)
                            members.splice(index,1);

                        if(currentUserIdInGroupCall[userID] !== undefined)
                            delete currentUserIdInGroupCall[userID];

                        if(members?.length > 1) {
                            membersInChannelWithDetails[dataToSend.groupId] = [...members];
                        }else{
                            if(allChannelsInGroupCall?.length && allChannelsInGroupCall.includes(dataToSend.groupId))
                                allChannelsInGroupCall.splice(allChannelsInGroupCall.indexOf(dataToSend.groupId),1);

                            if(membersInChannelWithDetails[dataToSend.groupId] !== undefined) {
                                // let aliasArray = ['$1', '$2', '$3', '$4', '$5', '$6','$7','$8','$9'];
                                // let columnArray = ['id', 'message_text', 'message_html', 'parent_id', 'group_id', 'created_by','type','message_snap','message_type'];
                                // const generateUniqueIdForBlock =()=> {
                                //     let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
                                //     let char = '',
                                //         genID = '';
                                //
                                //     while(genID.length < 5) {
                                //         char = str.charAt(Math.floor(Math.random() * str.length));
                                //         genID += char;
                                //     }
                                //     return genID;
                                // }
                                // let id = generateUniqueIdForBlock()+'-'+generateUniqueIdForBlock()+'-'+generateUniqueIdForBlock();
                                // let valuesArray = [id, '', '', '',dataToSend.groupId,dataToSend?.userId,'CALL','','call_ended'];
                                // let insertData = {
                                //     alias: aliasArray,
                                //     column: columnArray,
                                //     values: valuesArray,
                                //     tableName: 'chat_module_messages_data'
                                // }
                                // insertCommonApiCall(insertData);

                                if (membersInChannelWithDetails[dataToSend.groupId] !== undefined)
                                    delete membersInChannelWithDetails[dataToSend.groupId];
                            }


                            dataToSend = {
                                groupId:dataToSend.groupId,
                                type: 'endOfCurrentCallRemoveAllInstances'
                            }
                        }
                    }

                    break;
            }
            sendMessage(dataToSend);
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
const uploadPath = "/var/www/html/mrtutor/upload";
let chunks = [];
app.post('/api-call-tutor/recording-video-chuncks', (req, res) => {
    const dataBuffer = new Buffer(req.body.data, 'base64');
    let chunkBuff = Buffer.from(dataBuffer) // This code throwing Error
    chunks.push(chunkBuff);
    res.status(200).send({message:`success ${port}`});
});
app.post('/api-call-tutor/recording-video-finish', (req, res) => {
    console.log('Combinig the files',chunks.length);
    let buf = Buffer.concat(chunks);
    console.log(buf) //empty buff
    fs.writeFile(`${uploadPath}/RecordingVideo_${new Date().getTime()}.webm`, buf, (err) => {
        console.log('Ahh....', err)
    });
    res.json({save:true})
});
app.get('/api-call-tutor', (req, res) => {
    res.status(200).send({message:`Node Server is ready port ${port}`});
});

app.use((err, req, res) => {
    res.status(500).send({ message: err.message });
});

server.listen(port,host, function() {
    console.log('[ SOCKET SERVER CONNECTED TO PORT ]',port);
    PeerServer({ port: peerServerPort, path: '/peerApp' });
    console.log('[Peer Js server connected on port ]',peerServerPort);
})

