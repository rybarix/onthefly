# onthefly will compile & cache ts script without build step

Inspired by esm.sh/run, compile any ts/tsx script directly in browser.

## Usage

```html
<script type="module" src="./onthefly.mjs" type="text/javascript"></script>
<script main="./hello-react.tsx"></script>
<!--           ^^^^^^^^^^^^^^^^ will get transpiled and replaced by just javascript -->
```

```tsx
import React from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";

const hello: string = "Hello world!";

const App = () => (
  <div>
    <h1>{hello}</h1>
  </div>
);

createRoot(document.querySelector("#root")).render(<App />);
```

## Limitations

- You can't import ts/tsx files from "main" script.

> [!NOTE]
> This is a research project to improve [snaptail](https://github.com/rybarix/snaptail)
