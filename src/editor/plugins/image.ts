import {
  EditorState,
  NodeSelection,
  Plugin,
  Transaction,
} from "prosemirror-state";
import { schema } from "../libs/schema";

export function backspaceImage(
  state: EditorState,
  dispatch?: (tr: Transaction) => void
) {
  const { selection, tr } = state;
  const $node = selection.$from;
  if ($node.node().type === schema.nodes.caption && $node.parentOffset === 0) {
    dispatch?.(tr.delete($node.before(-1), $node.after(-1)));
    return true;
  }

  return false;
}

export function enterImage(
  state: EditorState,
  dispatch?: (tr: Transaction) => void
) {
  const $node = state.selection.$from;
  return $node.node().type === schema.nodes.caption;
}

export default function buildImagePlugin() {
  return new Plugin({
    props: {
      handleDOMEvents: {
        mousedown(view, event) {
          const pos = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });
          if (!pos) return false;

          const $node = view.state.doc.resolve(pos.pos);
          if ($node.node().type !== schema.nodes.figure) return false;

          const tr = view.state.tr;
          tr.setSelection(NodeSelection.create(view.state.doc, $node.before()));
          view.dispatch(tr);
          return true;
        },
      },
    },
  });
}
