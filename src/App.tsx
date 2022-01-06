import { useState, useEffect } from "react";
import "./App.css";
import shopifyLogo from "./assets/shopify-logo.png";
import Card from "./components/Card/Card";
import Button from "./components/Button/Button";
import { Favorite } from "@material-ui/icons";
import moment from "moment";

const NASA_URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = "hiqVRSbsWAgNxm6bQxJNVL5WXISljVcot6mtpEuZ";

interface Photo {
  url: string;
  date: string;
  title: string;
  explanation: string;
}

function App() {
  const [imageList, setImageList] = useState<Array<Photo>>([]);

  useEffect(() => {
    const startDate = moment().subtract(6, "days").format("YYYY-MM-DD");
    const endDate = moment().format("YYYY-MM-DD");
    const url = `${NASA_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
    setImageList([]);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setImageList([
          ...imageList,
          ...data
            .filter((photo: any) => photo.media_type === "image")
            .map((photo: any) => {
              return {
                url: photo.url,
                date: photo.date,
                title: photo.title,
                explanation: photo.explanation,
              };
            }),
        ]);
      });
  }, []);

  return (
    <div>
      <div className="header">
        <img className="logo" src={shopifyLogo} alt="Shopify Logo" />
        Spacestagram
      </div>
      <div className="main-container">
        <div className="welcome">
          Welcome to Spacestagram - The most wonderful photo library of NASA.
        </div>
        <div className="photo-list">
          {
            imageList.map((photo) =>
              <Card
                key={photo.url}
                imgURL={photo.url}
                date={photo.date}
                description={photo.explanation}
                title={photo.title}
              />
            )
          }
        </div>
        <Button onClick={() => null} contained>
          <Favorite color="inherit" fontSize="inherit" />
        </Button>
      </div>
    </div>
  );
}

export default App;
