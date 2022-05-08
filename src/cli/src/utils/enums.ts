export {};

export enum SocketEvents {
    // no event is used as a notifier when an a type that relies on a socket event
    // inside this enum would have returned `false`
    NO_EVENT = "no-event",
    SEND_MESSAGE = "send-message",
    SET_USERNAME = "set-username",
    JOIN_ROOM = "join-room",
}
