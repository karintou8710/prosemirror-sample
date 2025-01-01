import { Attrs, NodeType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { isObjectEqual } from "../../utils";

export function isActive(
  state: EditorState,
  nodeType: NodeType,
  attrs: Attrs = {}
) {
  if (!state.selection.empty) return false;

  const node = state.selection.$from.node();
  const isSameNode = nodeType === node.type;
  const isSameAttrs = isObjectEqual(node.attrs, attrs);
  return isSameNode && isSameAttrs;
}
