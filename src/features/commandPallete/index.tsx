import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Search, Slash, Plus, Clock } from "lucide-react";
import { cancelMessageButtonSelector, settingsAnchorSelector } from "@/shared/selectors";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type CommandButton = {
  text: string;
  action: () => void;
};

function CommandPalette(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const searchRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.metaKey && event.shiftKey && event.key.toLowerCase() === "k") {
        event.stopImmediatePropagation();
        setOpen(true);
        setQuery("");
        setActiveIndex(0);
      }
    };
    document.addEventListener("keydown", handler, { capture: true });
    return () => document.removeEventListener("keydown", handler, { capture: true } as any);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => searchRef.current?.focus(), 0);
    return () => clearTimeout(id);
  }, [open]);

  const buttons: CommandButton[] = useMemo(
    () => [
      {
        text: "Open Settings",
        action: () => {
          const settingsAnchor = document.querySelector<HTMLElement>(settingsAnchorSelector);
          settingsAnchor?.click();
        },
      },
      {
        text: "Toggle Theme",
        action: () => {
          const settingsAnchor = document.querySelector<HTMLElement>(settingsAnchorSelector);
          const toggleThemeButton = settingsAnchor?.nextElementSibling;
          if (toggleThemeButton && toggleThemeButton instanceof HTMLElement) {
            toggleThemeButton.click();
          }
        },
      },
      {
        text: "Stop Response",
        action: () => {
          const cancelMessageButton = document.querySelector<HTMLElement>(cancelMessageButtonSelector);
          if (cancelMessageButton) {
            cancelMessageButton.click();
          }
        },
      },
      {
        text: "Select Model",
        action: () => {
          const event = new KeyboardEvent("keydown", {
            key: "ArrowDown",
            code: "ArrowDown",
            ctrlKey: true,
            shiftKey: true,
            bubbles: true,
            cancelable: true,
          });
          document.dispatchEvent(event);
        },
      },
      {
        text: "Toggle Sidebar",
        action: () => {
          const event = new KeyboardEvent("keydown", {
            key: "b",
            code: "KeyB",
            metaKey: true,
            bubbles: true,
            cancelable: true,
          });
          document.dispatchEvent(event);
        },
      },
    ],
    []
  );

  const filteredButtons = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return buttons;
    return buttons.filter((b) => b.text.toLowerCase().includes(q));
  }, [buttons, query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <DialogTitle>Command Palette</DialogTitle>
      </VisuallyHidden>

      <DialogContent aria-describedby="command-palette-description" showCloseButton>
        <div id="command-palette-description" className="sr-only">
          A command palette for quick access to T3 Chat features and actions
        </div>

        <div className="pointer-events-auto absolute -top-16 flex h-fit w-full flex-col gap-1 rounded-xl bg-popover p-3.5 pt-2.5 text-secondary-foreground shadow-2xl outline outline-1 outline-chat-border/20 backdrop-blur-md max-sm:inset-x-4 max-sm:w-auto dark:outline-white/5">
          <div className="relative">
            <div className="w-full rounded-t-lg bg-popover">
              <div className="mr-px flex items-start justify-start pb-2">
                <div className="mt-0.5 flex items-center text-muted-foreground/75">
                  <Search className="ml-px !size-4" />
                  <Slash className="ml-[3px] !size-4 skew-x-[30deg] opacity-20" />
                  <Plus className="mr-3 !size-4" />
                </div>
                <textarea
                  ref={searchRef}
                  className="w-full resize-none bg-transparent text-sm placeholder:select-none placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  role="searchbox"
                  aria-label="Search commands"
                  placeholder="Search commands..."
                  style={{ height: "20px" }}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.currentTarget.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setActiveIndex((i) => Math.min(i + 1, Math.max(filteredButtons.length - 1, 0)));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setActiveIndex((i) => Math.max(i - 1, 0));
                    } else if (e.key === "Enter") {
                      e.preventDefault();
                      const target = filteredButtons[activeIndex];
                      if (target) {
                        setOpen(false);
                        queueMicrotask(target.action);
                      }
                    }
                  }}
                />
              </div>
              <div className="border-b border-chat-border px-3" />
            </div>
          </div>

          <div className="mt-2.5 max-h-[50vh] space-y-2 overflow-y-auto">
            <div className="flex flex-col gap-1">
              <div className="flex w-full items-center justify-start gap-1.5 pl-[3px] text-sm text-color-heading">
                <Clock className="size-3" /> Commands
              </div>
              <ul className="flex flex-col gap-0 text-sm text-muted-foreground">
                {filteredButtons.map(({ text, action }, idx) => (
                  <li key={text}>
                    <button
                      className={`block w-full rounded-md px-2.5 py-2 text-left hover:bg-accent/30 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
                        idx === activeIndex ? "bg-accent/30" : ""
                      }`}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => {
                        setOpen(false);
                        queueMicrotask(action);
                      }}
                    >
                      {text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
