import { useState, useEffect } from "react";

export const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setError(false);
            const res = await fetch(url, options);
            if (res.ok) {
                const json = await res.json();
                setResponse(json);
            } else {
                setError({ status: res.status, text: res.statusText });
            }
            setIsLoading(false);
        })();
    }, [url]);
    return { response, error, isLoading };
}