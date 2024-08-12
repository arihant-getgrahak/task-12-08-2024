import { useEffect, useState } from 'react';
import sandClock from "./assets/sand-clock.png"
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

  useEffect(() => {
    const alertMessage = "Welcome to Website" + "\n" + "Made by Arihant Jain"
    alert(alertMessage)
  }, [])

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
      {loading && (
        <img src={sandClock} alt="loading-icon" className='animate-spin w-10 h-10' />
      )}
      {error && <p>Error: {error}</p>}
      {randomQuote && (
        <div className="quote w-9/12 lg:w-[30%] p-5">
          <p className='text-center text-lg'>{randomQuote.content}</p>
          <p className='text-center mt-2 text-base'>- {randomQuote.author}</p>
        </div>
      )}
      <button className="border-2 p-2 border-red-500" onClick={func}>Get Random Quote</button>
    </div>
  )
}

export default App;
