import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 grid-pattern relative overflow-hidden">
      {/* Background geometric elements */}
      <div className="geometric-shape shape-circle w-64 h-64 bg-coral/20 top-10 right-20 blur-3xl"></div>
      <div className="geometric-shape w-40 h-40 bg-mint/30 bottom-20 left-20 rounded-3xl rotate-45"></div>
      <div className="geometric-shape shape-circle w-52 h-52 bg-sky/20 top-1/2 left-10 blur-2xl"></div>
      <div className="geometric-shape w-36 h-36 bg-accent/30 bottom-1/3 right-1/4 rounded-2xl -rotate-12"></div>
      
      <div className="text-center relative z-10">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
