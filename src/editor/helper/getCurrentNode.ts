import { EditorView } from "prosemirror-view";

// 簡易的に範囲選択時の挙動を考えない
export function getCurrentNode(view: EditorView) {
  const { selection } = view.state;

  if (!selection.empty) return null;

  return selection.$from.node();
}
