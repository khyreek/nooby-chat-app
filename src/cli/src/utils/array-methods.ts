export {};

/**
 * @Custom array methods
 *
 * To use,
 * Import this file and then use the methods as you would normally.
 * The import should just be empty brackets,
 * import {} from "[path]/array-methods";
 *
 * [array].[method](...)
 *
 */

// testing
Array.prototype.bruh = function () {
    console.log("asd");
};

Array.prototype.splitFilter = function (
    callback: (val: unknown, i?: number, arr?: Array<unknown>) => boolean
): [passed: Array<unknown>, failed: Array<unknown>] {
    // see global.d.ts for the definition of this function

    return this.reduce(
        (
            acc: [Array<unknown>, Array<unknown>],
            val: unknown,
            i: number,
            arr: Array<unknown>
        ) => {
            const result = callback(val, i, arr);
            const oldP = acc[0];
            const oldNP = acc[1];

            return result ? [[...oldP, val], oldNP] : [oldP, [...oldNP, val]];
        },
        [[] as Array<unknown>, [] as Array<unknown>]
    );
};
