# Skip-Select 🗑️

A modern **Next .js 15** demo that lets users choose the perfect skip size—animated, theme-aware, and fully responsive.

* **Framework**  Next .js 15 (App Router, Server/Client components)
* **Styling**    Tailwind CSS (`darkMode: "class"`)
* **State**      Zustand (theme + selected skip)
* **Animations** Framer-Motion
* **Icons**      Lucide-React

---

## ✨ Features

|             | Description |
| ----------- | ----------- |
| **Dark / Light theme** | One-click toggle, value stored in `localStorage`. |
| **Responsive UI** | Card grid (desktop) ➜ horizontal scroll (mobile). |
| **Step progress bar** | Animated header to match the original flow. |
| **Skeleton loading** | Pulse placeholders while fetching skips. |
| **Env-driven URLs** | API & image bases live in `.env`. |

---


## .env keys
| Key | Example |
| ----------- | ----------- 
**NEXT_PUBLIC_API_BASE** | https://app.wewantwaste.co.uk/api
**NEXT_PUBLIC_SKIP_IMAGE_BASE** | https://yozbrydxdlcxghkphhtq.supabase.co/…/skip-sizes/

## 🛠️ Scripts

| Script           | What it does                  |
| ---------------- | ----------------------------- |
| `npm run dev`    | Development server with HMR   |
| `npm run build`  | Production build              |
| `npm start`      | Run built app                 |
| `npm run lint`   | ESLint (Next core-web-vitals) |


## 🏗️ Folder layout

```
app/
├─ layout.tsx ← global CSS import & <ThemeToggle/>
└─ page.tsx ← renders <SkipSelector/>

components/
├─ Header/ ← progress steps
├─ Skip/ ← card + skeleton + overlay
containers
├─skip-selector (skip selector page)
hooks/
├─ useSkips.ts ← SWR fetch
└─ useTheme.ts ← Zustand theme hook
Interfaces
└─skip.ts ← Data type
store/
├─ skipStore.ts
└─ themeStore.ts
features
└─ ThemeProvider (next-themes)
└─.env
└─tailwind.config.js


