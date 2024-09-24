"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";

interface Props {
  value: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
}

const JsonEditor: React.FC<Props> = ({ value, onChange, disabled }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");

  const handlePretty = () => {
    try {
      const parsedJson = JSON.parse(value);
      const prettyJson = JSON.stringify(parsedJson, null, 2);
      onChange?.(prettyJson);
      setError("");
    } catch (error) {
      setError(`Invalid JSON: ${error}`);
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = value;
      updateLineNumbers();
    }
  }, [value]);

  useEffect(() => {
    if (value) handlePretty();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event.target.value);
    updateLineNumbers();
  };
  const updateLineNumbers = () => {
    if (lineNumbersRef.current && textAreaRef.current) {
      const lines = textAreaRef.current.value.split("\n").length;
      lineNumbersRef.current.innerHTML = Array.from(
        { length: lines },
        (_, i) => i + 1
      ).join("<br />");
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        {!disabled && (
          <Button
            onClick={handlePretty}
            variant="secondary"
            className="h-7 tex-sm text-primary"
          >
            Pretty
          </Button>
        )}
      </div>
      <Card className="flex rounded-lg mt-2 overflow-hidden">
        <div
          className="bg-border text-center text-primary p-2 user-select-none border-r z-[1] flex justify-center text-sm"
          ref={lineNumbersRef}
        ></div>
        <Textarea
          ref={textAreaRef}
          value={value}
          onChange={handleChange}
          placeholder="Enter JSON here..."
          rows={10}
          className="resize-none w-full p-2 focus:outline-none rounded-none !opacity-100"
          disabled={disabled}
        />
      </Card>
      {error && !disabled && (
        <p className="text-destructive font-light text-sm">{error}</p>
      )}
    </div>
  );
};

export default JsonEditor;
