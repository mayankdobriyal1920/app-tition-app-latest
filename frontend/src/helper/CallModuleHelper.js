import $ from 'jquery';

export let peers = {};
export let myPeer = null;
export let myStream = null;
export let myShareScreenStream = null;
export let myPeerConnectionId = null;
export let myMediaRecorder = null;

export const setMyPeer=(peer)=> {
    myPeer = peer;
}
export const setMyStream=(stream)=> {
    myStream = stream;
}
export const setMyMediaRecorder=(recorder)=> {
    myMediaRecorder = recorder;
}
export const setMyShareScreenStream=(stream)=> {
    myShareScreenStream = stream;
}
export const setMyPeerConnectionId=(id)=> {
    myPeerConnectionId = id;
}
export const removeClosePeerConnection=(id)=> {
    console.log('[ REMOVE PEER JS CONNECTION ]',id);

    if(peers[id])
        peers[id].close();
}
export const addVideoStream=(id,stream,isMe)=> {

    console.log('[ USER STREAM ]',stream);
    const videoTracks = stream?.getVideoTracks();
    console.log('[ VIDEO TRACKS ]',videoTracks);


    if(videoTracks && videoTracks?.length){
        if(id?.indexOf('teacher') >= 0) {
            let teacher_class_assign_id = id?.split("_")[2];
            let teacherVideo = document.getElementById(teacher_class_assign_id);
            teacherVideo.srcObject = stream;
            teacherVideo.setAttribute('autoPlay','true');
            teacherVideo.setAttribute('playsInline','true');
            if(isMe)
                teacherVideo.muted = true;
        }else{
            let student_profile_id = id?.split("_")[2];
            let studentVideo = document.getElementById(student_profile_id);
            studentVideo.srcObject = stream;
            studentVideo.setAttribute('autoPlay','true');
            studentVideo.setAttribute('playsInline','true');
            studentVideo.muted = true;
        }
    }
}
export const addCallSubscriptionEvents = (call) => {
    call?.on('stream', userStream => {
        addVideoStream(call.peer, userStream,false)
    })
    call?.on('close', () => {
        console.log('Close');
    })
    call?.on('track', stream => {
        console.log('[PEER JS INCOMING CALL TRACK]', stream);
    })
    if(!peers[call?.peer])
        peers[call?.peer] = call;
}
export const connectToNewUser=(user,stream,myPeer)=> {
    console.log('[ NEW USER CONNECTED TO CALL]',user.peer_connection_id);
    const call = myPeer.call(user.peer_connection_id,stream);
    console.log('[ CALL USER ]',myPeer,user,call);
    addCallSubscriptionEvents(call);
}
