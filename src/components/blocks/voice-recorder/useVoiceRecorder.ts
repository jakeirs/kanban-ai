import { useCallback, useState, useEffect, useRef } from "react";
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
  const lastRecordingTimeRef = useRef<number>(0);

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

  useEffect(() => {
    if (recordingTime > 0) {
      lastRecordingTimeRef.current = recordingTime;
    }
  }, [recordingTime]);

  const handleStartRecording = useCallback(() => {
    setRecordingBlob(null);
    lastRecordingTimeRef.current = 0;
    startRecording();
  }, [startRecording]);

  const handleStopRecording = useCallback(() => {
    stopRecording();
  }, [stopRecording]);

  return {
    isRecording,
    recordingTime: lastRecordingTimeRef.current,
    startRecording: handleStartRecording,
    stopRecording: handleStopRecording,
    onRecordingComplete: handleRecordingComplete,
  };
};
