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

  const isBoldActive = isMarkActive(view.state, schema.marks.bold);

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
      <button>I</button>
      <button>C</button>
      <button>L</button>
    </BubbleMenuBase>
  );
}
