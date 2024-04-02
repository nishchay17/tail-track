import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";

const codeString = `await fetch('https://tail-track.vercel.app/api/v1/analytics', {
    method: "POST",
    headers: {
        "Content-type": "application/json",
        "App-token": "YOUR_API_KEY"
    },
    body: JSON.stringify({namespace, meta})
})
`;

function DirectConnect() {
  return (
    <div className="space-y-2">
      <p>
        You can do a POST request to the following endpoint using the following
        code:
      </p>
      <SyntaxHighlighter
        language="javascript"
        style={tomorrowNightBright}
        customStyle={{
          width: "fit-content",
          marginLeft: "1rem",
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

export default DirectConnect;
