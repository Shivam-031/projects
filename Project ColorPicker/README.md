# 🎨 Chroma — Color Tools

A sleek, single-page color utility built with plain HTML, CSS, and JavaScript. Chroma bundles three everyday color tools — **live hex preview**, **gradient builder**, and **palette generator** — into one fast, no-dependency app with a modern dark glassmorphism UI.

![Chroma preview screenshot](./assets/screenshot-preview.png)

## ✨ Features

- **Live Color Preview** — Type any valid CSS color (hex, `rgb()`, or named color) and see it rendered instantly, with inline validation for invalid input.
- **Gradient Builder** — Click either color stop to roll a new random shade, preview the gradient live, and copy the generated CSS with one click.
- **Palette Generator** — Shuffle a fresh set of 4 random hex colors and click any swatch to copy its code, with a "Copied!" confirmation overlay.
- **Reactive Ambient Background** — A soft background glow shifts to match whatever colors are currently active across the app.
- **Toast Notifications** — Clean, non-intrusive feedback for every copy action.
- **Fully Accessible** — Keyboard-navigable tabs and controls, visible focus states, and `prefers-reduced-motion` support.
- **Zero Dependencies** — A single `index.html` file. No build step, no frameworks, no installs.

## 🚀 Getting Started

Just open the file in your browser:

```bash
git clone https://github.com/<your-username>/chroma-color-tools.git
cd chroma-color-tools
open index.html   # or double-click the file
```

No build tools, package managers, or servers required.

## 🛠️ Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, glassmorphism, transitions & animations
- **Vanilla JavaScript** — no frameworks, no libraries
- **Fonts** — [Sora](https://fonts.google.com/specimen/Sora), [Inter](https://fonts.google.com/specimen/Inter), and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts

## 📂 Project Structure

```
.
├── index.html      # entire app — markup, styles, and logic
└── assets/
    └── screenshot-preview.png
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the repo and submit a PR.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
