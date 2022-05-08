import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const ws = new WebSocket("ws://localhost:3001");
ws.onopen = () => {
    console.log("connected");

};

export default function AnotherThing(): JSX.Element {
    // test if can run function there to change here

    return (
        <div>
            <button onClick={() => ws.send("test")}>askldja</button>
            <div>asd</div>
        </div>
    );
}
