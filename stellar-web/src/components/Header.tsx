import { Link, useLocation } from "react-router-dom";
import { Satellite, User } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        {
          "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60":
            scrolled,
        },
        { "border-transparent bg-transparent": !scrolled }
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Satellite className="h-8 w-8 text-primary transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 animate-ping opacity-20">
              <Satellite className="h-8 w-8 text-primary" />
            </div>
          </div>
          <span className="text-2xl font-bold text-gradient-violet">
            STELLAR
          </span>
        </Link>

        {!isHome && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/marketplace"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Marketplace
            </Link>
            <Link
              to="/farmer"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Farmer Portal
            </Link>
            <Link
              to="/verifier"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Verifier Hub
            </Link>
            <Link
              to="/lender"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Lender Intelligence
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
