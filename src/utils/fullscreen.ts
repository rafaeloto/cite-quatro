import screenfull from 'screenfull';

export function isFullScreenEnabled() {
  return screenfull.isEnabled
}

export function toggleFullScreen() {
  if (screenfull.isEnabled) {
    if (!screenfull.isFullscreen) {
      screenfull.request()
    }
    if (screenfull.isFullscreen) {
      screenfull.exit()
    }
  }
}