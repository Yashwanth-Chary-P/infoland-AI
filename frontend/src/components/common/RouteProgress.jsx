import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

const RouteProgress = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    
    // Simulate finish after a short delay since route changes in React are fast.
    // If using Suspense, the component mounts very fast anyway.
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);
    
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

  return null;
};

export default RouteProgress;
