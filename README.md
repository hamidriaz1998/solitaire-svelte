# Solitaire Game

A modern implementation of the classic Solitaire (Klondike) card game built with Svelte, TypeScript, and TailwindCSS. This project features a clean design with smooth animations, drag-and-drop gameplay, and a complete scoring system.

![Solitaire Game Screenshot]
*(screenshot.png)*

## Features

- 🎮 Classic Solitaire gameplay
- 🎯 Complete scoring system
- ⏱️ Game timer
- 🔄 Undo/Redo functionality
- 🖱️ Drag-and-drop card movement
- 💫 Smooth animations
- 🎨 Modern UI with TailwindCSS

## Getting Started

### Prerequisites

This project is built using Deno with Vite and Svelte. While the application will run with Node.js, Deno is required for running tests.

Required:
- Deno 2.0.0 or higher
- Node.js 18 or higher
- npm, pnpm, or yarn package manager

Optional:
- VS Code with Deno extension for the best development experience

### Installation

1. Clone the repository:
```bash
git clone https://gitlab.com/hamidriaz1999/csc200m24pid10.git
cd solitaire
```

2. Install dependencies:
```bash
deno install
deno install --allow-scripts=npm:svelte-preprocess@5.1.4
# or
npm install
# or
pnpm install
```

3. Start the development server:
```bash
deno task dev
# or
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
deno task build
# or
npm run build
# or
pnpm build
```

## Game Rules

### Objective
The goal is to move all cards to the foundation piles, building up each suit from Ace to King.

### Scoring System
- Moving cards from waste to foundation: +10 points
- Moving cards from waste to tableau: +5 points
- Moving cards from tableau to foundation: +10 points
- Turning over a tableau card: +5 points
- Moving cards from foundation to tableau: -15 points
- Recycling the waste pile: -100 points

## Technology Stack

- **Frontend Framework**: Svelte
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Testing**: Deno Test

## Project Structure

```
solitaire/
├── src/
│   ├── components/      # Svelte components
│   ├── gameLogic/      # Game logic classes
│   ├── stores/         # Svelte stores
│   ├── DataStructures/ # Custom data structures
│   └── tests/          # Test files
├── public/             # Static assets
└── ...config files
```

## Testing
Tests are written using Deno's built-in test framework. Make sure you have [Deno installed](https://docs.deno.com/runtime/manual/getting_started/installation) before running tests.

The project includes comprehensive tests for the game logic and data structures. To run the tests:

```bash
deno test
```

## Dependencies

### Main Dependencies
- Svelte
- TypeScript
- TailwindCSS

### Development Dependencies
- Deno or Node
- Vite
- PostCSS
- Autoprefixer

## Todos

- [ ] Make the design responsive for mobile devices
  - [ ] Optimize card layouts for smaller screens
  - [ ] Add touch-friendly controls
  - [ ] Adjust font sizes and spacing
  - [ ] Test on various mobile devices

- [ ] Migrate to Svelte 5
  - [ ] Review breaking changes and migration guide
  - [ ] Update dependencies and configuration
  - [ ] Refactor components to use new syntax
  - [ ] Test thoroughly after migration

- [ ] Additional features
  - [ ] Add hints
  - [ ] Save game state to localStorage
  - [ ] Implement high score system