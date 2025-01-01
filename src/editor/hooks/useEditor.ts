import { EditorView } from "prosemirror-view";
import { RefObject, useEffect, useReducer, useRef, useState } from "react";

import { createState } from "../libs/state";

// DOMはRefで渡されないと、参照が更新されない.レンダリング時はnullだが、useEffectでは更新されている。
// その間のmount中にrefの参照が更新されるため.
export default function useEditor(
  domRef: RefObject<Node>,
  initialHtml: string,
  onChange: (html: string) => void
) {
  const [view, setView] = useState<EditorView | null>(null);
  const [, forceUpdate] = useReducer((v) => v + 1, Number.MIN_SAFE_INTEGER);
  const initialHtmlRef = useRef(initialHtml);

  useEffect(() => {
    if (!domRef.current) return;

    const pmView = new EditorView(domRef.current, {
      state: createState(initialHtmlRef.current),
      dispatchTransaction(transaction) {
        pmView.updateState(pmView.state.apply(transaction));
        onChange(pmView.dom.innerHTML);
        forceUpdate();
      },
    });
    setView(pmView);

    return () => {
      pmView.destroy();
    };
  }, [onChange, initialHtmlRef, domRef]);

  return view;
}
