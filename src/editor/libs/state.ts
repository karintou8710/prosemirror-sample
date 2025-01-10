import { EditorState } from "prosemirror-state";
import { schema } from "./schema";
import { buildKeymap } from "./keymap";
import { history } from "prosemirror-history";
import { buildInputRule } from "./inputRule";
import { dropCursor } from "prosemirror-dropcursor";
import buildImagePlugin from "../plugins/image";

export function createState(json: string | null) {
  return EditorState.create({
    doc: json ? schema.nodeFromJSON(JSON.parse(json)) : undefined,
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
