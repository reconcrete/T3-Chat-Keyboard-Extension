export function typeTextIntoEditable(target: HTMLInputElement | HTMLTextAreaElement, text: string): void {
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

export function isElementVisible(element: Element): boolean {
  if (!(element instanceof HTMLElement)) return false;
  if (element.hidden) return false;
  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden") return false;
  return true;
}
