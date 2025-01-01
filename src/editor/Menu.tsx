import { setBlockType } from "prosemirror-commands";
import { EditorView } from "prosemirror-view";
import { schema } from "./libs/schema";
import { isActive } from "./helper/isActive";
import { fileToBase64 } from "../utils";

type Props = {
  view: EditorView;
};

export default function Menu({ view }: Props) {
  const setH1 = setBlockType(schema.nodes.heading, { level: 1 });
  const setH2 = setBlockType(schema.nodes.heading, { level: 2 });
  const setH3 = setBlockType(schema.nodes.heading, { level: 3 });

  const isH1Active = isActive(view.state, schema.nodes.heading, { level: 1 });
  const isH2Active = isActive(view.state, schema.nodes.heading, { level: 2 });
  const isH3Active = isActive(view.state, schema.nodes.heading, { level: 3 });

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setH1(view.state, view.dispatch);
            view.focus();
          }}
          style={{ background: isH1Active ? "orange" : "" }}
        >
          h1
        </button>
        <button
          onClick={() => {
            setH2(view.state, view.dispatch);
            view.focus();
          }}
          style={{ background: isH2Active ? "orange" : "" }}
        >
          h2
        </button>
        <button
          onClick={() => {
            setH3(view.state, view.dispatch);
            view.focus();
          }}
          style={{ background: isH3Active ? "orange" : "" }}
        >
          h3
        </button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <input
          type="file"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const image = await fileToBase64(file);
            const tr = view.state.tr;
            const imageNode = schema.nodes.image.create({
              src: image,
            });
            tr.replaceWith(
              view.state.selection.from,
              view.state.selection.to,
              imageNode
            );
            view.dispatch(tr);
          }}
        />
      </div>
    </div>
  );
}
