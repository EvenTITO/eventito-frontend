import { Image } from '@nextui-org/image'
import { useState } from 'react'

export const DEFAULT_IMAGE_BANNER =
  'https://cms.fi.uba.ar/uploads/Imagenes_Paginas_Internas_Genericas_Cian_Institucional_d1a7c69a52.png'

export default function ImageWrapper({ src, title, height, width }) {
  const [imgSrc, setImgSrc] = useState(src)
  function handleError() {
    setImgSrc(DEFAULT_IMAGE_BANNER)
  }
  return (
    <Image
      isZoomed
      shadow="sm"
      radius="none"
      width={width}
      height={height}
      alt={title}
      src={imgSrc}
      className={`w-full h-[${height}] object-cover`}
      onError={handleError}
    />
  )
}
