import React from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";

const hello: string = "Hello world!";

const App = () => (
  <div>
    <h1>{hello}</h1>
  </div>
);

createRoot(document.querySelector("#root")).render(<App />);
