import { RoomID } from "../types";

import { ClientSocket } from "../server";

abstract class Room<Participant> {
    public participants: Participant[];
    constructor(public roomId: RoomID) {
        this.roomId = roomId;
        this.participants = [];
    }

    abstract getMembers(): this["participants"];
}

export class SocketRoom extends Room<ClientSocket> {
    getMembers(): this["participants"] {
        return this.participants;
    }
}
