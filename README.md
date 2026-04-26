# Affari Tuoi

An interactive web application for the "Affari Tuoi" (Your Affairs) game - a team-based game with red and blue packs.

## 🎮 Game Description

Affari Tuoi is an interactive game involving two teams (Red and Blue) with 10 packs each. The game includes special events like "Chiamata" (Call) and "Sfida" (Challenge) that can be activated from the control panel.

### Main Features

- **Two prizes polls**: Red and Blue, each with 10 packs
- **Control Panel**: Interface to manage the game state
- **Special Events**: Call and Challenge with visual overlays
- **Real-time State**: Automatic updates every 3 seconds
- **Game Reset**: Ability to completely reset the game

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.12.0

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd affari-tuoi
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to `http://localhost:4321`

## 📁 Project Structure

```
/
├── public/
│   └── telefono.jpg          # Image for the "call" event
├── src/
│   ├── actions/
│   │   └── index.ts          # Server actions (Astro Actions)
│   ├── layout/
│   │   └── MainLayout.astro  # Main layout
│   ├── pages/
│   │   ├── index.astro       # Main game page
│   │   ├── control.astro     # Control panel
│   │   └── manual-reset.astro # Manual reset
│   ├── stateType.ts          # TypeScript types for game state
│   └── styles/
│       └── global.css        # Global styles
├── astro.config.mjs          # Astro configuration
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## 🎯 How to Play

### For Players
- Go to the main page (`/`)
- Observe special events when they are activated

### For the Game Master
- Go to the control panel (`/control`)
- Use the "Chiamata" and "Sfida" buttons to activate events
- Manage opening/closing of individual packs
- Use "RESET DEL GIOCO" to start over

## 🛠️ Technologies Used

- **Astro**: Web framework for content-driven websites
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: JavaScript with static typing
- **Astro Actions**: API endpoints for server-side actions

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the local build |

## 📄 License

This project is distributed under the MIT license.
