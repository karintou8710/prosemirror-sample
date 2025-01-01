import Editor from "./editor/Editor";
import { useLocalStorage } from "./hooks/useLocalstorage";

function App() {
  const [html, setHtml] = useLocalStorage("html");

  return (
    <div>
      <Editor initialHtml={html} onChange={setHtml} />
    </div>
  );
}

export default App;
