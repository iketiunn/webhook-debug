import { useEffect, useState } from "react";

export default function Step({ idx, timestamp, headers, path, body }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    fetch("https://random.dog/woof?include=jpg")
      .then((res) => res.text())
      .then((text) => setSrc(text));
  }, []);

  return (
    <div class="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
      <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
        {idx}
      </div>
      <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div class="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
          <img
            class="rounded-full w-24 h-24"
            src={`https://random.dog/${src}`}
            alt="doge"
          />
        </div>
        <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
            {timestamp.toLocaleString()}
          </h2>
          <h3 class="font-medium title-font text-gray-900 mb-1 text-base">
            path: {path}
          </h3>
          {/* <h3 class="font-medium title-font text-gray-900 mb-1 text-base">
            headers: {JSON.stringify(headers, null, 2)}
          </h3> */}
          <p class="leading-relaxed">{JSON.stringify(body, null, 2)}</p>
        </div>
      </div>
    </div>
  );
}
