import { useCallback, useState, useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

interface UseVoiceRecorderReturn {
  isRecording: boolean;
  recordingTime: number;
  startRecording: () => void;
  stopRecording: () => void;
  onRecordingComplete: (blob: Blob) => void;
}

export const useVoiceRecorder = (
  onComplete?: (blob: Blob) => void
): UseVoiceRecorderReturn => {
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);

  const handleRecordingComplete = useCallback(
    (blob: Blob) => {
      setRecordingBlob(blob);
      if (onComplete) {
        onComplete(blob);
      }
    },
    [onComplete]
  );

  const recorder = useAudioRecorder({
    noiseSuppression: true,
    echoCancellation: true,
  });

  useEffect(() => {
    if (recorder.recordingBlob) {
      handleRecordingComplete(recorder.recordingBlob);
    }
  }, [recorder.recordingBlob, handleRecordingComplete]);

  const { startRecording, stopRecording, isRecording, recordingTime } =
    recorder;

  console.log("recordingTime", JSON.stringify(recordingTime, null, 2));

  const handleStartRecording = useCallback(() => {
    setRecordingBlob(null);
    startRecording();
  }, [startRecording]);

  const handleStopRecording = useCallback(() => {
    stopRecording();
  }, [stopRecording]);

  return {
    isRecording,
    recordingTime,
    startRecording: handleStartRecording,
    stopRecording: handleStopRecording,
    onRecordingComplete: handleRecordingComplete,
  };
};
