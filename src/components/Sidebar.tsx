
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Server, Laptop } from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link to={to}>
    <Button
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "w-full justify-start",
        isActive ? "bg-primary text-primary-foreground" : ""
      )}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-card">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-8">LogVista Guardian</h2>
        
        <div className="space-y-1">
          <NavItem
            to="/"
            icon={<Laptop className="h-5 w-5" />}
            label="Frontend Logs"
            isActive={pathname === "/" || pathname === "/frontend-log"}
          />
          <NavItem
            to="/backend-log"
            icon={<Server className="h-5 w-5" />}
            label="Backend Logs"
            isActive={pathname === "/backend-log"}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
