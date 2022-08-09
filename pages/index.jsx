import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import Step from "../components/step";

export default function Home() {
  const [hooks, setHooks] = useState([]);
  const loadAndFetchImgUrl = () =>
    fetch("api/webhook")
      .then((res) => res.json())
      .then((res) => setHooks(res.data));
  useEffect(loadAndFetchImgUrl, []);
  useInterval(loadAndFetchImgUrl, 5000);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Webhook Debug</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center pt-10">
        <code>
          example: curl -H 'content-type: application/json' "{location.protocol}
          //{location.hostname}:{location.port}/api/webhook?apiKey=qweqweq" -d{" "}
          {'\'{ "key": "value" }\''}
        </code>
        <h1 className="text-4xl font-bold">
          Webhook stream will go to here 👇{" "}
        </h1>
      </main>

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-56 mx-auto flex flex-wrap">
          {hooks
            .map((hook, idx) => (
              <Step
                idx={idx + 1}
                timestamp={new Date(hook.timestamp)}
                headers={hook.headers}
                path={hook.path}
                body={hook.body}
              />
            ))
            .reverse()}
        </div>
      </section>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
