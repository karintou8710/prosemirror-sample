import { setBlockType, toggleMark } from "prosemirror-commands";
import { EditorView } from "prosemirror-view";
import { schema } from "../libs/schema";
import { isActive } from "../helper/isActive";
import { fileToBase64 } from "../../utils";
import { insertImage } from "../helper/insertImage";
import isMarkActive from "../helper/isMarkActive";

import styles from "./Menu.module.css";
import { FileInput } from "./FileInput";
import { insertRuby } from "../helper/insertRuby";

type Props = {
  view: EditorView;
};

export default function Menu({ view }: Props) {
  const setH1 = setBlockType(schema.nodes.heading, { level: 1 });
  const setH2 = setBlockType(schema.nodes.heading, { level: 2 });
  const setH3 = setBlockType(schema.nodes.heading, { level: 3 });
  const toggleBold = toggleMark(schema.marks.bold);
  const toggleItalic = toggleMark(schema.marks.italic);
  const toggleUnderline = toggleMark(schema.marks.underline);
  const toggleStrike = toggleMark(schema.marks.strike);
  const toggleCode = toggleMark(schema.marks.code);

  const isH1Active = isActive(view.state, schema.nodes.heading, { level: 1 });
  const isH2Active = isActive(view.state, schema.nodes.heading, { level: 2 });
  const isH3Active = isActive(view.state, schema.nodes.heading, { level: 3 });
  const isBoldActive = isMarkActive(view.state, schema.marks.bold);
  const isItalicActive = isMarkActive(view.state, schema.marks.italic);
  const isUnderlineActive = isMarkActive(view.state, schema.marks.underline);
  const isStrikeActive = isMarkActive(view.state, schema.marks.strike);
  const isCodeActive = isMarkActive(view.state, schema.marks.code);

  return (
    <div>
      <div className={styles.menuBlock}>
        <button
          onClick={() => {
            setH1(view.state, view.dispatch);
            view.focus();
          }}
          className={styles.toggle}
          style={{ background: isH1Active ? "orange" : "" }}
        >
          h1
        </button>
        <button
          onClick={() => {
            setH2(view.state, view.dispatch);
            view.focus();
          }}
          className={styles.toggle}
          style={{ background: isH2Active ? "orange" : "" }}
        >
          h2
        </button>
        <button
          onClick={() => {
            setH3(view.state, view.dispatch);
            view.focus();
          }}
          className={styles.toggle}
          style={{ background: isH3Active ? "orange" : "" }}
        >
          h3
        </button>
        <FileInput
          onChange={async (file) => {
            const image = await fileToBase64(file);
            insertImage(view, image, view.state.selection.from);
            view.focus();
          }}
          className={styles.fileInput}
        />
        <button
          onClick={() => {
            insertRuby(view, view.state.selection.from);
            view.focus();
          }}
          className={styles.toggle}
          style={{ background: isH3Active ? "orange" : "" }}
        >
          rb
        </button>
      </div>
      <div className={styles.menuBlock} style={{ marginTop: "1rem" }}>
        <button
          onClick={() => {
            toggleBold(view.state, view.dispatch);
            view.focus();
          }}
          className={styles.toggle}
          style={{ background: isBoldActive ? "orange" : "" }}
        >
          B
        </button>
        <button
          onClick={() => {
            toggleItalic(view.state, view.dispatch);
            view.focus();
          }}
          className={styles.toggle}
          style={{ background: isItalicActive ? "orange" : "" }}
        >
          I
        </button>
        <button
          onClick={() => {
            toggleUnderline(view.state, view.dispatch);
            view.focus();
          }}
          className={styles.toggle}
          style={{ background: isUnderlineActive ? "orange" : "" }}
        >
          U
        </button>
        <button
          onClick={() => {
            toggleStrike(view.state, view.dispatch);
            view.focus();
          }}
          className={styles.toggle}
          style={{ background: isStrikeActive ? "orange" : "" }}
        >
          S
        </button>
        <button
          onClick={() => {
            toggleCode(view.state, view.dispatch);
            view.focus();
          }}
          className={styles.toggle}
          style={{ background: isCodeActive ? "orange" : "" }}
        >
          C
        </button>
      </div>
    </div>
  );
}
