document.addEventListener("keydown", function (event) {
  const searchInputSelector = 'input[role="searchbox"][aria-label="Search threads"]';
  const firstMenuItemSelector = 'div[data-radix-menu-content] div[role="menuitem"]';

  const activeElement = document.activeElement;

  if (event.key === "ArrowDown" && activeElement && activeElement.matches(searchInputSelector)) {
    const firstMenuItem = document.querySelector(firstMenuItemSelector);
    if (firstMenuItem) {
      firstMenuItem.focus();
    }
  }
});

document.addEventListener("keydown", function (event) {
  if (event.metaKey && event.shiftKey && event.key === "k") {
    setTimeout(() => {
      const activeInput = document.activeElement;

      for (const char of ">") {
        // 1. Dispatch a "keydown" event
        activeInput.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: char,
            code: `Key${char.toUpperCase()}`,
            bubbles: true,
          })
        );

        // 2. Update the value
        activeInput.value += char;

        // 3. Dispatch an "input" event to notify of the change
        activeInput.dispatchEvent(
          new InputEvent("input", {
            inputType: "insertText",
            data: char,
            bubbles: true,
            composed: true, // Important for web components/shadow DOM
          })
        );

        // 4. Dispatch a "keyup" event
        activeInput.dispatchEvent(
          new KeyboardEvent("keyup", {
            key: char,
            code: `Key${char.toUpperCase()}`,
            bubbles: true,
          })
        );
      }
    }, 0);
  }
});
