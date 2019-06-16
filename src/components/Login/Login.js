import React from "react";
import "./../../animate.css";

export default function Login() {
  return (
    <div>
      <div className="reset loginmain">
        <a
          id="loginanimation"
          className="login animated zoomInDown"
          href={process.env.REACT_APP_LOGIN}
        >
          <img
            alt=""
            src={ezparking}
            style={{ height: "70px", margin: "10px" }}
          />
        </a>
      </div>
    </div>
  );
}
