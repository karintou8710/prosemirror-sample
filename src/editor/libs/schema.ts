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
    figure: {
      content: "(image caption)?",
      group: "block",
      parseDOM: [{ tag: "figure" }],
      draggable: true,
      selectable: true,
      toDOM() {
        return ["figure", { draggable: true }, 0];
      },
    },
    image: {
      group: "image",
      attrs: {
        src: { validate: "string" },
        alt: { validate: "string", default: null },
      },
      atom: true,
      draggable: false,
      selectable: false,
      parseDOM: [
        {
          tag: "img[src]",
          getAttrs(dom) {
            return {
              src: dom.getAttribute("src"),
              alt: dom.getAttribute("alt"),
            };
          },
        },
      ],
      toDOM(node) {
        return [
          "img",
          { src: node.attrs.src, alt: node.attrs.alt, draggable: false },
        ];
      },
    },
    caption: {
      content: "inline*",
      group: "caption",
      parseDOM: [{ tag: "figcaption" }],
      toDOM() {
        return ["figcaption", 0];
      },
    },
    hr: {
      group: "block",
      parseDOM: [
        {
          tag: "hr",
        },
      ],
      toDOM() {
        return ["hr"];
      },
    },
    text: {
      group: "inline",
    },
  },
});
