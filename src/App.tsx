import { useEffect } from 'react';
import sandClock from "./assets/sand-clock.png"
import useFetch from "./hooks/useFetch"
import { Helmet } from "react-helmet";



interface Quote {
  quote: string
  author: string
  category: string
};

function App() {
  const api: string = "https://api.api-ninjas.com/v1/quotes?category=";

  const [loading, error, randomQuote, fetchApi] = useFetch(api)

  console.log(randomQuote)


  useEffect(() => {
    const alertMessage = "Welcome to my Website" + "\n" + "Made by Arihant Jain"
    alert(alertMessage)
  }, [])


  return (
    <>
     <Helmet>
        <title>Random Quote Generator</title>
        <meta
          name="description"
          content="Get Random Quote on every click"
        />
        <meta
          name="keywords"
          content="Quote Random Motivation Energy"
        />
      </Helmet>
    <GetRandomQuote loading={loading} error={error} randomQuote={randomQuote} func={fetchApi} />
    </>
  );
}

function GetRandomQuote(props: {
  loading: boolean | null, error: string | null, randomQuote: Quote[] | null, func: () => void
}) {
  const { loading, error, randomQuote, func } = props
  return (
    <div className="App flex justify-center items-center flex-col h-screen gap-3">
      {loading && (
        <img src={sandClock} alt="loading-icon" className='animate-spin w-10 h-10' />
      )}
      {error && <p>Error: {error}</p>}
      {randomQuote && (
        randomQuote.map((quote) => (
          <div className="quote w-9/12 lg:w-[30%] p-5">
            <p className='text-center text-lg'>{quote.quote}</p>
            <p className='text-center mt-2 text-base'>- {quote.author}</p>
          </div>
        ))
      )}
      <button className="border-2 p-2 border-red-500" onClick={func}>Get Random Quote</button>
    </div>
  )
}

export default App;
