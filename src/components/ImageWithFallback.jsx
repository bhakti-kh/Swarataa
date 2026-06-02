import { useState } from 'react'

export function ImageWithFallback({ src, alt, className, style }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={className}
        style={{ background: 'linear-gradient(135deg, #2D1810, #3D2820)', ...style }}
        aria-label={alt}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
    />
  )
}
