const fs = require('fs');
const path = require('path');

const targetContainer = 'max-w-7xl mx-auto px-8 lg:px-10 xl:px-12';

const filesToUpdate = [
  'src/components/layout/Navbar.jsx',
  'src/components/layout/Footer.jsx',
  'src/pages/Home/sections/HeroSection.jsx',
  'src/pages/Home/sections/ProblemStatement.jsx',
  'src/pages/Home/sections/IndustryStats.jsx',
  'src/pages/Home/sections/PlatformStats.jsx',
  'src/pages/Home/sections/VerificationWorkflow.jsx',
  'src/pages/Home/sections/FeaturesGrid.jsx',
  'src/pages/Home/sections/DatasetPreview.jsx',
  'src/pages/Home/sections/TechStack.jsx',
  'src/pages/Home/sections/AIRoadmap.jsx',
  'src/pages/Home/sections/CtaSection.jsx',
  'src/pages/About.jsx',
  'src/pages/Contact.jsx'
];

// Helper to find file (Footer might be in components/ or components/layout/)
const findFile = (relPath) => {
  const absPath = path.join(__dirname, relPath);
  if (fs.existsSync(absPath)) return absPath;
  // check alternate paths for Footer/Navbar
  if (relPath.includes('Footer')) {
    const alt = path.join(__dirname, 'src/components/Footer.jsx');
    if (fs.existsSync(alt)) return alt;
  }
  if (relPath.includes('Navbar')) {
    const alt = path.join(__dirname, 'src/components/Navbar.jsx');
    if (fs.existsSync(alt)) return alt;
  }
  return null;
}

filesToUpdate.forEach(file => {
  const filePath = findFile(file);
  if (!filePath) {
    console.log('Not found:', file);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // Regex patterns to match existing main containers
  // matches: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
  // matches: max-w-[90rem] mx-auto px-6 md:px-10 lg:px-12
  // matches: max-w-[90rem] mx-auto px-6 lg:px-8
  // matches: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1
  
  const patterns = [
    /max-w-7xl mx-auto px-4 sm:px-6 lg:px-8/g,
    /max-w-\[90rem\] mx-auto px-6 md:px-10 lg:px-12/g,
    /max-w-\[90rem\] mx-auto px-6 lg:px-8/g,
    /max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1/g,
    /max-w-5xl mx-auto px-4 sm:px-6 lg:px-8/g,
    /max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center/g,
    /max-w-4xl mx-auto px-4 sm:px-6 lg:px-8/g
  ];

  patterns.forEach(pattern => {
    content = content.replace(pattern, (match) => {
      // Preserve extra classes if any (like w-full flex-1 or text-center)
      if (match.includes('w-full flex-1')) return `${targetContainer} w-full flex-1`;
      if (match.includes('text-center')) return `${targetContainer} text-center`;
      return targetContainer;
    });
  });

  // Hero section specific tweaks
  if (file.includes('HeroSection.jsx')) {
    // Increase gap
    content = content.replace(/grid lg:grid-cols-12 gap-16 lg:gap-12 xl:gap-16/g, 'grid lg:grid-cols-12 gap-16 lg:gap-16 xl:gap-20');
    // Ensure dashboard doesn't touch edges (adding pr padding to left or pl to right, but layout handles it if container is smaller)
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated:', file);
  } else {
    console.log('No matches or unchanged:', file);
  }
});
