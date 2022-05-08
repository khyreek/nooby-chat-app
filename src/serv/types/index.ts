import { SocketEvents } from "../utils/enums";


export type JSONClientRequest = string;
export type Username = string;
export type UserID = string;
export type RoomID = string;

export type ServerRequests =
    | { type: SocketEvents.NO_EVENT }
    | {
          type: SocketEvents.SET_USERNAME;
          payload: { username: Username };
      }
    | { type: SocketEvents.SEND_MESSAGE; payload: { message: string } }
    | {
          type: SocketEvents.JOIN_ROOM;
          payload: { roomId: string; data: string };
      };
