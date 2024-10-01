export function unifyEventTracksWithChairs(eventTracks, tracksByChair) {
  eventTracks.forEach((trackName) => {
    const trackExists = tracksByChair.some((track) => track.track === trackName)
    if (!trackExists) {
      tracksByChair.push({ track: trackName })
    }
  })

  return tracksByChair
}
