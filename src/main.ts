import { modelFirstMenuItemSelector, modelSearchInputSelector, threadsSearchModalSelector } from "./elements/selectors";
import { comandPalette } from "./features/commandPalette";
import { isElementVisible, typeTextIntoEditable } from "./utils/html";

function focusFirstMenuItemIfInSearch(event: KeyboardEvent): void {
  const activeElement: Element | null = document.activeElement;

  if (
    event.key === "ArrowDown" &&
    activeElement instanceof Element &&
    activeElement.matches(modelSearchInputSelector)
  ) {
    const firstMenuItem = document.querySelector<HTMLElement>(modelFirstMenuItemSelector);
    if (firstMenuItem) {
      firstMenuItem.focus();
    }
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

comandPalette();
