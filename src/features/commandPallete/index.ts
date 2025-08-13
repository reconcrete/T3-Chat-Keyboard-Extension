const buttons = [
  {
    text: "Open Settings",
    action: () => {
      const settingsAnchor = document.querySelector<HTMLElement>('a[aria-label="Go to settings"][data-state]');

      if (settingsAnchor) {
        settingsAnchor.click();
      }
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
  { text: "Delete Current Thread", action: () => {
    
  } },
];

export function runComandPalette(): void {
  document.addEventListener("keydown", (event) => {
    if (event.metaKey && event.shiftKey && event.key.toLowerCase() === "k") {
      event.stopImmediatePropagation();

      // Create dialog overlay
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      // Create dialog content
      const dialog = document.createElement("div");
      dialog.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 20px;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      `;

      // Create title
      const title = document.createElement("h3");
      title.textContent = "Command Palette";
      title.style.cssText = `
        margin: 0 0 16px 0;
        font-size: 16px;
        font-weight: 600;
      `;

      // Create buttons container
      const buttonsContainer = document.createElement("div");
      buttonsContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 8px;
      `;

      // Function to safely remove overlay
      const removeOverlay = () => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      };

      buttons.forEach(({ text, action }) => {
        const button = document.createElement("button");
        button.textContent = text;
        button.style.cssText = `
          padding: 12px 16px;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          text-align: left;
          font-size: 14px;
          transition: background-color 0.2s;
        `;

        button.addEventListener("mouseenter", () => {
          button.style.backgroundColor = "#f5f5f5";
        });

        button.addEventListener("mouseleave", () => {
          button.style.backgroundColor = "white";
        });

        button.addEventListener("click", () => {
          removeOverlay();
          action();
        });

        buttonsContainer.appendChild(button);
      });

      // Close on overlay click
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          removeOverlay();
        }
      });

      // Close on Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          removeOverlay();
          document.removeEventListener("keydown", handleEscape);
        }
      };
      document.addEventListener("keydown", handleEscape);

      // Assemble dialog
      dialog.appendChild(title);
      dialog.appendChild(buttonsContainer);
      overlay.appendChild(dialog);

      // Add to DOM
      document.body.appendChild(overlay);
    }
  });
}
