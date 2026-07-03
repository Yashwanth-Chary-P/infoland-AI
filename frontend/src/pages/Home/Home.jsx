import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from './sections/HeroSection';
import ProblemStatement from './sections/ProblemStatement';
import IndustryStats from './sections/IndustryStats';
import PlatformStats from './sections/PlatformStats';
import VerificationWorkflow from './sections/VerificationWorkflow';
import FeaturesGrid from './sections/FeaturesGrid';
import DatasetPreview from './sections/DatasetPreview';
import TechStack from './sections/TechStack';
import AIRoadmap from './sections/AIRoadmap';
import CtaSection from './sections/CtaSection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>InfoLand AI | Property Verification Platform</title>
        <meta name="description" content="AI-powered real estate verification and legal insights." />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-slate-50 pt-16 w-full">
        <HeroSection />
        <ProblemStatement />
        <IndustryStats />
        <PlatformStats />
        <VerificationWorkflow />
        <FeaturesGrid />
        <DatasetPreview />
        <TechStack />
        <AIRoadmap />
        <CtaSection />
      </div>
    </>
  );
};

export default Home;