import { EditorView } from "prosemirror-view";
import { schema } from "../libs/schema";

export function insertImage(view: EditorView, image: string, pos: number) {
  const tr = view.state.tr;
  const imageNode = schema.nodes.image.create({
    src: image,
  });
  tr.insert(pos, imageNode);
  view.dispatch(tr);
}
