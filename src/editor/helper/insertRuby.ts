import { EditorView } from "prosemirror-view";
import { schema } from "../libs/schema";

export function insertRuby(view: EditorView, pos: number) {
  const tr = view.state.tr;

  const rubyNode = schema.nodes.ruby.create({
    rb: "東京",
    rt: "とうきょう",
  });
  tr.insert(pos, rubyNode);
  view.dispatch(tr);
}
