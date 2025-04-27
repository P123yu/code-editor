import React, { useState } from "react";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("java");

  const handleSubmit = async () => {
    const endpoint = language === "java" ? "/compile/java" : "/compile/python";
    const response = await fetch(`http://localhost:8080/api${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: code,
    });

    const result = await response.text();
    setOutput(result);
  };

  return (
    <div>
      <h2>Code Editor</h2>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="java">Java</option>
        <option value="python">Python</option>
      </select>
      <textarea
        rows="20"
        cols="80"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Run Code</button>

      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
}

export default App;
