
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Play, Users, Clock, ThumbsUp, Share2 } from "lucide-react";

interface Kajian {
  id: number;
  title: string;
  speaker: string;
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
}

interface KajianPlayerProps {
  kajian: Kajian;
  onClose: () => void;
  relatedKajian: Kajian[];
}

const KajianPlayer = ({ kajian, onClose, relatedKajian }: KajianPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900 truncate">{kajian.title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-h-[calc(90vh-80px)] overflow-y-auto">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="relative bg-black rounded-lg overflow-hidden mb-4">
              <div className="aspect-video">
                {isPlaying ? (
                  <iframe
                    src={kajian.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title={kajian.title}
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img 
                      src={kajian.thumbnail} 
                      alt={kajian.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button
                        size="lg"
                        className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-emerald-600 hover:text-emerald-700"
                        onClick={() => setIsPlaying(true)}
                      >
                        <Play className="w-8 h-8 ml-1" fill="currentColor" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{kajian.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {kajian.views} views
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {kajian.duration}
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800">
                    {kajian.category}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{kajian.speaker}</p>
                  <p className="text-sm text-gray-600">Pemateri</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Suka
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Bagikan
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Deskripsi</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Kajian ini membahas tentang {kajian.title.toLowerCase()} yang disampaikan oleh {kajian.speaker}. 
                  Pembahasan yang mendalam dan praktis untuk diterapkan dalam kehidupan sehari-hari.
                </p>
              </div>
            </div>
          </div>

          {/* Related Videos Sidebar */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-gray-900 mb-4">Kajian Terkait</h4>
            <div className="space-y-4">
              {relatedKajian.slice(0, 5).map((related) => (
                <Card key={related.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={related.thumbnail} 
                          alt={related.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Play className="w-4 h-4 text-white" fill="currentColor" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                          {related.title}
                        </h5>
                        <p className="text-xs text-gray-600 mb-1">{related.speaker}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{related.views} views</span>
                          <span>•</span>
                          <span>{related.duration}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KajianPlayer;
