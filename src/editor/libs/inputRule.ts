import {
  InputRule,
  inputRules,
  textblockTypeInputRule,
} from "prosemirror-inputrules";
import { schema } from "./schema";

export function buildInputRule() {
  const rules: InputRule[] = [];
  rules.push(
    textblockTypeInputRule(/^(#{1,3})\s$/, schema.nodes.heading, (match) => {
      return { level: match[1].length };
    })
  );
  rules.push(
    new InputRule(/^---$/, (state, match, start, end) => {
      const tr = state.tr;
      tr.replaceWith(start - 1, end, schema.nodes.hr.create());
      return tr;
    })
  );

  return inputRules({ rules });
}
