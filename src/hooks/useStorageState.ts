
import { throwIfDisallowedDynamic } from "next/dist/server/app-render/dynamic-rendering";
import React, { useEffect, useRef, useState } from "react";


export function useStorageState<T>(key: string, initialValue: T, throttleDelay = 300): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue

        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch (e) {
            console.warn("读取localStorage 服务", e)
            return initialValue;
        }
    });

    const isFirstRender = useRef(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            try {
                localStorage.setItem(key, JSON.stringify(state))
            } catch (e) {
                console.warn("保存到localStorage失败", e)
            }
        }, throttleDelay);


    }, [state, key, throttleDelay]);

    return [state, setState] as const;
}