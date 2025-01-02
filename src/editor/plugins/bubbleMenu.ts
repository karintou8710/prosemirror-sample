import { EditorState, Plugin, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

export function bubbleMenu(key: PluginKey, element: HTMLElement) {
  return new Plugin({
    key: key,
    view(view) {
      return new BubbleMenu(view, element);
    },
  });
}

class BubbleMenu {
  view: EditorView;
  menu: HTMLDivElement;

  constructor(view: EditorView, element: HTMLElement) {
    this.view = view;

    this.menu = document.createElement("div");
    this.menu.style.position = "absolute";
    this.menu.style.display = "none";
    this.menu.appendChild(element);
    this.view.dom.parentNode?.appendChild(this.menu);

    this.update(view);
  }

  update(view: EditorView, oldState?: EditorState) {
    const { from } = view.state.selection;

    if (view.state.selection.empty) {
      this.menu.style.display = "none";
      return;
    }

    const from1 = view.coordsAtPos(from);
    this.menu.style.display = "block";
    this.menu.style.top = `${from1.top - 40}px`;
    this.menu.style.left = `${from1.left - 20}px`;
  }

  destroy() {
    if (this.menu) {
      this.menu.remove();
    }
  }
}
