import { MarkType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";

export default function isMarkActive(
  state: EditorState,
  markType: MarkType
): boolean {
  const { empty } = state.selection;

  if (empty) {
    return !!markType.isInSet(
      state.storedMarks ?? state.selection.$from.marks()
    );
  }

  const { from, to } = state.selection;
  let selectionRange = 0;
  let markRange = 0;
  // テキスト以外のノードにも対応
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (!node.isText) return;

    const relativeFrom = Math.max(from, pos);
    const relativeTo = Math.min(to, pos + node.nodeSize);

    selectionRange += relativeTo - relativeFrom;
    if (markType.isInSet(node.marks)) markRange += relativeTo - relativeFrom;
  });

  return markRange === selectionRange;
}
