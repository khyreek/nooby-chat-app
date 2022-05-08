import WebSocket from "ws";
import { v4 as uuid } from "uuid";
import { getParsedJSONObject } from "./utils/helpers";
import { JSONClientRequest, RoomID, UserID, Username } from "./types";
import { SocketEvents } from "./utils/enums";
import { SocketRoom } from "./utils/classes";

export interface ClientSocket extends WebSocket.WebSocket {
    /**
     * @Extends the individual web sockets to include:
     *
     *  - unique id
     *
     * for each client socket.
     */

    id?: RoomID;
    room?: RoomID;
    to?(data: JSONClientRequest): void;
}

interface UWSServer extends WebSocket.Server<WebSocket.WebSocket> {
    /**
     * @Extends the main socket server to include:
     *
     *  - broadcast function (triggers the action to all users except the broadcaster)
     */

    /**
     * Sends a message to all clients except the sender
     * @param userId, the user's unique id is used to filter out which
     * client to not send the message to. This will be guaranteed to exist
     * as it's created on connection.
     */
    broadcast?: (userId: UserID, data: string) => void;
    rooms?: Record<RoomID, SocketRoom>;
}

const wss: UWSServer = new WebSocket.Server({ port: 3001 });
/**
 * It is crutial these custom methods are defined above the server's
 * initial connection listener's instantiation. Otherwise, the server
 * will not have access to the methods.
 */

wss["broadcast"] = (userId: UserID, data: JSONClientRequest) => {
    wss.clients.forEach((client: ClientSocket) => {
        if (client.readyState !== WebSocket.OPEN) return;
        if (client.id === userId) return;

        client.send(data);
    });
};

const usernames: Record<UserID, Username> = {};

// debugging
wss.on("connection", (ws: ClientSocket) => {
    ws.on("message", (data) => {
        if (!(data.toString() === "debugging")) return;

        ws.send(JSON.stringify(usernames));
    });
});

wss.on("connection", (ws: ClientSocket) => {
    /**
     * Create the variables & add to server at the same time.
     * Separate copies are made to make typechecker happy.
     */
    const userId = (ws.id = uuid());
    wss.rooms = {};

    ws.to = (data: JSONClientRequest) => {
        const room = wss.rooms![ws.room as RoomID];
        room?.participants.forEach((participant) => {
            if (participant.id === ws.id) return;
            if (participant.readyState !== WebSocket.OPEN) return;

            participant.send(
                `${usernames[participant.id as UserID] || "Guest"}: ${data}`
            );
        });
    };

    console.log("new client connected");

    ws.onmessage = (event) => {
        const rawData = event.data.toString();
        const parsed = getParsedJSONObject(event.data.toString());

        // handle the non-planned event cases
        if (parsed.type === SocketEvents.NO_EVENT)
            return console.log("Raw data: [" + rawData + "] invalid event");

        console.log("parsed: ", parsed);

        switch (parsed.type) {
            case SocketEvents.SET_USERNAME:
                const {
                    payload: { username },
                } = parsed;
                const oldUsername = usernames[userId];
                usernames[userId] = username;

                wss.broadcast!(
                    userId,
                    `${oldUsername} changed their name to: ${username}`
                );
                break;
            case SocketEvents.SEND_MESSAGE:
                const senderName = usernames[userId] || "Guest";

                if (ws.room) return ws.to!(parsed.payload.message);

                wss.broadcast!(
                    userId,
                    `${senderName}: ${parsed.payload.message}`
                );
                break;
            case SocketEvents.JOIN_ROOM:
                const {
                    payload: { roomId },
                } = parsed;

                // user was already in a room
                // remove user from previous room
                if (ws.room !== roomId && wss.rooms![ws.room as RoomID]) {
                    wss.rooms![ws.room as any].participants = wss.rooms![
                        ws.room as any
                    ].participants.filter(
                        (participant) => participant.id !== userId
                    );
                }

                const joiningRoom = wss.rooms![roomId];
                if (joiningRoom) {
                    joiningRoom.participants.push(ws);
                } else {
                    wss.rooms![roomId] = new SocketRoom(roomId);
                }

                ws.room = roomId;
                console.log(ws.room);

            default:
                console.log("Unknown message type");
        }
    };
});

console.log("Server is running");
