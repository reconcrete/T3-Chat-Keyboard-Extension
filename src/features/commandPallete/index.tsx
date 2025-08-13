import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type CommandButton = {
  text: string;
  action: () => void;
};

function CommandPalette(): React.ReactElement {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.metaKey && event.shiftKey && event.key.toLowerCase() === "k") {
        event.stopImmediatePropagation();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handler, { capture: true });
    return () => document.removeEventListener("keydown", handler, { capture: true } as any);
  }, []);

  const buttons: CommandButton[] = useMemo(
    () => [
      {
        text: "Open Settings",
        action: () => {
          const settingsAnchor = document.querySelector<HTMLElement>('a[aria-label="Go to settings"][data-state]');
          settingsAnchor?.click();
        },
      },
      {
        text: "Toggle Theme",
        action: () => {
          const settingsAnchor = document.querySelector<HTMLElement>('a[aria-label="Go to settings"][data-state]');
          const toggleThemeButton = settingsAnchor?.nextElementSibling;
          if (toggleThemeButton && toggleThemeButton instanceof HTMLElement) {
            toggleThemeButton.click();
          }
        },
      },
      {
        text: "Delete Current Thread",
        action: () => {
          // Not implemented yet – left as a placeholder
          console.debug("Delete Current Thread: action not implemented");
        },
      },
    ],
    []
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Command Palette</DialogTitle>
          <DialogDescription>Select an action</DialogDescription>
        </DialogHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {buttons.map(({ text, action }) => (
            <button
              key={text}
              onClick={() => {
                setOpen(false);
                queueMicrotask(action);
              }}
              style={{
                padding: "12px 16px",
                border: "1px solid #e5e5e5",
                borderRadius: 6,
                background: "white",
                textAlign: "left",
                fontSize: 14,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              {text}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function runComandPalette(): void {
  const containerId = "t3-chat-command-palette-root";
  if (document.getElementById(containerId)) return;

  const container = document.createElement("div");
  container.id = containerId;
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<CommandPalette />);
}
