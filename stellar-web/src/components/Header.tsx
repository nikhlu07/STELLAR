import { Link, useLocation, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUser } from "../contexts/UserContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const { userType, setUserType } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setUserType(null);
    navigate("/connect");
  };

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
            <img src="/logo.svg" className="h-10 w-10" alt="Stellar Logo" />
          </div>
        </Link>

        {!isHome && userType && (
          <nav className="hidden md:flex items-center gap-6">
            {userType === 'farmer' && (
              <>
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
              </>
            )}
            {userType === 'lender' && (
              <>
                <Link
                  to="/marketplace"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Marketplace
                </Link>
                <Link
                  to="/lender"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Lender Intelligence
                </Link>
              </>
            )}
            {userType === 'verifier' && (
              <>
                <Link
                  to="/marketplace"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Marketplace
                </Link>
                <Link
                  to="/verifier"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Verifier Operations
                </Link>
              </>
            )}
          </nav>
        )}

        <div className="flex items-center gap-4">
          {userType && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
