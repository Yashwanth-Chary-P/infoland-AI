import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import AppLayout from "../components/layout/AppLayout.jsx";

// Lazy-loaded Pages (Core Application)
const Explore = React.lazy(() => import("../pages/Explore/Explore.jsx"));
const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard.jsx"));
const Insights = React.lazy(() => import("../pages/Insights/Insights.jsx"));
const PropertyReport = React.lazy(() => import("../pages/PropertyReport/PropertyReport.jsx"));

// Lazy-loaded Public Pages
const Home = React.lazy(() => import("../pages/Home/Home.jsx"));
const About = React.lazy(() => import("../pages/About.jsx"));
const Contact = React.lazy(() => import("../pages/Contact.jsx"));
const Login = React.lazy(() => import("../components/Login.jsx"));
const Register = React.lazy(() => import("../components/Register.jsx"));
const PlotMap = React.lazy(() => import("../pages/MapSelection/PlotMap.jsx"));
const NotFound = React.lazy(() => import("../pages/Error/NotFound.jsx"));
const ServerError = React.lazy(() => import("../pages/Error/ServerError.jsx"));
import RouteProgress from "../components/common/RouteProgress.jsx";

// Routing Utilities
import PrivateRoute from "./PrivateRoute.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";


const AppRouter = () => {
  return (
    <Router>
      <RouteProgress />
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
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </Router>
  );
};

export default AppRouter;
