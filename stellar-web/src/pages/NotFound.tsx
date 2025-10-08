import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <style>{`
        body {
            background-color: #FFFFFF;
            color: #1A1A2E;
            font-family: 'Space Mono', monospace;
            background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
        }
        header.scrolled {
            background-color: rgba(255, 255, 255, 0.8);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .font-lufga {
            font-family: 'Lufga', sans-serif;
        }
        .electric-violet-text {
            color: #5C27FE;
        }
        .electric-violet-bg {
            background-color: #5C27FE;
        }
        .glow-effect-soft {
             box-shadow: 0 0 15px rgba(92, 39, 254, 0.5);
        }
      `}</style>
      <div className="min-h-screen overflow-x-hidden">
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.svg" className="h-10 w-10" alt="Stellar Logo" />
              <span className="font-lufga text-2xl font-bold text-gray-900 tracking-wider">
                STELLAR
              </span>
            </Link>
            <nav>
              <Link
                to="/"
                className="hover:electric-violet-text transition-colors duration-300 font-lufga"
              >
                Home
              </Link>
            </nav>
          </div>
        </header>

        <main className="pt-24">
          <div className="container mx-auto px-4 py-12">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-lufga text-8xl md:text-9xl font-bold tracking-tighter electric-violet-text leading-tight">
                404
              </h1>
              <h2 className="mt-4 font-lufga text-3xl md:text-4xl font-bold tracking-tight text-black">
                Page Not Found
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Oops! The page you are looking for does not exist. It might
                have been moved or deleted.
              </p>
              <Button
                asChild
                className="mt-8 electric-violet-bg text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 glow-effect-soft"
              >
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Return to Home
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default NotFound;
