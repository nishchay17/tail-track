import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";

const codeString = `import tailtrack from "tail-track";

await tailtrack({
    namespace: "YOUR_NAMESPACE",
    meta: {}
})
`;

function PackageConnect() {
  return (
    <div className="space-y-2">
      <p>
        1. Install the package:{" "}
        <Link
          href="https://www.npmjs.com/package/tail-track"
          target="_blank"
          className="underline underline-offset-2"
        >
          tail-track
        </Link>
      </p>
      <p>
        2. Add your API key as envoronment variable named{" "}
        <span className="underline underline-offset-2">TAILTRACK_API_KEY:</span>
      </p>
      <p>3. Import and use the function:</p>
      <SyntaxHighlighter
        language="javascript"
        style={tomorrowNightBright}
        customStyle={{
          width: "fit-content",
          borderRadius: "6px",
          marginLeft: "1rem",
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

export default PackageConnect;
