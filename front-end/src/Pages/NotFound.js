import Not404 from "../pictures/NotFound.png"
import "./NotFound.css"
export default function NotFound(){
    return (
      <div className="not_found">
        <h1> Back To the Home Page</h1>
        <img src={Not404} alt="" />
      </div>
    );
}