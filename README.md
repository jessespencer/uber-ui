# Uber UI

> A skeuomorphic, iOS-inspired component library — designed in Figma, built with React, TypeScript, and Tailwind CSS.

**[Live Demo](https://jessespencer.github.io/uber-ui/)** | **[Dribbble](https://dribbble.com/shots/10826325-Uber-Dark-UI-Kit)** | **[Figma Community File](https://www.figma.com/community/file/824492970627116776)**

## The Story

Back in 2012, when skeuomorphic design reigned supreme, I built one of my first UI Kits in Photoshop *(remember those?)*. Eight years later — March 2020, deep in Covid lockdown with nowhere to go — I finally rebuilt it in Figma.

Then in March 2026, something clicked. With Figma MCP + Claude Code, I could take those designs and generate real React components directly from the source. Eight years between Photoshop and Figma. Six years between Figma and this.

What started as a quarantine project is now a live demonstration of where design-to-code is heading: **from Figma, through AI, straight to production-ready frontend code.**

## Features

- 🎨 Skeuomorphic, iOS-inspired design system
- ⚛️ Built with React + TypeScript
- 💨 Styled with Tailwind CSS
- 🌗 Full dark / light theme support
- 🔌 Generated via Figma MCP → Claude → React

## Tech Stack

| Tool | Role |
|------|------|
| Figma | Design source |
| Figma MCP + Claude | Design-to-code pipeline |
| React + TypeScript | Component framework |
| Tailwind CSS | Styling |

## Components

- **Button** — Multi-variant with hover, focus, active, and pressed states
- **Switch** — Toggle with ON/OFF text and polished knob
- **RockerToggle** — Two-position rocker switch (O/| symbols)
- **Dropdown** — Searchable dropdown menu
- **SearchInput** — Styled text input with search icon
- **Checkbox** — Custom styled checkbox
- **Pagination** — Page navigation controls
- **Slider** — Range input with custom track/thumb
- **SegmentedControl** — Tab-like selector (text or icon variants)
- **Toast** — Status notifications (success, error, warning, info)
- **Tooltip** — Contextual hover tooltips
- **Icons** — Custom SVG icon set (Home, Bolt, Star, Bell, and more)

## Getting Started

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/uber-ui/`

## Scripts

| Command | Description |
|------|------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Deployment

Automatically deployed to GitHub Pages on push to `main` via GitHub Actions.
