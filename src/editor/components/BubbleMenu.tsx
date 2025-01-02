import { EditorView } from "prosemirror-view";
import { ReactNode, useEffect, useRef } from "react";
import { bubbleMenu } from "../plugins/bubbleMenu";
import { PluginKey } from "prosemirror-state";
import { registerPlugin } from "../helper/registerPlugin";
import unregisterPlugin from "../helper/unregisterPlugin";

type Props = {
  view: EditorView;
  children?: ReactNode;
  className?: string;
};

export default function BubbleMenu({ view, className, children }: Props) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || view.isDestroyed) return;

    const key = new PluginKey("bubbleMenu");
    const plugin = bubbleMenu(key, ref.current);
    registerPlugin(view, plugin);

    return () => {
      unregisterPlugin(view, key);
    };
  }, [view]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
