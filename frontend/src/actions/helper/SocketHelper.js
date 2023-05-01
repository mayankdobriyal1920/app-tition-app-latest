import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://121tuition.in/api-call-tutor';

export const socket = io(URL);