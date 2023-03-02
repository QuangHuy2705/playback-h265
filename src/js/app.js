import "../scss/app.scss";
import H265Player from "./H265Player";

/* Your JS Code goes here */

/* Demo JS */

const el = document.querySelector("#video-container");

const Player = new H265Player(
  "http://localhost:8000/api/cam/compat/playlist?device_id=983109294948712448&from=1677727560&s3_gen=true&no_get_size=true&to=1677728560",
  el
);

export { H265Player };
