import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Home from "../pages/Home/Home.jsx";
import CardSelection from "../pages/CardSelection/CardSelection.jsx";
import MapSelection from "../pages/ColonyMap/MapSelection.jsx";
import PlotDetailsPage from "../components/PlotDetailsPage.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import PlotMap from "../pages/MapSelection/PlotMap.jsx";
import StatsPage from "../pages/Home/StatsPage.jsx";
import PlansPage from "../pages/PlansPage.jsx";
import WhyUsPage from "../pages/Home/WhyUsPage.jsx";
import LawyerPage from "../pages/Home/LawyerPage.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx"; // ✅ import PrivateRoute

const AppRouter = () => {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/whyus" element={<WhyUsPage />} />
            <Route path="/lawyers" element={<LawyerPage />} />

            {/* ✅ Private Routes (Require Auth) */}
            <Route
              path="/cards"
              element={
                <PrivateRoute>
                  <CardSelection />
                </PrivateRoute>
              }
            />
            <Route
              path="/map"
              element={
                <PrivateRoute>
                  <MapSelection />
                </PrivateRoute>
              }
            />
            <Route
              path="/plot"
              element={
                <PrivateRoute>
                  <PlotMap />
                </PrivateRoute>
              }
            />
            <Route
              path="/plot/:plotId"
              element={
                <PrivateRoute>
                  <PlotDetailsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
