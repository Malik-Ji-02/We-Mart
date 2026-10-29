import React, { useState } from "react"
import "./ui.css"

export function optimizeImageUrl(url: string, width = 400): string {
  if (!url || !url.includes("unsplash.com")) return url
  try {
    const parsed = new URL(url)
    parsed.searchParams.set("w", String(width))
    parsed.searchParams.set("q", "70")
    parsed.searchParams.set("auto", "format")
    return parsed.toString()
  } catch {
    return url
  }
}

export interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  widthPx?: number
}

export function ProductImage({
  src,
  alt,
  widthPx = 400,
  className = "",
  ...props
}: ProductImageProps) {
  const [loaded, setLoaded] = useState(false)
  const optimizedSrc = optimizeImageUrl(src, widthPx)

  return (
    <div className={`ui-product-image ${className}`}>
      <img
        src={optimizedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  )
}

export default ProductImage
