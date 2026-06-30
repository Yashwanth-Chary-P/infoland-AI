import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import AppLayout from "../components/layout/AppLayout.jsx";

// Public Pages
import Home from "../pages/Home/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import PlotMap from "../pages/MapSelection/PlotMap.jsx";

// Routing Utilities
import PrivateRoute from "./PrivateRoute.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

// Lazy-loaded Pages (Core Application)
const Explore = React.lazy(() => import("../pages/Explore/Explore.jsx"));
const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard.jsx"));
const Insights = React.lazy(() => import("../pages/Insights/Insights.jsx"));
const PropertyReport = React.lazy(() => import("../pages/PropertyReport/PropertyReport.jsx"));

const AppRouter = () => {
  return (
    <Router>
      <AppLayout>
        <Suspense fallback={
          <div className="flex-1 flex justify-center items-center h-[60vh]">
            <LoadingSpinner message="Loading..." />
          </div>
        }>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/plot" element={<PlotMap />} />

            {/* Private Routes (Require Auth) */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* 
              Renamed from /plot/:plotId to /property/:plotId as per architecture.
              Using the new Module 03 Property Intelligence Report.
            */}
            <Route
              path="/property/:plotId"
              element={
                <PrivateRoute>
                  <PropertyReport />
                </PrivateRoute>
              }
            />

            {/* 
              Deprecated Routes (Removed from Router):
              - /plans -> PlansPage.jsx
              - /whyus -> WhyUsPage.jsx
              - /lawyers -> LawyerPage.jsx
              - /stats -> StatsPage.jsx
              - /cards -> CardSelection.jsx
              - /map -> MapSelection.jsx
              - /plot -> PlotMap.jsx
              
              Files are kept in the project for rollback purposes but are no longer accessible.
            */}
          </Routes>
        </Suspense>
      </AppLayout>
    </Router>
  );
};

export default AppRouter;
