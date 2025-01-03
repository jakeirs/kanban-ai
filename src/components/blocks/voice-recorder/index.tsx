"use client";

import { useCallback } from "react";
import { useVoiceRecorder } from "./useVoiceRecorder";
import { Mic } from "lucide-react";

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
  const handleComplete = useCallback(
    async (blob: Blob) => {
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
    <div className="flex flex-col items-center gap-2 p-10">
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
    </div>
  );
};

// Example of how to use with an API:
/*
const YourComponent = () => {
  const sendToApi = async (blob: Blob) => {
    const formData = new FormData()
    formData.append("audio", blob, "recording.webm")
    
    const response = await fetch("/api/your-endpoint", {
      method: "POST",
      body: formData
    })
    
    if (!response.ok) {
      throw new Error("Failed to upload audio")
    }
    
    const data = await response.json()
    return data
  }
  
  return <VoiceRecorder onSendToApi={sendToApi} />
}
*/
