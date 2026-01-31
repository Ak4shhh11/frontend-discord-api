let ambient = null

class AudioManager {
  constructor() {
    this.sounds = {}
  }

  playSound(file, { volume = 1, rate = 1, loop = false } = {}) {
    const audio = new Audio(`/sounds/${file}`)
    audio.volume = volume
    audio.playbackRate = rate
    audio.loop = loop

    audio.play().catch(() => {})
    this.sounds[file] = audio
    return audio
  }

  stopSound(file) {
    const audio = this.sounds[file]
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      delete this.sounds[file]
    }
  }

  stopAllSounds() {
    Object.values(this.sounds).forEach((audio) => {
      audio.pause()
      audio.currentTime = 0
    })
    this.sounds = {}
  }

  // 🌊 AMBIENT
  playAmbient(file, volume = 0.2) {
    if (ambient) {
      ambient.pause()
      ambient = null
    }

    ambient = new Audio(`/sounds/${file}`)
    ambient.loop = true
    ambient.volume = volume
    ambient.play().catch(() => {})
  }

  stopAmbient() {
    if (ambient) {
      ambient.pause()
      ambient = null
    }
  }
}

export default new AudioManager()
