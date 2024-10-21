// Heavily inspired by esm.sh/run
// to be compatible with esm.sh/run format
// <script type="module" src="https://esm.sh/run" main="./main.tsx"></script>

const importSwc = async () => {
  const { default: initSwc, transformSync } = await import(
    "https://esm.sh/@swc/wasm-web"
  );
  await initSwc();
  const options = {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
      },
      target: "es5",
      loose: true,
      minify: {
        compress: false,
        mangle: false,
      },
    },
    module: {
      type: "es6",
    },
    minify: true,
    isModule: true,
  };
  /** @param {string} code */
  const transpile = (code) => transformSync(code, options);
  return { transpile };
};

/** @param {string} code */
// const transpile = (code) => transformSync(code, options);

async function sha1(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

// start with single script only, later we can make it querySelectorAll...
const s = document.querySelector("script[main]");
const m = s.getAttribute("main");

const f = await fetch(`${m}`).then((r) => r.text());
console.log({ source: f });

const se = document.createElement("script");
se.type = "module";

// check if file was compiled
const h = await sha1(f);
console.log({ h });
if (localStorage.getItem(h) !== null) {
  se.textContent = localStorage.getItem(h);
} else {
  console.info("building...");
  const { transpile } = await importSwc();
  const t = transpile(f);
  se.textContent = t.code;
  localStorage.setItem(await sha1(f), t.code);
}

s.replaceWith(se);
