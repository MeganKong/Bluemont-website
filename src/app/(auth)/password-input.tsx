"use client";
// Owner: Megan (built by Adhya). A password box with a Show/Hide button, so
// people can check what they typed (handy on a phone keyboard).
import { useState } from "react";
import { input } from "./_styles";

type PasswordInputProps = {
  id: string;
  name: string;
  autoComplete: "current-password" | "new-password";
  minLength?: number;
  // The id of a hint under the box, like "At least 6 characters."
  hintId?: string;
};

export function PasswordInput({ id, name, autoComplete, minLength, hintId }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        required
        minLength={minLength}
        autoComplete={autoComplete}
        autoCapitalize="none"
        spellCheck={false}
        aria-describedby={hintId}
        className={`${input} pr-24`}
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        aria-controls={id}
        className="absolute inset-y-0 right-2 my-auto h-10 rounded-full px-4 font-bold text-blue hover:bg-sand focus-visible:outline-2 focus-visible:outline-blue"
      >
        {visible ? "Hide" : "Show"}
        <span className="sr-only"> password</span>
      </button>
    </div>
  );
}
