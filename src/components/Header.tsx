import React from 'react';
import { Badge } from "@/components/ui/badge";
import AdminMenuButton from './AdminMenuButton';

const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕌</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Takmir <span className="text-emerald-600">Pinter</span>
              </h1>
              <p className="text-sm text-gray-600">Masjid Al-Hidayah</p>
            </div>
          </div>

          {/* Navigation and Admin Menu */}
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="hidden sm:flex text-emerald-600 border-emerald-600">
              Live
            </Badge>
            <AdminMenuButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;