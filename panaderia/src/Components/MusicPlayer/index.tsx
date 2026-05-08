// src/Components/MusicPlayer/index.tsx
import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.18)

  useEffect(() => {
    const audio = new Audio(
      'https://archive.org/download/TinTanElPanadero/tin-tan-el-panadero.mp3'
    )
    audio.loop = true
    audio.volume = volume
    audio.play().catch(() => {})
    audioRef.current = audio

    return () => { audio.pause(); audio.src = '' }
  }, [])

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) {
      audioRef.current.volume = v
      audioRef.current.muted = false
    }
    if (muted) setMuted(false)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    const next = !muted
    audioRef.current.muted = next
    setMuted(next)
  }

  return (
    <div className="music-player">
      <span className="music-icon">🥐</span>
      <div className="music-label">
        <span className="music-title">El Panadero — Tin Tan</span>
        <span className="music-sub">Ambiente musical</span>
      </div>
      <div className={`music-waves ${muted || volume === 0 ? 'muted' : ''}`}>
        {[...Array(5)].map((_, i) => <span key={i} className="w-bar" />)}
      </div>
      <input
        type="range"
        className="music-vol"
        min={0}
        max={1}
        step={0.01}
        value={muted ? 0 : volume}
        onChange={handleVolume}
        title="Volumen"
      />
      <button className="music-mute" onClick={toggleMute} title={muted ? 'Activar' : 'Silenciar'}>
        {muted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
      </button>
    </div>
  )
}