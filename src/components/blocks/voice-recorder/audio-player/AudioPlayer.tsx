import { Play, Pause } from "lucide-react";
import { useAudioPlayer } from "./useAudioPlayer";

interface AudioPlayerProps {
  audioBlob?: Blob;
}

const formatTime = (time: number): string => {
  if (!isFinite(time) || time === 0) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const AudioPlayer = ({ audioBlob }: AudioPlayerProps) => {
  const { isPlaying, currentTime, duration, togglePlay, audioRef } =
    useAudioPlayer(audioBlob);

  if (!audioBlob) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg shadow-md">
      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white ml-1" />
        )}
      </button>

      <div className="flex flex-col gap-1 min-w-[120px]">
        <div className="w-48 h-1 bg-orange-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all"
            style={{
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
            }}
          />
        </div>
        <div className="text-sm text-orange-700 font-medium">
          {formatTime(currentTime)} /{" "}
          {duration ? formatTime(duration) : "00:00"}
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
};
