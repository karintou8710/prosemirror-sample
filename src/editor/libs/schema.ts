import { Schema } from "prosemirror-model";

export const schema = new Schema({
  nodes: {
    doc: {
      content: "block+",
    },
    paragraph: {
      content: "inline*",
      group: "block",
      parseDOM: [{ tag: "p" }],
      toDOM() {
        return ["p", 0];
      },
    },
    heading: {
      content: "inline*",
      group: "block",
      attrs: { level: { default: 1, validate: "number" } },
      defining: true,
      parseDOM: [
        { tag: "h1", attrs: { level: 1 } },
        { tag: "h2", attrs: { level: 2 } },
        { tag: "h3", attrs: { level: 3 } },
      ],
      toDOM(node) {
        return [`h${node.attrs.level}`, 0];
      },
    },
    image: {
      group: "block",
      attrs: { src: { default: "", validate: "string" } },
      atom: true,
      draggable: true,
      parseDOM: [
        {
          tag: "img[src]",
          getAttrs(dom) {
            return {
              src: dom.getAttribute("src"),
            };
          },
        },
      ],
      toDOM(node) {
        return ["img", { src: node.attrs.src }];
      },
    },
    text: {
      group: "inline",
    },
  },
});
