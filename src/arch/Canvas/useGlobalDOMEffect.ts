import { useEffect } from "react";
import {boolean} from "zod";

type EventListenerWithType<T extends keyof WindowEventMap> = (
    event: WindowEventMap[T]
) => void;

type Props = {
    [key in keyof WindowEventMap]?: EventListenerWithType<key>;
};

export default function useGlobalDOMEvents(props: Props, options: ({once: boolean} | false) = false) {
    useEffect(() => {
        for (let [key, func] of Object.entries(props)) {
            window.addEventListener(key, func as EventListener, options);
        }
        return () => {
            for (let [key, func] of Object.entries(props)) {
                window.removeEventListener(key, func as EventListener, false);
            }
        };
    }, []);
}