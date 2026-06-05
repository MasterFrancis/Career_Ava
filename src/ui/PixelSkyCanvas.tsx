const backgroundGif = new URL('../assets/IMG_8346.GIF', import.meta.url).href

export function PixelSkyCanvas() {
  return (
    <div
      className="pixelSkyCanvas"
      aria-hidden="true"
      style={{ backgroundImage: `url(${backgroundGif})` }}
    />
  )
}
