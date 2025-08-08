// Content script for T3 Chat Keyboard Navigation (TypeScript)

function focusFirstMenuItemIfInSearch(event: KeyboardEvent): void {
  const searchInputSelector = 'input[role="searchbox"][aria-label="Search threads"]';
  const firstMenuItemSelector = 'div[data-radix-menu-content] div[role="menuitem"]';

  const activeElement: Element | null = document.activeElement;

  if (event.key === "ArrowDown" && activeElement instanceof Element && activeElement.matches(searchInputSelector)) {
    const firstMenuItem = document.querySelector<HTMLElement>(firstMenuItemSelector);
    if (firstMenuItem) {
      firstMenuItem.focus();
    }
  }
}

function typeTextIntoEditable(target: HTMLInputElement | HTMLTextAreaElement, text: string): void {
  for (const char of text) {
    // 1) keydown
    target.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: char,
        bubbles: true,
      })
    );

    // 2) update value
    target.value = `${target.value}${char}`;

    // 3) input
    target.dispatchEvent(
      new InputEvent("input", {
        inputType: "insertText",
        data: char,
        bubbles: true,
        composed: true,
      })
    );

    // 4) keyup
    target.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: char,
        bubbles: true,
      })
    );
  }
}

function insertChevronOnShortcut(event: KeyboardEvent): void {
  if (event.metaKey && event.shiftKey && event.key.toLowerCase() === "k") {
    setTimeout(() => {
      const active = document.activeElement;
      if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
        typeTextIntoEditable(active, ">");
      }
    }, 0);
  }
}

document.addEventListener("keydown", focusFirstMenuItemIfInSearch);
document.addEventListener("keydown", insertChevronOnShortcut);
