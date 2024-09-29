import { useState } from "react";
import { ChevronRight, ChevronDown, Plus, X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import ChairDialog from "./ChairDialog";

export default function TracksTable({ initialTracks }) {
  const [tracks, setTracks] = useState(initialTracks);
  const [expandedTracks, setExpandedTracks] = useState(new Set());

  const toggleTrackExpansion = (trackId) => {
    setExpandedTracks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      return newSet;
    });
  };

  const updateChair = (trackId, newEmail) => {
    setTracks((prev) =>
      prev.map((track) =>
        track.id === trackId ? { ...track, chairEmail: newEmail } : track,
      ),
    );
    toast({
      title: "Chair Updated",
      description: `Chair for track ${tracks.find((t) => t.id === trackId)?.name} has been updated.`,
    });
  };

  const deleteChair = (trackId) => {
    setTracks((prev) =>
      prev.map((track) =>
        track.id === trackId ? { ...track, chairEmail: undefined } : track,
      ),
    );
    toast({
      title: "Chair Removed",
      description: `Chair for track ${tracks.find((t) => t.id === trackId)?.name} has been removed.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        {tracks.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            isExpanded={expandedTracks.has(track.id)}
            onToggleExpand={() => toggleTrackExpansion(track.id)}
            onUpdateChair={updateChair}
            onDeleteChair={deleteChair}
          />
        ))}
      </div>
    </div>
  );
}

function TrackItem({
  track,
  isExpanded,
  onToggleExpand,
  onUpdateChair,
  onDeleteChair,
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div
        className="flex items-center p-4 bg-white hover:bg-gray-50 cursor-pointer"
        onClick={onToggleExpand}
      >
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 mr-2 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 mr-2 text-gray-500" />
        )}
        <span className="font-medium">{track.name}</span>
      </div>
      {isExpanded && (
        <div className="p-4 bg-gray-50">
          {track.chairEmail ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${track.chairEmail}`}
                  />
                  <AvatarFallback>
                    {track.chairEmail[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{track.chairEmail}</span>
              </div>
              <div className="space-x-2">
                <ChairDialog
                  trackId={track.id}
                  initialEmail={track.chairEmail}
                  onUpdateChair={onUpdateChair}
                  triggerButton={
                    <Button size="sm" variant="outline">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  }
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDeleteChair(track.id)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Borrar
                </Button>
              </div>
            </div>
          ) : (
            <ChairDialog
              trackId={track.id}
              onUpdateChair={onUpdateChair}
              triggerButton={
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar chair
                </Button>
              }
            />
          )}
        </div>
      )}
    </div>
  );
}
