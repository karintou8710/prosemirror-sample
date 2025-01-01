import { EditorView } from "prosemirror-view";
import { RefObject, useEffect, useReducer, useRef, useState } from "react";

import { createState } from "../libs/state";
import { fileToBase64 } from "../../utils";
import { insertImage } from "../helper/insertImage";

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
      handleDOMEvents: {
        drop(view, event) {
          if (event.dataTransfer && event.dataTransfer.files.length === 1) {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            const pos = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });
            if (!pos) return;

            fileToBase64(file).then((image) => {
              insertImage(view, image, pos.pos);
            });
          }
        },
      },
    });
    setView(pmView);

    return () => {
      pmView.destroy();
    };
  }, [onChange, initialHtmlRef, domRef]);

  return view;
}
