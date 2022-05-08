type ExclusiveUnion<T, U> = Record<
    Exclude<keyof (T & U), Extract<keyof T, keyof U>>,
    unknown
>;

type NoOverlappingKeys<T extends object, M extends object> = Extract<
    keyof T,
    keyof M
> extends never // empty extract returns never
    ? Record<keyof (T & M), unknown>
    : never;

// custom array methods
interface Array<T> {
    /**
     * Given a filter prompt, return a new array with the left side
     * being an array of the values of the filter, and the right side
     * being an array of the values that did not pass the filter
     */
    splitFilter: (
        callback: (val: unknown, i?: number, arr?: Array<unknown>) => boolean
    ) => [passed: Array<unknown>, failed: Array<unknown>];

    // testing
    bruh: () => void;
}

// meaning it can be converted to a number with + prefix operator
type UnariableString = string;
