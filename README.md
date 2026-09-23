# Sports Leagues Frontend

🌍 **Live Demo**: [Play with the App on Vercel](https://sports-leagues-gray.vercel.app/)

A premium-designed Vue 3 application to explore hundreds of sports leagues from around the world, powered by TheSportsDB API.
Built with Vue 3 Composition API, Pinia, Tailwind CSS v4, and rigorously tested using Vitest (Unit) and Playwright (E2E).

## 🚀 Key Features

- **Modern Stack**: Vue 3 (Composition API), Vite, TypeScript.
- **State Management**: Pinia (focusing on performance and smart caching).
- **Premium Aesthetics**: Tailwind CSS v4, micro-interactions, smooth transitions, and refined shadows.
- **Mobile First**: Fully responsive, fluid, and touch-friendly layout.
- **Dark Mode**: Light/Dark theming with automatic `localStorage` persistence.
- **Error Simulation (Debug)**: Built-in debug tools to test UI resilience in case of API downtime (500 Error) or corrupted data reception (missing fields or badges).
- **Quality Assurance**: Developed via TDD (Test Driven Development) with in-depth Unit tests (Vitest) and comprehensive End-to-End tests (Playwright).

## 🐞 Errors Simulation Feature

A unique "Errors Simulation" control panel is integrated directly into the application's top navigation bar (visible on desktop). This allows you to easily test the application's robust error boundaries without needing to manually break the code:
- **500 Error**: Instantly simulates a complete network loss or a `500 Internal Server Error`, triggering the application's graceful error state.
- **Bad Data**: Injects malformed league data (missing required properties like sport type or images) into the store to verify UI resilience and fallback mechanisms.
- **Normal**: Immediately resets the state to fetch real, healthy data.

## 🛠 Setup & Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🧪 Testing & Validation

The app was built with robustness as a priority:
- **Unit Tests (Vitest)**: Run `npm run test:unit`. They cover the API services, Theme Composable, Pinia Store, and Vue Components rendering.
- **Unit Tests UI**: Run `npm run test:unit:ui` to open the Vitest dashboard in your browser.
- **End-to-End Tests (Playwright)**: Run `npm run test:e2e` to simulate real user flows (searching, toggling themes, 500 error fallback).
- **E2E Tests UI**: Run `npm run test:e2e:ui` to open the visual Playwright inspector.
- **Type-Check & Linting**: Run `npm run type-check` and `npm run lint` for a flawless codebase.

## 🧠 Architectural Decisions
- **Logo Caching (Lazy Loading)**: To save bandwidth and speed up the app, league badges are fetched *on-demand* (only on click) and cached in the Pinia Store for subsequent clicks.
- **Independent Composables**: Dark Mode is managed via a dedicated *Composable* (`useTheme.ts`) completely decoupled from Pinia, ensuring reusability across other Vue projects without dependencies (inspired by the `VueUse` approach).
- **No Heavy Assets**: Exclusive use of the official *Material Symbols* font for lightweight and crisp icons, avoiding the clutter of unnecessary SVG or image files.

## ⏱️ Time Management & Trade-offs

The development of this application took approximately **103 minutes** (1 hour and 43 minutes), slightly exceeding the 90-minute target. 

This conscious trade-off of ~13 extra minutes was made to deliver a **production-ready, Senior-level product** rather than a bare minimum MVP. The extra time was heavily invested in:
1. **Total Test Coverage**: Setting up and writing 21/21 passing Unit and E2E tests.
2. **UI Resilience (Error Boundaries)**: Implementing the custom *Errors Simulation* tool and graceful fallbacks for missing/corrupted data.
3. **Premium Aesthetics**: Polishing the UI with Glassmorphism, smooth micro-interactions (`active:scale`, Vue `<Transition>`), and a pixel-perfect custom 3D Favicon.
