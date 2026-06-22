# InfoLand Portal - Frontend

A modern, interactive land information and construction recommendation platform built with React. This frontend application provides comprehensive plot data visualization, interactive mapping, and AI-driven construction recommendations for land development projects.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [Key Components](#key-components)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling](#styling)
- [Available Pages](#available-pages)
- [Build & Deployment](#build--deployment)

## 🎯 Overview

InfoLand Portal is a Phase-1 frontend-only implementation that showcases land plot information, ownership details, soil analysis, and construction suitability recommendations. The platform helps users make informed decisions about land development through interactive visualizations and detailed plot analytics.

### Key Highlights

- **Interactive Plot Visualization**: Browse plots through card-based and map-based interfaces
- **Comprehensive Plot Data**: View ownership, soil type, area, suitability, and construction recommendations
- **Interactive Maps**: Explore plots using SVG colony maps and Leaflet-based geographical maps
- **Modern UI/UX**: Built with TailwindCSS and Framer Motion for smooth animations
- **State Management**: Redux Toolkit for efficient state management
- **Responsive Design**: Fully responsive layout optimized for all device sizes

## ✨ Features

### Core Features

1. **Plot Exploration**
   - Card-based plot selection (`/cards`)
   - Interactive SVG colony map (`/map`)
   - Leaflet-based geographical map (`/plot`)
   - Detailed plot information pages

2. **Plot Information**
   - Plot ID and ownership (Government/Private)
   - Soil type analysis (Loamy, Sandy, Clay)
   - Area measurements (sq ft)
   - Suitability classification (Residential, Industrial, Commercial, Community, Park/Public)
   - Construction recommendations with builder suggestions

3. **Interactive Maps**
   - SVG-based colony layout map with 21 plots (127-147)
   - Clickable plot areas with hover effects
   - Leaflet integration for real-world geographical mapping
   - OpenStreetMap tile integration

4. **Land Verification Services**
   - Background verification plans
   - Legal document validation
   - Government record matching
   - Lawyer certification

5. **Additional Pages**
   - Statistics and insights
   - Service plans and pricing
   - About and contact information
   - Lawyer recommendations
   - Why choose InfoLand section

## 🛠 Technology Stack

### Core Dependencies

- **React 18.2.0** - UI library
- **React DOM 18.2.0** - React rendering
- **React Router DOM 6.20.1** - Client-side routing
- **Redux Toolkit 2.0.1** - State management
- **React Redux 9.0.4** - React bindings for Redux

### UI & Styling

- **TailwindCSS 3.3.6** - Utility-first CSS framework
- **Framer Motion 12.23.24** - Animation library
- **Lucide React 0.294.0** - Icon library

### Mapping

- **Leaflet 1.9.4** - Interactive maps
- **React Leaflet 4.2.1** - React components for Leaflet

### Development Tools

- **Vite 5.0.0** - Build tool and dev server
- **ESLint** - Code linting
- **PostCSS 8.4.32** - CSS processing
- **Autoprefixer 10.4.16** - CSS vendor prefixing

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   └── store.js                 # Redux store configuration
│   ├── components/
│   │   ├── Navbar.jsx               # Navigation bar component
│   │   ├── Footer.jsx               # Footer component
│   │   ├── PlotCard.jsx             # Individual plot card component
│   │   └── PlotGrid.jsx             # SVG colony map component
│   ├── features/
│   │   └── plots/
│   │       └── plotsSlice.js        # Redux slice for plots state
│   ├── pages/
│   │   ├── Home.jsx                 # Landing page
│   │   ├── CardSelection.jsx        # Card-based plot selection
│   │   ├── MapSelection.jsx         # SVG map-based selection
│   │   ├── PlotMap.jsx              # Leaflet geographical map
│   │   ├── PlotDetailsPage.jsx      # Individual plot details
│   │   ├── About.jsx                # About page
│   │   ├── Contact.jsx              # Contact page
│   │   ├── StatsPage.jsx            # Statistics page
│   │   ├── PlansPage.jsx            # Service plans page
│   │   ├── WhyUsPage.jsx            # Why choose us page
│   │   ├── LawyerPage.jsx           # Lawyer recommendations
│   │   ├── LandInfoSidebar.jsx      # Land information sidebar
│   │   └── CSS/
│   │       ├── PlotMap.css          # Plot map styles
│   │       └── Sidebar.css          # Sidebar styles
│   ├── App.jsx                      # Main app component with routing
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles
├── dist/                            # Build output directory
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.cjs              # TailwindCSS configuration
└── postcss.config.js                # PostCSS configuration
```

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** package manager

### Installation Steps

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The application will be available at `http://localhost:5173` (or the port shown in terminal)

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Server

The development server runs on `http://localhost:5173` by default. It includes:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- Automatic browser reload on file changes

## 🧩 Key Components

### Navbar Component

- Fixed navigation bar with backdrop blur
- Responsive design with mobile support
- Active route highlighting
- Navigation to: Home, Stats, Why Us, Lawyers, Plans, About, Contact

### PlotCard Component

- Displays plot information in a card format
- Shows plot ID, owner, soil type, area, and suitability
- Lists construction recommendations
- Color-coded ownership badges (Government/Private)

### PlotGrid Component

- Interactive SVG-based colony map
- 21 clickable plots (127-147)
- Visual distinction between Government and Private plots
- Click handlers for plot selection
- Legend for plot types

### PlotMap Component

- Leaflet-based geographical map
- OpenStreetMap tile integration
- Click-to-fetch land polygon data
- Sidebar with land information
- Integration with Overpass API for land data

## 🔄 State Management

### Redux Store Structure

The application uses Redux Toolkit for state management:

```javascript
{
  plots: {
    plots: Array,           // Array of plot objects
    selectedPlotId: Number  // Currently selected plot ID
  }
}
```

### Plot Data Structure

Each plot object contains:
```javascript
{
  plotId: Number,              // Plot identifier (127-147)
  owner: String,               // "Govt" or "Private"
  soilType: String,            // "Loamy", "Sandy", or "Clay"
  area: Number,                // Area in square feet
  suitability: String,         // "Residential", "Industrial", etc.
  recommendations: Array       // Array of construction recommendations
}
```

### Redux Actions

- `selectPlot(plotId)` - Select a plot and update state
- `clearSelection()` - Clear the current selection

## 🗺 Routing

The application uses React Router DOM for client-side routing:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with features and navigation |
| `/cards` | CardSelection | Browse plots in card grid layout |
| `/map` | MapSelection | Interactive SVG colony map |
| `/plot` | PlotMap | Leaflet geographical map |
| `/plot/:plotId` | PlotDetailsPage | Individual plot details |
| `/about` | About | About page |
| `/contact` | Contact | Contact form and information |
| `/stats` | StatsPage | Statistics and insights |
| `/plans` | PlansPage | Service plans and pricing |
| `/whyus` | WhyUsPage | Why choose InfoLand |
| `/lawyers` | LawyerPage | Lawyer recommendations |

## 🎨 Styling

### TailwindCSS Configuration

The application uses TailwindCSS with custom configuration:

- **Custom Colors**:
  - `gov-fill`: Government plot fill color
  - `priv-fill`: Private plot fill color
  - `plot-boundary`: Plot boundary color
  - `road`: Road color
  - `park-fill`: Park fill color

- **Custom Fonts**: Inter, Roboto, Poppins

### CSS Variables

Global CSS variables defined in `index.css`:
```css
--gov-fill: #e8f5e8
--priv-fill: #f0f8ff
--plot-boundary: #4a5568
--road: #6b7280
--park-fill: #f0fdf4
```

### Animations

- Framer Motion for page transitions and component animations
- CSS transitions for hover effects and interactions
- Smooth scrolling and transform effects

## 📄 Available Pages

### Home Page (`/`)

- Hero section with platform introduction
- Feature highlights
- Navigation cards to different plot selection methods
- Statistics section
- Why choose InfoLand section
- Lawyer testimonials
- Trust banner

### Card Selection Page (`/cards`)

- Grid layout of all available plots
- Plot cards with key information
- Quick access to plot details
- Filter and search capabilities (future enhancement)

### Map Selection Page (`/map`)

- Interactive SVG colony map
- Clickable plot areas
- Visual plot boundaries
- Legend for plot types
- Navigation to plot details

### Plot Map Page (`/plot`)

- Leaflet geographical map
- OpenStreetMap integration
- Click to fetch land data
- Sidebar with land information
- Integration with Overpass API

### Plot Details Page (`/plot/:plotId`)

- Comprehensive plot information
- Owner, soil type, area, suitability
- Construction recommendations
- Builder suggestions
- Navigation options

### Additional Pages

- **About**: Platform mission and technology stack
- **Contact**: Contact form and business information
- **Stats**: Land transaction statistics and insights
- **Plans**: Service plans and pricing tiers
- **Why Us**: Platform benefits and features
- **Lawyers**: Legal expert recommendations

## 🏗 Build & Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Build Output

The build process:
- Bundles and minifies JavaScript
- Optimizes CSS
- Processes images and assets
- Generates source maps (for debugging)

### Deployment

The `dist/` directory can be deployed to:
- **Static hosting** (Netlify, Vercel, GitHub Pages)
- **CDN** (CloudFlare, AWS CloudFront)
- **Web server** (nginx, Apache)

### Environment Variables

Currently, no environment variables are required. Future enhancements may include:
- API endpoints
- Map API keys
- Analytics IDs

## 📊 Plot Data

The application includes 21 plots (127-147) with the following distribution:

- **Block A**: Plots 127-132 (6 plots)
- **Block B**: Plots 133-142 (10 plots)
- **Block C**: Plots 143-147 (5 plots)

### Plot Types

- **Government Plots**: 7 plots
- **Private Plots**: 14 plots

### Soil Types

- Loamy: 9 plots
- Sandy: 7 plots
- Clay: 5 plots

### Suitability Categories

- Residential: 10 plots
- Industrial: 5 plots
- Commercial: 2 plots
- Community: 3 plots
- Park/Public: 1 plot

## 🔮 Future Enhancements

### Planned Features

1. **Backend Integration**
   - API endpoints for plot data
   - Real-time data updates
   - User authentication
   - Database integration

2. **Advanced Features**
   - Plot filtering and search
   - Comparison tool
   - Export functionality
   - Print-friendly views
   - PDF report generation

3. **User Features**
   - User accounts
   - Favorite plots
   - Plot history
   - Notifications
   - Booking system

4. **Analytics**
   - Usage analytics
   - Plot view tracking
   - User behavior insights
   - Performance monitoring

## 🤝 Contributing

This is a Phase-1 frontend-only implementation. Future contributions may include:
- Backend API development
- Database schema design
- Authentication system
- Payment integration
- Advanced mapping features

## 📝 License

This project is part of the InfoLand Portal platform.

## 👥 Support

For questions or support, please contact:
- Email: info@landinsightportal.com
- Phone: +1 (555) 123-4567

## 🙏 Acknowledgments

- OpenStreetMap for map tiles
- Leaflet for mapping library
- React community for excellent documentation
- TailwindCSS for utility-first CSS framework

---

**Built with ❤️ using React, Redux, and modern web technologies**

