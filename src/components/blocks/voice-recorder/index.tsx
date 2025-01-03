"use client";

import { useCallback, useState } from "react";
import { useVoiceRecorder } from "./useVoiceRecorder";
import { Mic } from "lucide-react";
import { AudioPlayer } from "./audio-player/AudioPlayer";

interface VoiceRecorderProps {
  onRecordingComplete?: (blob: Blob) => Promise<void>;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}.${remainingSeconds.toString().padStart(2, "0")}`;
};

export const VoiceRecorder = ({ onRecordingComplete }: VoiceRecorderProps) => {
  const [audioBlob, setAudioBlob] = useState<Blob>();

  const handleComplete = useCallback(
    async (blob: Blob) => {
      // needed for Audio Player
      setAudioBlob(blob);

      // Needed to send to openAI
      // const formData = new FormData();
      // formData.append("file", blob);

      // const response = await fetch("/api/whisper", {
      //   method: "POST",
      //   body: formData,
      // });

      // console.log("response json", await response.json());

      if (onRecordingComplete) {
        try {
          await onRecordingComplete(blob);
        } catch (error) {
          console.error("Failed to send recording to API:", error);
        }
      }
    },
    [onRecordingComplete]
  );

  const { isRecording, recordingTime, startRecording, stopRecording } =
    useVoiceRecorder(handleComplete);

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <div className="relative">
        {/* Outer ring with animation */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300
            ${isRecording ? "animate-pulse-ring" : ""}
            ${isRecording ? "bg-red-500/20" : "bg-orange-400/20"}
          `}
          style={{
            transform: "scale(1.6)",
          }}
        />
        {/* Inner ring with animation */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300
            ${isRecording ? "animate-pulse-ring-delayed" : ""}
            ${isRecording ? "bg-red-500/30" : "bg-orange-400/30"}
          `}
          style={{
            transform: "scale(1.3)",
          }}
        />
        {/* Main button */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`
            relative w-16 h-16 rounded-full flex items-center justify-center transition-all
            ${
              isRecording
                ? "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse"
                : "bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
            }
            shadow-lg hover:shadow-xl
          `}
        >
          <Mic className="w-8 h-8 text-white" />
        </button>
      </div>
      {isRecording && (
        <div className="text-lg font-medium">{formatTime(recordingTime)}</div>
      )}

      {audioBlob && !isRecording && (
        <AudioPlayer audioBlob={audioBlob} duration={recordingTime} />
      )}
    </div>
  );
};
