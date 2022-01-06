import { useState, useEffect, useRef } from "react";
import "./App.css";
import shopifyLogo from "./assets/shopify-logo.png";
import Card from "./components/Card/Card";
import Button from "./components/Button/Button";
import { Photo } from "./utils/interfaces";
import { Favorite, PhotoLibrary } from "@material-ui/icons";
import moment from "moment";

const NASA_URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = "hiqVRSbsWAgNxm6bQxJNVL5WXISljVcot6mtpEuZ";

function App() {
  const [imageList, setImageList] = useState<Array<Photo>>([]);
  const [favouritePhotos, setFavouritePhotos] = useState<Array<Photo>>([]);
  const [favouriteClicked, setFavouriteClicked] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startDate = moment().subtract(6, "days").format("YYYY-MM-DD");
    const endDate = moment().format("YYYY-MM-DD");
    const url = `${NASA_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setImageList([
          ...data
            .filter((photo: any) => photo.media_type === "image")
            .map((photo: any) => {
              return {
                url: photo.url,
                date: photo.date,
                title: photo.title,
                explanation: photo.explanation,
                liked: false,
              };
            }),
        ]);
      });
  }, []);

  const handleLike = (likedPhoto: Photo) => {
    likedPhoto.liked = !likedPhoto.liked;
    if (favouritePhotos.some((photo) => photo.url === likedPhoto.url)) {
      setFavouritePhotos(
        favouritePhotos.filter((photo) => photo.url !== likedPhoto.url)
      );
    } else setFavouritePhotos([...favouritePhotos, likedPhoto]);
  };

  const handleChangeCollection = (favourite: boolean) => {
    listRef.current!.scrollTo({ top: 0, behavior: "smooth" });
    setFavouriteClicked(favourite);
  }

  return (
    <div className="container">
      <div className="header">
        <img className="logo" src={shopifyLogo} alt="Shopify Logo" />
        Spacestagram
        <div style={{ flex: 1 }} />

        <Button
          clicked={!favouriteClicked}
          color="#1EA47E"
          onClick={() => handleChangeCollection(false)}
          contained
        >
          <PhotoLibrary color="inherit" fontSize="inherit" />
        </Button>

        <Button
          clicked={favouriteClicked}
          color="#FF8989"
          onClick={() => handleChangeCollection(true)}
          contained
        >
          <Favorite color="inherit" fontSize="inherit" />
        </Button>
      </div>

      <div className="main-container">
        {/* <div className="welcome">
          Welcome to Spacestagram - The most wonderful photo library of NASA.
        </div> */}

        <div className="photo-list" ref={listRef}>
          {(favouriteClicked ? favouritePhotos : imageList).map((photo) => (
            <Card
              key={photo.url}
              photo={photo}
              liked={photo.liked}
              onLike={handleLike}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
