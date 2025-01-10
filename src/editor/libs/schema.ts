import { MarkSpec, NodeSpec, Schema } from "prosemirror-model";
import { addListNodes } from "prosemirror-schema-list";

const nodes = {
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
      alt: { validate: "string", default: "" },
    },
    atom: true,
    draggable: false,
    selectable: false,
    parseDOM: [
      {
        tag: "img[src]",
        getAttrs(dom) {
          return {
            src: dom.getAttribute("src") ?? "",
            alt: dom.getAttribute("alt") ?? "",
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
  ruby: {
    group: "inline",
    attrs: {
      rb: {
        default: "",
        validate: "string",
      },
      rt: {
        default: "",
        validate: "string",
      },
    },
    atom: true,
    inline: true,
    parseDOM: [
      {
        tag: "ruby[data-rb][data-rt]",
        getAttrs(dom) {
          return {
            rb: dom.getAttribute("data-rb"),
            rt: dom.getAttribute("data-rt"),
          };
        },
      },
    ],
    toDOM(node) {
      return ["ruby", { "data-rb": node.attrs.rb, "data-rt": node.attrs.rt }];
    },
  },
} as const satisfies Record<string, NodeSpec>;

const marks = {
  bold: {
    parseDOM: [{ tag: "b" }],
    toDOM() {
      return ["b", 0];
    },
  },
  italic: {
    parseDOM: [{ tag: "i" }],
    toDOM() {
      return ["i", 0];
    },
  },
  underline: {
    parseDOM: [{ tag: "u" }],
    toDOM() {
      return ["u", 0];
    },
  },
  strike: {
    parseDOM: [{ tag: "s" }],
    toDOM() {
      return ["s", 0];
    },
  },
  code: {
    parseDOM: [{ tag: "code" }],
    toDOM() {
      return ["code", 0];
    },
  },
} as const satisfies Record<string, MarkSpec>;

export const basicSchema = new Schema({
  nodes,
  marks,
});

export const schema = new Schema({
  nodes: addListNodes(basicSchema.spec.nodes, "paragraph block*", "block"),
  marks: basicSchema.spec.marks,
});
