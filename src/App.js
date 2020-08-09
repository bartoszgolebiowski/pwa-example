import React, { useEffect } from "react";
import "./App.css";

const images = ["fox1", "fox2", "fox3", "fox4"];

function randomValueFromArray(array) {
  let randomNo = Math.floor(Math.random() * array.length);
  return array[randomNo];
}

function App() {
  useEffect(() => {
    const ticker = setInterval(function () {
      const imgElem = document.getElementById("#fox");
      let randomChoice = randomValueFromArray(images);
      imgElem.src = "static/" + randomChoice + ".jpg";
      return () => {
        clearInterval(ticker);
      };
    }, 2000);
  }, []);

  return (
    <div className="App">
      <img id="#fox" src="static/fox1.jpg" alt="a fox picture" />
    </div>
  );
}

export default App;
