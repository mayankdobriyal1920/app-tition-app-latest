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

    if($(`#VIDEO-${id}`).length) {
        $(`#VIDEO-${id}`).remove();
    }
}
export const addVideoStream=(video,stream)=> {

    console.log('[ USER STREAM ]',stream);
    const videoTracks = stream?.getVideoTracks();
    console.log('[ VIDEO TRACKS ]',videoTracks);


    if(videoTracks && videoTracks?.length){
        video.srcObject = stream;
        video.setAttribute('autoPlay',true);
        video.setAttribute('playsInline',true);
        video.play();
        if($(`#${video.id}`).length){
            $(`#${video.id}`).remove();
        }
        if(video?.id?.indexOf('teacher') >= 0) {
            document.getElementById('main_user_video_call_video_section').append(video);
            video.classList = 'my_video_peer_connection';
        }else{
            video.classList = 'other_video_peer_connection';
            document.getElementById('student_all_class_group_data_videos_section').append(video);
        }
    }
}
export const addCallSubscriptionEvents = (call,video) => {
    call.on('stream', userStream => {
        video.id = `VIDEO-${call.peer}`;
        addVideoStream(video, userStream)
    })
    call.on('close', () => {
        video.remove();
    })
    call.on('track', stream => {
        console.log('[PEER JS INCOMING CALL TRACK]', stream);
    })
    if(!peers[call.peer])
        peers[call.peer] = call;
}
export const connectToNewUser=(user,stream,myPeer)=> {
    console.log('[ NEW USER CONNECTED TO CALL]',user.peer_connection_id);
    const call = myPeer.call(user.peer_connection_id,stream);
    console.log('[ CALL USER ]',myPeer,user,call);
    const video = document.createElement('video');
    addCallSubscriptionEvents(call,video);
}
