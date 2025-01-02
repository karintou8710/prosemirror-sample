import { EditorState, Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

export function registerPlugin(view: EditorView, plugin: Plugin): EditorState {
  const state = view.state.reconfigure({
    plugins: [...view.state.plugins, plugin],
  });

  view.updateState(state);

  return state;
}
