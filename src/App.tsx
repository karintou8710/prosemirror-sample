import Editor from "./editor/Editor";
import { useLocalStorage } from "./hooks/useLocalstorage";

function App() {
  const [json, setJson] = useLocalStorage("json");

  return (
    <div>
      <Editor initialJson={json} onChange={setJson} />
    </div>
  );
}

export default App;
