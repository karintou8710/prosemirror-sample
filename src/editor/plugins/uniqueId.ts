import { Plugin, PluginKey } from "prosemirror-state";

export default function buildUniqueIdPlugin() {
  return new Plugin({
    key: new PluginKey("unique-id"),
    appendTransaction(trs, oldState, newState) {},
  });
}
