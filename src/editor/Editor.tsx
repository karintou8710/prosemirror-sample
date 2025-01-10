import { useRef } from "react";

import styles from "./Editor.module.css";
import useEditor from "./hooks/useEditor";

import "prosemirror-view/style/prosemirror.css";
import "prosemirror-gapcursor/style/gapcursor.css";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/500.css";
import "./Editor.css";
import BubbleMenu from "./components/BubbleMenu";
import Menu from "./components/Menu";

type Props = {
  initialJson: string | null;
  onChange: (html: string) => void;
};

// initialHtmlがSSRとCSRで異なる場合、Dynamic Importが必須
export default function Editor({ initialJson, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const view = useEditor(ref, initialJson, onChange);

  return (
    <div className={styles.container}>
      {view && <Menu view={view} />}
      <div className={styles.editor} ref={ref} />
      {view && <BubbleMenu view={view} />}
    </div>
  );
}
