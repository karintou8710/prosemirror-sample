import { Attrs, Node, NodeType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { objectIncludes } from "../../utils";

export function isActive(
  state: EditorState,
  nodeType: NodeType,
  attrs: Attrs = {}
) {
  const nodes: Node[] = [];
  const { from, to } = state.selection;
  state.doc.nodesBetween(from, to, (node) => {
    if (node.isText) return;

    nodes.push(node);
  });

  if (nodes.length !== 1) return false;

  const node = nodes[0];
  const isSameNode = nodeType === node.type;
  const isSameAttrs = objectIncludes(node.attrs, attrs);
  return isSameNode && isSameAttrs;
}
