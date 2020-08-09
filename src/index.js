import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

function randomNotification() {
  var notifTitle = "test";
  var notifBody = "test";
  var notifImg = "static/fox1.jpg";
  var options = {
    body: notifBody,
    icon: notifImg,
  };
  var notif = new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}

Notification.requestPermission(function (result) {
  if (result === "granted") {
    randomNotification();
  }
});

serviceWorker.register();
