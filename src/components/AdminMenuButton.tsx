import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, User, Shield } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from './AdminLogin';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/sonner";

const AdminMenuButton: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logout berhasil');
    navigate('/');
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
  };

  if (isAuthenticated && user) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
              <Badge variant="default" className="bg-emerald-600">
                {user.username}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">Logged in as</p>
              <p className="text-xs text-gray-500">{user.username}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleAdminDashboard}>
              <Settings className="w-4 h-4 mr-2" />
              Dashboard Admin
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  return (
    <>
      <Button 
        onClick={handleLoginClick}
        variant="outline" 
        className="flex items-center gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">Login Admin</span>
      </Button>
      
      {showLogin && (
        <AdminLogin onClose={() => setShowLogin(false)} />
      )}
    </>
  );
};

export default AdminMenuButton;