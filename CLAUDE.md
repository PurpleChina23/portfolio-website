# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React portfolio website built with Vite, featuring advanced animations and scroll-based interactions. The project showcases Michael Chen's work as a data/AI professional with interactive visual effects.

## Development Commands

```bash
# Start development server (port defaults to Vite's auto-assigned port)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

All commands should be run from the `react-portfolio/` directory, not the root.

## Architecture Overview

### Core Technologies
- **React 19.1** with JSX (not TypeScript for components)
- **Vite 7.1** as build tool
- **Tailwind CSS 4.1** for styling
- **Framer Motion** for component animations
- **GSAP with ScrollTrigger** for scroll-based animations
- **Material-UI (MUI)** for Timeline components
- **Three.js** with React Three Fiber for 3D graphics (installed but not actively used in current implementation)

### Project Structure

```
react-portfolio/
├── src/
│   ├── App.jsx              # Main application component with all sections
│   ├── App.css              # Global styles and section-specific CSS
│   ├── index.css            # Tailwind imports and base styles
│   ├── main.jsx             # Entry point
│   ├── components/          # All reusable components
│   │   ├── ScrollImageSequence.jsx   # Canvas-based frame sequence player
│   │   ├── BlogHorizontalScroll.jsx  # GSAP horizontal scroll section
│   │   ├── RoadMapTimeline.jsx       # MUI Timeline for career/education
│   │   ├── GooeyNav.jsx              # Animated sticky navigation
│   │   ├── LoadingScreen.jsx         # Initial page loader
│   │   └── [various animation components]
│   └── lib/
│       └── utils.ts          # Utility functions (Tailwind merge)
├── public/
│   ├── frames/               # Image sequence frames for scroll animation
│   └── frame-extractor.html  # Utility to extract frames from video
└── vite.config.js            # Vite config with @ alias to ./src
```

### Key Architectural Patterns

**1. Scroll-Controlled Background**
- Uses `ScrollImageSequence` component to render video-like backgrounds via canvas
- Preloads image frames (301 frames in `/public/frames/`)
- Frame rendering tied to scroll position for smooth parallax effect
- Frame naming: `frame_0001.jpg` through `frame_0301.jpg`

**2. Section-Based Layout**
- Single-page application with scroll-based sections
- Sections: Hero, About, Projects (horizontal scroll), Career/Roadmap, Tech Stack, Contact
- `IntersectionObserver` used for scroll-triggered animations on blog cards

**3. Animation Strategy**
- **GSAP ScrollTrigger**: Used for `BlogHorizontalScroll` component (horizontal scrolling section with pinned scroll)
- **Framer Motion**: Used for individual component animations (text effects, hover states)
- **CSS Animations**: Custom keyframe animations in `App.css`
- Components handle their own animation logic (self-contained)

**4. Navigation System**
- `GooeyNav` component: Fixed position, morphing navigation with smooth transitions
- Hash-based routing (`#home`, `#about`, etc.) for section navigation
- Navigation items defined inline in App.jsx

## Important Implementation Details

### Image Sequence Setup
- Frames must be named: `frame_XXXX.jpg` (4-digit zero-padded)
- Place frames in `/public/frames/` directory
- Use `frame-extractor.html` tool to extract frames from video files
- Update `frameCount` prop in `App.jsx` if frame count changes

### Component Conventions
- Most components are `.jsx` (not TypeScript)
- Components include their own CSS files (e.g., `ComponentName.css`)
- Animation components are generally stateless and accept props for customization
- Use `@/` alias for imports from src (configured in Vite)

### Styling Approach
- Tailwind for utility classes
- Component-specific CSS modules for complex animations
- Global styles in `App.css` and `index.css`
- Material-UI components styled via `sx` prop and custom CSS classes

### ESLint Configuration
- Configured for React 19 with Hooks and Refresh plugins
- Allows uppercase variables without "unused vars" warnings
- Target: ES2020 with latest ECMAScript features

## Common Workflows

**Adding a new animated component:**
1. Create component file in `src/components/`
2. Create corresponding CSS file if needed
3. Import and use in `App.jsx`
4. Use Framer Motion for simple animations, GSAP for scroll-based effects

**Updating the background sequence:**
1. Place video in `/public/` directory
2. Open `/public/frame-extractor.html` in browser
3. Upload video and extract frames
4. Download zip, extract to `/public/frames/`
5. Update `frameCount` in `App.jsx` ScrollImageSequence component

**Modifying sections:**
- All sections are defined in `App.jsx`
- Section IDs correspond to navigation hrefs
- Update both `GooeyNav` items and section IDs together
