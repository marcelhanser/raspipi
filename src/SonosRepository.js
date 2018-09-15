import request from "superagent";

const sonosUrl = 'http://localhost:5005/';

export const playInRoom = (room) => {
    callAction(room, 'play');
};

export const pauseInRoom = (room) => {
    callAction(room, 'pause');
};

function callAction(room, action) {
    const url = `${sonosUrl}${room}/${action}`;
    request.get(url).end();
}
