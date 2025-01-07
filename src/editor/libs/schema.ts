import { MarkSpec, NodeSpec, Schema } from "prosemirror-model";
import { addListNodes } from "prosemirror-schema-list";

const nodes = {
  doc: {
    content: "block+",
  } as NodeSpec,
  paragraph: {
    content: "inline*",
    group: "block",
    parseDOM: [{ tag: "p" }],
    toDOM() {
      return ["p", 0];
    },
  } as NodeSpec,
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
  } as NodeSpec,
  figure: {
    content: "(image caption)?",
    group: "block",
    parseDOM: [{ tag: "figure" }],
    draggable: true,
    selectable: true,
    toDOM() {
      return ["figure", { draggable: true }, 0];
    },
  } as NodeSpec,
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
  } as NodeSpec,
  caption: {
    content: "inline*",
    group: "caption",
    parseDOM: [{ tag: "figcaption" }],
    toDOM() {
      return ["figcaption", 0];
    },
  } as NodeSpec,
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
  } as NodeSpec,
  text: {
    group: "inline",
  } as NodeSpec,
} as const;

const marks = {
  bold: {
    parseDOM: [{ tag: "b" }],
    toDOM() {
      return ["b", 0];
    },
  } as MarkSpec,
  italic: {
    parseDOM: [{ tag: "i" }],
    toDOM() {
      return ["i", 0];
    },
  } as MarkSpec,
} as const;

export const basicSchema = new Schema({
  nodes,
  marks,
});

export const schema = new Schema({
  nodes: addListNodes(basicSchema.spec.nodes, "paragraph block*", "block"),
  marks: basicSchema.spec.marks,
});
