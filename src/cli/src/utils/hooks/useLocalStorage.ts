import { useEffect, useState } from "react";

type DefaultState = unknown;

export default function useLocalStorage(
    key: string,
    complement: DefaultState
): {
    value: unknown;
    setValue: React.Dispatch<unknown>;
} {
    const [value, setValue] = useState(() => {
        const jsonVal = localStorage.getItem(key);
        if (jsonVal) return JSON.parse(jsonVal);

        if (complement instanceof Function) return complement();

        return complement;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(complement));
    }, [key, value]);

    return { value, setValue };
}
