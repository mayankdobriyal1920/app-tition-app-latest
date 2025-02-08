import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "d8ecbd2042a741849c0836e8b68566bd";
const token = null;

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks(
    {encoderConfig: "high_quality_stereo"},
    {encoderConfig: {width: 640, height: { ideal: 480, min: 400, max: 500 }, frameRate: 15, bitrateMin: 600, bitrateMax: 1000},
});