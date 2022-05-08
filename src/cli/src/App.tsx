import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import Something from "./Something";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";
import AnotherThing from "./AnotherThing";
import "./App.css";

export default function App(): JSX.Element {
    
    return (
        <div className="main">
            <h1>uhhhhhhhhhhh</h1>
            <hr />

            {/* <Testing /> */}
            <Something />
            {/* <AnotherThing /> */}
        </div>
    );
}

function Testing(): JSX.Element {
    const [test, setTest] = useState(0);

    return (
        <div>
            <button onClick={() => setTest((t) => t + 1)}>askldja</button>
        </div>
    );
}

function testred(state: any, { type, payload }: any): any {
    switch (type) {
        case "a":
            return { ...state, some: payload.updated };
        default:
            return state;
    }
}
