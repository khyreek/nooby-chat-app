/**@General */
export function sameArrLen<T>(arrA: Array<T>, arrB: Array<T>): boolean {
    return arrA.length === arrB.length;
}

export function unionishArr<T>(arrA: Array<T>, arrB: Array<T>): boolean {
    /**
     * Check if the length of the arrays are the same and
     * if each element in the first array is in the second array.
     */

    return (
        sameArrLen(arrA, arrB) && arrA.every((item: T) => arrB.includes(item))
    );
}

export function sameishArr(
    arrA: Array<unknown>,
    arrB: Array<unknown>
): boolean {
    /**
     * Check if two arrays have the same values in the same order
     * with same amount of elements.
     */

    return (
        sameArrLen(arrA, arrB) &&
        arrA.every((val: unknown, i: number): boolean => arrB[i] === val)
    );
}

export function objUnion<T extends object, U extends object>(
    ob1: T,
    ob2: U
): T & U {
    return { ...ob1, ...ob2 };
}

export function getParsedJSONObject(stringified: string): object | false {
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
    return false;
}
