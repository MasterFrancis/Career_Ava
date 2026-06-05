const backgroundGif = new URL('../assets/IMG_8346.GIF', import.meta.url).href
const cloud1 = new URL('../assets/1.png', import.meta.url).href
const cloud2 = new URL('../assets/2.png', import.meta.url).href
const cloud3 = new URL('../assets/3.png', import.meta.url).href

export function PixelSkyCanvas() {
  return (
    <div className="pixelSkyCanvas" aria-hidden="true">
      <div className="pixelSkyBackdrop" style={{ backgroundImage: `url(${backgroundGif})` }} />

      <div className="cloudLane cloudLaneOne">
        <div className="cloudTrack cloudTrackRight">
          <img src={cloud1} alt="" className="cloudSprite cloudSpriteOne" />
          <img src={cloud1} alt="" className="cloudSprite cloudSpriteOne" />
        </div>
      </div>

      <div className="cloudLane cloudLaneTwo">
        <div className="cloudTrack cloudTrackLeft">
          <img src={cloud2} alt="" className="cloudSprite cloudSpriteTwo" />
          <img src={cloud2} alt="" className="cloudSprite cloudSpriteTwo" />
        </div>
      </div>

      <div className="cloudLane cloudLaneThree">
        <div className="cloudTrack cloudTrackRightSlow">
          <img src={cloud3} alt="" className="cloudSprite cloudSpriteThree" />
          <img src={cloud3} alt="" className="cloudSprite cloudSpriteThree" />
        </div>
      </div>
    </div>
  )
}
