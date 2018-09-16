import request from "superagent";

const sonosUrl = '/api/sonos/';

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
