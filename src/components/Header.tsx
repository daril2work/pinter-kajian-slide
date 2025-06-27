import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import AdminMenuButton from './AdminMenuButton';
import { useHeroContent, useMosqueSettings } from '@/hooks/useDatabase';

const Header: React.FC = () => {
  const { heroContent, isLoading: heroLoading } = useHeroContent();
  const { mosqueSettings, isLoading: settingsLoading } = useMosqueSettings();

  // Use database content or fallback to default
  const appTitle = heroContent?.title || "Smart Mosque";
  const mosqueName = heroContent?.mosque_badge || mosqueSettings?.name || "Masjid Al-Hidayah";
  
  // Clean mosque name from badge (remove emoji if present)
  const cleanMosqueName = mosqueName.replace(/🕌\s*/, '');

  if (heroLoading || settingsLoading) {
    return (
      <header className="bg-white/90 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🕌</span>
              </div>
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                <span className="text-sm text-gray-500">Memuat...</span>
              </div>
            </div>
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
  }

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title - Now displays exact title from database */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕌</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {appTitle}
              </h1>
              <p className="text-sm text-gray-600">{cleanMosqueName}</p>
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