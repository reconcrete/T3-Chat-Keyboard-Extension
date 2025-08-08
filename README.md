# T3 Chat Keyboard Extension

Enhances keyboard accessibility and introduces a lightweight command palette for T3 Chat — an AI chat that lets you make requests to providers like OpenAI, Google, and Anthropic. This extension only runs on T3 Chat and is built with TypeScript and Manifest V3.

## Idea

- Keyboard-first navigation on T3 Chat.
- A simple command palette concept (inspired by VS Code) so you can write commands to trigger actions.
- Current behaviors:
  - When the T3 Chat search input is focused, pressing Arrow Down moves focus to the first menu item.
  - Pressing Command+Shift+K inserts a `>` into the active input field to begin a command. This is a foundation you can extend to parse and run custom commands.

## Build and Load in Chrome

Requirements:

- Node.js (LTS recommended)
- Chrome or other browser that supports Chrome extensions

Steps:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build (outputs to `dist/`):
   ```bash
   npm run build
   ```
   Or run in watch mode during development:
   ```bash
   npm run dev
   ```
3. Load in Chrome:
   - Open `chrome://extensions` (or other bowser).
   - Enable "Developer mode" (top right).
   - Click "Load unpacked" and select the `dist` folder.

