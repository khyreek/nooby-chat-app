import { JSONClientRequest } from "../types";
import { SocketEvents } from "./enums";

export const castUsername = (username: string): JSONClientRequest => {
    return JSON.stringify({
        type: SocketEvents.SET_USERNAME,
        payload: { username },
    });
};

export const sendMessage = (message: string): JSONClientRequest => {
    return JSON.stringify({
        type: SocketEvents.SEND_MESSAGE,
        payload: { message },
    });
};

export const joinRoom = (roomId: string): JSONClientRequest => {
    return JSON.stringify({
        type: SocketEvents.JOIN_ROOM,
        payload: { roomId },
    });
};
