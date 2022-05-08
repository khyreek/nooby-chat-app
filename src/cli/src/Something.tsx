import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { PORT } from "./utils/constants";
import { castUsername, joinRoom, sendMessage } from "./utils/actions";
import { SocketEvents } from "./utils/enums";

const ws = new WebSocket("ws://localhost:" + PORT);

ws.onopen = () => {
    console.log("connected");
};

export default function Something(): JSX.Element {
    const [messages, setMessages] = useState<Array<string>>([]);
    const [message, setMessage] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [room, setRoom] = useState<string>("");
    
    const appendMessage = (message: string): void => {
        setMessages((messages) => [...messages, message]);
    };

    useEffect(() => {
        ws.addEventListener("open", () => {
            appendMessage("You connected");

            ws.addEventListener("message", (event) => {
                const data = event.data;

                appendMessage(data);
            });
        });
    }, []);

    function sendRequest(type: SocketEvents, payload: object): void {
        const message = JSON.stringify({ type, payload });
        ws.send(message);
    }

    return (
        <div>
            {/* <button
                onClick={() => {
                    ws.send("debugging");
                }}
            >
                debug
            </button> */}

            <TextField
                label="Send Message"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={() => {
                    if (!message) return;

                    ws.send(sendMessage(message));
                    appendMessage(`You: ${message}`);
                    setMessage("");
                }}
            >
                Send askljda
            </Button>

            <br />

            <TextField
                label="New Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={() => {
                    if (!username) return;

                    ws.send(castUsername(username));
                    setUsername("");
                    appendMessage(`You are now known as ${username}`);
                }}
            >
                set username
            </Button>

            <br />

            <TextField
                label="Join Room"
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={() => {
                    ws.send(joinRoom(room));
                    appendMessage(`You joined room: ${room}`);
                    setRoom("");
                }}
            >
                join de askld
            </Button>

            {messages.map((message) => (
                <div key={uuid()}>{message}</div>
            ))}
        </div>
    );
}
