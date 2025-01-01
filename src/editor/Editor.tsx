import { useRef } from "react";

import styles from "./Editor.module.css";
import Menu from "./Menu";
import useEditor from "./hooks/useEditor";

import "prosemirror-view/style/prosemirror.css";
import "prosemirror-gapcursor/style/gapcursor.css";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/500.css";
import "./Editor.css";

type Props = {
  initialHtml: string;
  onChange: (html: string) => void;
};

// initialHtmlがSSRとCSRで異なる場合、Dynamic Importが必須
export default function Editor({ initialHtml, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const view = useEditor(ref, initialHtml, onChange);

  return (
    <div className={styles.container}>
      {view && <Menu view={view} />}
      <div className={styles.editor} ref={ref} />
    </div>
  );
}
