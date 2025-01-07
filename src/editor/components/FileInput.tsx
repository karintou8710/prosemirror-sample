import { ChangeEvent, useRef } from "react";

type Props = {
  onChange?: (file: File) => void;
  className?: string;
};

export const FileInput = ({ onChange, className }: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const innerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onChange?.(file);
    e.target.files = null;
  };

  return (
    <>
      <button
        onClick={() => {
          console.log(inputFileRef.current);
          inputFileRef.current?.click();
        }}
        className={className}
      >
        ファイルを選択
      </button>
      <input
        type="file"
        onChange={innerOnChange}
        ref={inputFileRef}
        style={{ display: "none" }}
      />
    </>
  );
};
