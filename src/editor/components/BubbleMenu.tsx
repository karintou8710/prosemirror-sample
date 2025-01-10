import { EditorView } from "prosemirror-view";
import BubbleMenuBase from "./BubbleMenuBase";

import styles from "./BubbleMenu.module.css";
import { toggleMark } from "prosemirror-commands";
import { schema } from "../libs/schema";
import isMarkActive from "../helper/isMarkActive";

type Props = {
  view: EditorView;
};

export default function BubbleMenu({ view }: Props) {
  const toggleBold = toggleMark(schema.marks.bold);
  const toggleItalic = toggleMark(schema.marks.italic);
  const toggleUnderline = toggleMark(schema.marks.underline);
  const toggleStrike = toggleMark(schema.marks.strike);
  const toggleCode = toggleMark(schema.marks.code);

  const isBoldActive = isMarkActive(view.state, schema.marks.bold);
  const isItalicActive = isMarkActive(view.state, schema.marks.italic);
  const isUnderlineActive = isMarkActive(view.state, schema.marks.underline);
  const isStrikeActive = isMarkActive(view.state, schema.marks.strike);
  const isCodeActive = isMarkActive(view.state, schema.marks.code);

  return (
    <BubbleMenuBase view={view} className={styles.bubbleMenu}>
      <button
        onClick={() => {
          toggleBold(view.state, view.dispatch);
          view.focus();
        }}
        style={{ background: isBoldActive ? "orange" : "" }}
      >
        B
      </button>
      <button
        onClick={() => {
          toggleItalic(view.state, view.dispatch);
          view.focus();
        }}
        style={{ background: isItalicActive ? "orange" : "" }}
      >
        I
      </button>
      <button
        onClick={() => {
          toggleUnderline(view.state, view.dispatch);
          view.focus();
        }}
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
    </BubbleMenuBase>
  );
}
