import { Node } from "prosemirror-model";

export class RubyView {
  dom: HTMLElement;

  constructor(node: Node) {
    this.dom = document.createElement("ruby");
    const rbTextDom = document.createTextNode(node.attrs.rb);
    const rtDom = document.createElement("rt");
    const rtTextDom = document.createTextNode(node.attrs.rt);

    rtDom.appendChild(rtTextDom);
    this.dom.appendChild(rbTextDom);
    this.dom.appendChild(rtDom);
  }

  stopEvent() {
    return true;
  }
}
