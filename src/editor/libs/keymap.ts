import { EditorState, Transaction } from "prosemirror-state";
import { schema } from "./schema";
import { setBlockType } from "prosemirror-commands";
import { baseKeymap, chainCommands } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";
import { redo, undo } from "prosemirror-history";

export function backspaceDefault(
  state: EditorState,
  dispatch?: (tr: Transaction) => void
) {
  if (
    !state.selection.empty ||
    state.selection.$from.node().type !== schema.nodes.heading ||
    state.selection.$from.start() !== state.selection.from
  )
    return false;

  setBlockType(schema.nodes.paragraph)(state, dispatch);

  return true;
}

export function buildKeymap() {
  return keymap({
    Enter: baseKeymap.Enter,
    Backspace: chainCommands(backspaceDefault, baseKeymap.Backspace),
    "Mod-z": undo,
    "Mod-y": redo,
    "Mod-Shift-z": redo,
  });
}
