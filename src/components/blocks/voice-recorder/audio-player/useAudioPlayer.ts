import { useState, useRef, useEffect } from "react"

export const useAudioPlayer = (audioBlob?: Blob) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob)
      if (audioRef.current) {
        audioRef.current.src = url
        audioRef.current.addEventListener("loadedmetadata", () => {
          setDuration(audioRef.current?.duration || 0)
        })
      }
      return () => URL.revokeObjectURL(url)
    }
  }, [audioBlob])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return {
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    audioRef
  }
}
