"use client";

import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

export function ToggleDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="flex items-center gap-3">
        <Toggle checked={checked} onCheckedChange={setChecked} />
        <span className="text-xs text-text-secondary">
          {checked ? "on" : "off"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Toggle defaultChecked />
        <span className="text-xs text-accent-green">roast mode</span>
      </div>
    </div>
  );
}
