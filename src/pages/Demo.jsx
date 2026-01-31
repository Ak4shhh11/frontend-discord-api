import { useState } from "react";
import axios from "axios";

export default function Demo() {
  const [quote, setQuote] = useState(null);

  const getQuote = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/external/quote",
      {
        headers: {
          "x-api-key": "daffapr123",
        },
      }
    );
    setQuote(res.data);
  };

  return (
    <div className="p-10">
      <button
        onClick={getQuote}
        className="bg-green-500 px-4 py-2 rounded"
      >
        Get Public Quote
      </button>

      {quote && (
        <div className="mt-4 bg-gray-800 p-4 rounded">
          <p>{quote.content}</p>
          <p className="text-sm text-gray-400">- {quote.author}</p>
        </div>
      )}
    </div>
  );
}
