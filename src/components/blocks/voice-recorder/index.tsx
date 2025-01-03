"use client";

import { useCallback, useState } from "react";
import { useVoiceRecorder } from "./useVoiceRecorder";
import { Mic } from "lucide-react";
import { AudioPlayer } from "./audio-player/AudioPlayer";

interface VoiceRecorderProps {
  onRecordingComplete?: (blob: Blob) => void;
  // Example of how to send to API
  onSendToApi?: (blob: Blob) => Promise<void>;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}.${remainingSeconds.toString().padStart(2, "0")}`;
};

export const VoiceRecorder = ({
  onRecordingComplete,
  onSendToApi,
}: VoiceRecorderProps) => {
  const [audioBlob, setAudioBlob] = useState<Blob>();

  const handleComplete = useCallback(
    async (blob: Blob) => {
      setAudioBlob(blob);

      if (onRecordingComplete) {
        onRecordingComplete(blob);
      }

      if (onSendToApi) {
        try {
          await onSendToApi(blob);
        } catch (error) {
          console.error("Failed to send recording to API:", error);
        }
      }
    },
    [onRecordingComplete, onSendToApi]
  );

  const { isRecording, recordingTime, startRecording, stopRecording } =
    useVoiceRecorder(handleComplete);

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`
          w-16 h-16 rounded-full flex items-center justify-center transition-all
          ${
            isRecording
              ? "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              : "bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
          }
          shadow-lg hover:shadow-xl
        `}
      >
        <Mic className="w-8 h-8 text-white" />
      </button>
      {isRecording && (
        <div className="text-lg font-medium">{formatTime(recordingTime)}</div>
      )}

      {audioBlob && !isRecording && <AudioPlayer audioBlob={audioBlob} />}
    </div>
  );
};
