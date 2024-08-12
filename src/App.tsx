import { useState } from 'react';

type Quote = {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
};

function App() {
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const api: string = "https://api.quotable.io";

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

  return (
    <GetRandomQuote loading={loading} error={error} randomQuote={randomQuote} func={fetchApi} />
  );
}

function GetRandomQuote(props: {
  loading: boolean, error: string | null, randomQuote: Quote | null, func: () => void
}) {
  const { loading, error, randomQuote, func } = props
  return (
    <div className="App flex justify-center items-center flex-col h-screen gap-3">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {randomQuote && (
        <div className="quote w-3/6">
          <p>{randomQuote.content}</p>
          <p className='text-center mt-2'>- {randomQuote.author}</p>
        </div>
      )}
      <button className="border-2 p-2 border-red-500" onClick={func}>Get Random Quote</button>
    </div>
  )
}

export default App;
