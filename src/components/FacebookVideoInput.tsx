import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface FacebookVideoInputProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

const FacebookVideoInput: React.FC<FacebookVideoInputProps> = ({
  value = '',
  onChange,
  label = "Link Video Facebook"
}) => {
  const [videoUrl, setVideoUrl] = useState(value);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [videoInfo, setVideoInfo] = useState<{
    embedUrl: string;
    originalUrl: string;
    isValid: boolean;
  } | null>(null);

  // Function to extract Facebook video ID and create embed URL
  const processFacebookUrl = (url: string) => {
    if (!url) {
      setVideoInfo(null);
      setIsValidUrl(false);
      return;
    }

    // Facebook video URL patterns
    const patterns = [
      /facebook\.com\/.*\/videos\/(\d+)/,
      /facebook\.com\/watch\/?\?v=(\d+)/,
      /fb\.watch\/([a-zA-Z0-9]+)/,
      /facebook\.com\/.*\/posts\/(\d+)/
    ];

    let videoId = null;
    let embedUrl = '';

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        videoId = match[1];
        break;
      }
    }

    if (videoId) {
      // Create Facebook embed URL
      embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&width=500&show_text=false&height=280&appId`;
      
      setVideoInfo({
        embedUrl,
        originalUrl: url,
        isValid: true
      });
      setIsValidUrl(true);
      onChange(url);
    } else {
      setVideoInfo(null);
      setIsValidUrl(false);
      toast.error('URL Facebook tidak valid. Pastikan URL adalah link video Facebook yang benar.');
    }
  };

  useEffect(() => {
    if (value) {
      setVideoUrl(value);
      processFacebookUrl(value);
    }
  }, [value]);

  const handleUrlChange = (url: string) => {
    setVideoUrl(url);
    processFacebookUrl(url);
  };

  const handleTestVideo = () => {
    if (videoInfo?.originalUrl) {
      window.open(videoInfo.originalUrl, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="facebook-video">{label}</Label>
        <div className="mt-1 space-y-2">
          <Input
            id="facebook-video"
            type="url"
            placeholder="https://www.facebook.com/watch/?v=123456789 atau https://fb.watch/abc123"
            value={videoUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className={isValidUrl ? 'border-green-500' : videoUrl ? 'border-red-500' : ''}
          />
          
          {/* URL Status Indicator */}
          <div className="flex items-center gap-2">
            {videoUrl && (
              <>
                {isValidUrl ? (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    ✓ URL Valid
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    ✗ URL Tidak Valid
                  </Badge>
                )}
                
                {isValidUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleTestVideo}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Test Video
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Video Preview */}
      {videoInfo?.isValid && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Preview Video Facebook</Label>
                <Badge className="bg-blue-100 text-blue-800">
                  Facebook Video
                </Badge>
              </div>
              
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-video flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                    <p className="text-sm text-gray-600">Video Facebook akan ditampilkan di sini</p>
                    <p className="text-xs text-gray-500">Klik "Test Video" untuk melihat video asli</p>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 space-y-1">
                <p><strong>URL Asli:</strong> {videoInfo.originalUrl}</p>
                <p><strong>Status:</strong> Siap untuk ditampilkan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Text */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm">
              <p className="font-medium text-blue-900">Cara mendapatkan link video Facebook:</p>
              <ol className="list-decimal list-inside space-y-1 text-blue-800">
                <li>Buka video di Facebook</li>
                <li>Klik tombol "Share" atau "Bagikan"</li>
                <li>Pilih "Copy Link" atau "Salin Tautan"</li>
                <li>Paste link tersebut di kolom di atas</li>
              </ol>
              <p className="text-blue-700 mt-2">
                <strong>Format yang didukung:</strong><br />
                • https://www.facebook.com/watch/?v=123456789<br />
                • https://fb.watch/abc123<br />
                • https://www.facebook.com/username/videos/123456789
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacebookVideoInput;