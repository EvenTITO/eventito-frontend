export function getImage(event, imageName) {
  return event.media.filter((m) => m.name === imageName)[0]?.url
}

export function getBanner(event) {
  return getImage(event, 'banner_image')
}

export function getLogo(event) {
  return getImage(event, 'main_image')
}
