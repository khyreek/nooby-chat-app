import { SocketEvents } from "../../resources/utils/enums";
import { ServerRequests } from "../types";

export function getParsedJSONObject(stringified: string): ServerRequests {
    /**
     * Checks if the string is a valid JSON object. If it is, it will return the object.
     * Otherwise, it will return a falsy value.
     *
     * This function will return `false` for any valid json primitive.
     * EG, 'true' -> false
     *     '123' -> false
     *     'null' -> false
     *     '"I'm a string"' -> false
     */

    try {
        const parsed = JSON.parse(stringified);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:

        return (
            parsed &&
            typeof parsed === "object" &&
            !Array.isArray(parsed) &&
            // return the parsed object if all checks pass
            parsed
        );
    } catch (e) {}

    // returned outside catch block to make type checker happy
    return { type: SocketEvents.NO_EVENT };
}
