# FRONTEND MODULE 03: Property Intelligence Experience

## 1. Goal
Build the core application experience where users search, filter, and deeply analyze properties. This replaces the old map/card prototype pages.

## 2. Business Objective
Provide a powerful, intuitive search and discovery tool that proves the value of the platform's intelligence capabilities.

## 3. UX Objective
Deliver a Google Maps-style split interface for exploration, and a professional, dense "Intelligence Report" for individual properties.

## 4. Pages Covered
- `Explore` (Replacing CardSelection, MapSelection, PlotMap)
- `Property Details` (Replacing PlotDetailsPage)

## 5. Components Covered
- `SplitLayout` (Map on one side, List on the other)
- `AdvancedFiltersPanel` (Region, Risk, Verification, Documents, Loans, Court Cases)
- `PropertyCard` (Premium card with status badges)
- `InteractiveMap` (Custom map markers, clustering)
- `PropertyReportHeader`
- `PropertyDataTabs` (Overview, Verification, Ownership, Documents, Financial, Timeline, Insights)
- `SearchSuggestions` (Live dropdown for search inputs)

## 6. Design Decisions
- **Explore:** Must support both List and Grid views. Sticky search bar. Map UX must feel seamless and native.
- **Property Details:** Should NOT look like Zillow. It should look like a Palantir or Stripe data report. Heavy use of data tables, timelines, and status badges.
- **Future AI:** Include visual placeholders/hooks for the upcoming AI Assistant layer inside the property details.

## 7. Animations
- Smooth transitions between List/Grid views.
- Map marker hover states syncing with list item hover states.
- Skeleton loaders for property data fetching and search suggestions.

## 8. Backend Impact
- Requires robust Search and Filter APIs.
- Requires comprehensive Property Details endpoint delivering aggregated intelligence data.

## 9. Frontend Impact
- Heavy state management for filters and map coordinates.
- Integration with a mapping library (e.g., Google Maps API, Mapbox, or Leaflet).

## 10. Dependencies
- Mapping Provider API Keys.
- Redux Toolkit for complex filter state.

## 11. Deliverables
- Fully functional Explore page with Split Map UX.
- Comprehensive Property Intelligence Report page.

## 12. Success Criteria
- Users can filter properties by complex intelligence criteria (e.g., "Show me properties with no court cases").
- The Property Details page feels like a secure, professional document.

## 13. Estimated Complexity
High - Complex state management, map integration, and data-dense UI.

## 14. Estimated Development Order
1. Build `PropertyCard` and `AdvancedFiltersPanel`.
2. Integrate Mapping Library and build `SplitLayout`.
3. Wire up Search & Filter state.
4. Build `Property Details` layout and data sections.

## 15. Risks
- Map performance with large datasets. (Requires clustering).
- Filter state becoming out of sync with URL parameters. (Use URL-driven state where possible).

## 16. Professional Best Practices
- Sync active filters to the URL query string so searches can be shared/bookmarked.
- Use virtualization for long lists of property cards.
