import { useCallback, useState } from "react"
import { useAudioRecorder } from "react-audio-voice-recorder"

interface UseVoiceRecorderReturn {
  isRecording: boolean
  recordingTime: number
  startRecording: () => void
  stopRecording: () => void
  onRecordingComplete: (blob: Blob) => void
}

export const useVoiceRecorder = (onComplete?: (blob: Blob) => void): UseVoiceRecorderReturn => {
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null)
  
  const {
    startRecording,
    stopRecording,
    recordingBlob: currentBlob,
    isRecording,
    recordingTime,
  } = useAudioRecorder({
    noiseSuppression: true,
    echoCancellation: true,
  })

  const handleRecordingComplete = useCallback((blob: Blob) => {
    setRecordingBlob(blob)
    if (onComplete) {
      onComplete(blob)
    }
  }, [onComplete])

  const handleStartRecording = useCallback(() => {
    setRecordingBlob(null)
    startRecording()
  }, [startRecording])

  const handleStopRecording = useCallback(() => {
    stopRecording()
    if (currentBlob) {
      handleRecordingComplete(currentBlob)
    }
  }, [stopRecording, currentBlob, handleRecordingComplete])

  return {
    isRecording,
    recordingTime,
    startRecording: handleStartRecording,
    stopRecording: handleStopRecording,
    onRecordingComplete: handleRecordingComplete
  }
}
