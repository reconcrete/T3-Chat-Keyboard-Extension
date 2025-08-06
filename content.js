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
