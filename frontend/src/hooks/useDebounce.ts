import { useEffect, useState } from "react";

export function useDebounce(value:any, wait = 500) {
    const [deboncedValue, setDeboncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDeboncedValue(value);
        }, wait);
        return () => clearTimeout(timer);
    }, [value, wait]);
    return deboncedValue;
}