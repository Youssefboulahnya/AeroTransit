// import aeroplane from "../pictures/planee.png";
// import video from "../pictures/video.mp4";

export default function Home() {
  return (
    <div className="home dFlex container">
      <div className="mainText">
        <h1>Fly Higher, Go Further and Turn Every Destination Into a Lifetime Memory</h1>
      </div>
      {/* <div className="homeImages dFlex">
        <div className="videoDiv">
          <video
            src={video}
            autoPlay
            muted
            loop
            className="video"
            type="video/mp4"
          />
        </div>
        <img src={aeroplane} alt="" className="plane" />
      </div> */}
    </div>
  );
}
