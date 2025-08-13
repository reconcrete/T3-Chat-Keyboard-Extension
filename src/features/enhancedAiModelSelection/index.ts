import { modelFirstMenuItemSelector, modelSearchInputSelector } from "../../elements/selectors";

export function runEnhancedAiModelSelection(): void {
  document.addEventListener("keydown", (event) => {
    const activeElement = document.activeElement;

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
  });
}
