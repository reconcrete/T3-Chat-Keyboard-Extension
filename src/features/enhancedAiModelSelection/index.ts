import { wait } from "@/shared/lib/common";
import {
  chatTextareaSelector,
  modelFirstMenuItemSelector,
  modelSearchInputSelector,
  openModelSearchButtonSelector,
} from "../../shared/selectors";

export function runEnhancedAiModelSelection(): void {
  document.addEventListener(
    "keydown",
    async (event) => {
      const activeElement = document.activeElement;

      if (event.key === "ArrowDown" && activeElement instanceof Element) {
        if (event.ctrlKey && event.shiftKey && activeElement.matches(chatTextareaSelector)) {
          const openModelSearchButton = document.querySelector<HTMLElement>(openModelSearchButtonSelector);

          if (openModelSearchButton) {
            event.preventDefault();
            event.stopImmediatePropagation();

            const rect = openModelSearchButton.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const fire = (e: Event) => openModelSearchButton.dispatchEvent(e);

            fire(
              new PointerEvent("pointerdown", {
                bubbles: true,
                cancelable: true,
                clientX: cx,
                clientY: cy,
                pointerType: "mouse",
                isPrimary: true,
              })
            );
            fire(
              new MouseEvent("mousedown", {
                bubbles: true,
                cancelable: true,
                clientX: cx,
                clientY: cy,
                button: 0,
                buttons: 1,
              })
            );
            fire(
              new PointerEvent("pointerup", {
                bubbles: true,
                cancelable: true,
                clientX: cx,
                clientY: cy,
                pointerType: "mouse",
                isPrimary: true,
              })
            );
            fire(
              new MouseEvent("mouseup", {
                bubbles: true,
                cancelable: true,
                clientX: cx,
                clientY: cy,
                button: 0,
              })
            );
            fire(
              new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                clientX: cx,
                clientY: cy,
                button: 0,
              })
            );

            await wait(100);

            const firstMenuItem = document.querySelector<HTMLElement>(modelFirstMenuItemSelector);
            if (firstMenuItem) {
              firstMenuItem.focus();
            }
          }
        }

        if (activeElement.matches(modelSearchInputSelector)) {
          const firstMenuItem = document.querySelector<HTMLElement>(modelFirstMenuItemSelector);
          if (firstMenuItem) {
            firstMenuItem.focus();
          }
        }
      }
    },
    { capture: true }
  );
}
