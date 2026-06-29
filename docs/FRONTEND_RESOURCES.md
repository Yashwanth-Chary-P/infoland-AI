# FRONTEND RESOURCES & MASTER GUIDELINES

This is the single source of truth for the InfoLand AI frontend redesign. 

## Product Vision
InfoLand AI is an **AI-Powered Property Verification & Property Intelligence Platform**. 
Its core objective is: *"Determine whether a property is legally, financially and ownership-wise safe before purchase."*

## Target Users
- Homebuyers conducting due diligence
- Real Estate Investors assessing risk
- Legal Professionals verifying property history
- Financial Institutions evaluating loan safety

## Information Architecture & Final Sitemap
- **`/` (Home):** Product Story, Verification Workflow, Platform Stats.
- **`/explore` (Explore):** Core search engine, interactive map, advanced filters.
- **`/property/:id` (Property Details):** Professional intelligence report.
- **`/insights` (Dataset Insights):** Aggregated platform dataset statistics.
- **`/dashboard` (Dashboard):** User's saved properties, active verifications, intelligence alerts.
- **`/about` (About):** Mission, Data Methodology.
- **`/contact` (Contact):** Enterprise sales, Support.
- **`/login` | `/register` (Auth):** Secure access.

## Design Philosophy & Visual Identity
Target Inspiration: **Linear, Vercel, Stripe, Notion, GitHub, Arc Browser, Palantir.**
Keywords: *Modern, Enterprise, Minimal, Elegant, Data-first, Professional, Premium.*

### Color Palette
- **Primary:** Professional Blue (Trust, Security)
- **AI Accent:** Deep Purple (Intelligence, Future Tech)
- **Background:** Very Light Gray (Clean, Minimalist SaaS)
- **Cards/Surfaces:** Solid White (Focus on data)
- **Success:** Green (Verified, Safe)
- **Warning:** Amber (Caution, Missing Data)
- **Danger:** Red (High Risk, Disputes)

### Typography & Spacing
- **Font:** Inter or similar modern sans-serif.
- **Hierarchy:** Clear distinction between H1, H2, H3, and body text.
- **Spacing:** Tailwind's default spacing scale (`rem`-based), preferring generous padding for a clean, uncluttered layout.
- **Grid System:** CSS Grid and Flexbox layouts standardizing 12-column layouts where applicable.

### UI Component Guidelines
- **Cards:** Minimal borders, subtle shadows on hover, stark white backgrounds.
- **Buttons:** Sharp or slightly rounded corners, solid colors for primary actions, subtle ghost buttons for secondary actions.
- **Forms/Inputs:** Clean borders, clear focus states (blue ring), inline validation.
- **Tables:** Data-dense, sticky headers, hover rows, clearly separated columns.
- **Status Badges:** Pill-shaped, subtle background colors with strong text colors based on status (Success, Warning, Danger).
- **Icons & Illustrations:** Minimalist line-art SVG icons (e.g., Lucide or Heroicons). No cartoonish illustrations.

## Search & Filter Experience
- **Global Search:** Sticky search bar, `Cmd+K` / `Ctrl+K` shortcut, live suggestions.
- **Filters:** Property Type, Region, Risk Level, Verification Status, Document Availability.
- **Layout:** Split view (Interactive Map on left/right, List/Grid on the opposite side).

## Data Strategy & Real Dataset Statistics
**NEVER INVENT DATA.**
1. **Actual Dataset Engine Statistics:** Pull real metrics (e.g., 1633 Properties, 29394 Documents, 65 Court Disputes, 294 Loans).
2. **Industry Statistics:** Must include citations from trusted government, research, court, or industry sources.

## Animation Guidelines
- **Philosophy:** Professional only. No excessive bouncing or flashing.
- **Transitions:** Smooth page fades, subtle layout shifts (Framer Motion recommended).
- **Interactions:** Card lift on hover, button press states, navbar background blur on scroll.
- **Loading States:** Skeleton loaders matching the component shape instead of generic spinners.
- **Empty States:** Clear, helpful empty state graphics with calls to action.
- **Error States:** Professional apologies with retry buttons.

## Responsive & Accessibility Rules
- **Responsive:** Mobile-first approach. Complex tables should scroll horizontally on mobile. The map view must gracefully degrade or act as a toggle button on small screens.
- **Accessibility:** WCAG 2.1 AA compliance. Proper ARIA roles, semantic HTML, and >4.5:1 color contrast ratios.

## Coding Standards & Folder Structure
```text
src/
├── components/
│   ├── common/      (Buttons, Inputs, Cards)
│   ├── layout/      (Navbar, Footer, Sidebar)
│   └── specific/    (SearchFilters, PropertyTimeline)
├── pages/           (Home, Explore, PropertyDetails, Insights)
├── hooks/           (Custom React hooks)
├── store/           (Redux slices)
├── services/        (API calls)
├── utils/           (Helpers, formatting)
└── styles/          (Global CSS, Tailwind config)
```
- **Component Naming:** PascalCase (`PropertyCard.jsx`).
- **CSS:** Utilize Tailwind utility classes.
- **Performance:** Code splitting via React.lazy() for heavy routes and map components.
- **SEO:** Use React Helmet for dynamic meta tags and proper heading structures per page.

## Professional Copywriting Guidelines
- Tone: Authoritative, secure, intelligent, and clear.
- Avoid marketing fluff. State facts and data.

## Future Roadmap
- Integration of **FastAPI AI Layer** (LangChain, ChromaDB).
- AI Assistant chat interface for natural language property queries.
