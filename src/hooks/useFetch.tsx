import { useEffect, useState } from 'react';

type Quote = {
    _id: string;
    content: string;
    author: string;
    authorSlug: string;
    length: number;
    tags: string[];
};

export default function useFetch(api: string) {
    const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchApi() {
        setLoading(true);
        try {
            const res = await fetch(`${api}/random`);
            if (!res.ok) {
                throw new Error('Failed to fetch the quote');
            }
            const data: Quote = await res.json();
            setRandomQuote(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
            setLoading(false)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchApi()
    }, [])

    return {
        loading,
        error,
        randomQuote,
        fetchApi
    }
}