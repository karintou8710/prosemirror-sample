import { EditorState, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

export default function unregisterPlugin(
  view: EditorView,
  pluginKey: PluginKey
): EditorState | undefined {
  if (view.isDestroyed) {
    return undefined;
  }

  const prevPlugins = view.state.plugins;
  const plugins = prevPlugins.filter((plugin) => plugin.spec.key !== pluginKey);

  const state = view.state.reconfigure({
    plugins,
  });

  view.updateState(state);

  return state;
}
