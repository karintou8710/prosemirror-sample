import { EditorState } from "prosemirror-state";
import { schema } from "./schema";
import { buildKeymap } from "./keymap";
import { history } from "prosemirror-history";
import { buildInputRule } from "./inputRule";
import { DOMParser } from "prosemirror-model";
import { dropCursor } from "prosemirror-dropcursor";
import buildImagePlugin from "../plugins/image";

const createDoc = (html: string) => {
  const element = document.createElement("div");
  element.innerHTML = html;

  return DOMParser.fromSchema(schema).parse(element);
};

export function createState(html: string) {
  return EditorState.create({
    doc: createDoc(html),
    schema,
    plugins: [
      history(),
      buildKeymap(),
      buildInputRule(),
      dropCursor(),
      buildImagePlugin(),
    ],
  });
}
