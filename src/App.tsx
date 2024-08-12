import { useEffect } from 'react';
import sandClock from "./assets/sand-clock.png"
import useFetch from "./hooks/useFetch"


type Quote = {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
};

function App() {
  const api: string = "https://api.quotable.io";

  const { loading, error, randomQuote, fetchApi } = useFetch(api)


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
