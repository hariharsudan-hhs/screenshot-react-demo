import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const urlRef = useRef();
  console.log(isLoading);

  function handleTakeScreenshot(event) {
    setIsLoading(true);
    const url = urlRef.current.value;
    if (url.length > 0) {
      const encodedUrl = encodeURIComponent(url);
      fetch("http://localhost:7000/take-screenshot/" + encodedUrl, {
        mode: "no-cors", //since we are using no-cors, we will recieve an opaque response
      })
        .then((response) => parseJSON(response))
        .catch((error) => {
          setIsLoading(false);
          console.log("Exception: ", error);
        });
    } else {
      setIsLoading(false);
      alert("Please enter a valid url!");
    }
  }

  function parseJSON(response) {
    if (response.type == "opaque") {
      setIsLoading(false);
      alert("Screenshot saved in Desktop successfully!");
      urlRef.current.value = "";
    } else {
      setIsLoading(false);
      alert("Error occurred!");
    }
  }

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  } else {
    return (
      <div>
        <div className="Wrapper">
          <div className="Input">
            <input
              className="Input-text"
              type="text"
              id="input"
              ref={urlRef}
              placeholder="Enter Website Url here"
            />
          </div>
        </div>
        <button className="button space" onClick={handleTakeScreenshot}>
            Take Screenshot
          </button>
      </div>
    );
  }
}

export default App;
