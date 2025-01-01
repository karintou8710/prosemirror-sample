import { EditorView } from "prosemirror-view";
import { schema } from "../libs/schema";

export function insertImage(view: EditorView, image: string, pos: number) {
  const tr = view.state.tr;

  const imageNode = schema.nodes.image.create({
    src: image,
  });
  const captionNode = schema.nodes.caption.create();
  const figureNode = schema.nodes.figure.create(null, [imageNode, captionNode]);
  tr.insert(pos, figureNode);
  view.dispatch(tr);
}
