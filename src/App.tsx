import { useState, useEffect, useRef } from "react";
import "./App.css";
import shopifyLogo from "./assets/shopify-logo.png";
import Card from "./components/Card/Card";
import Button from "./components/Button/Button";
import { FavouriteList, Photo } from "./utils/interfaces";
import { Favorite, PhotoLibrary } from "@material-ui/icons";
import moment from "moment";
import Loader from "react-loader-spinner";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NASA_URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = "hiqVRSbsWAgNxm6bQxJNVL5WXISljVcot6mtpEuZ";

function App() {
  const [imageList, setImageList] = useState<Array<Photo>>([]);
  const [favouritePhotos, setFavouritePhotos] = useState<FavouriteList>({});
  const [favouriteClicked, setFavouriteClicked] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  /**
   * Get data from local storage and fetch API the first time.
   */
  useEffect(() => {
    const favouriteList = localStorage.getItem("favourite-list");
    if (favouriteList) {
      const favouritesObj = JSON.parse(favouriteList);
      setFavouritePhotos(favouritesObj);
      fetchImages(favouritesObj);
    };
  }, []);

  /**
   * Fetch API after startDate and endDate is updated.
   * Avoid calling API during the first render.
   */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return
    }
    fetchImages(favouritePhotos);
  }, [startDate, endDate]);

  /**
   * Fetch API.
   * @param favouriteObj Object contains favourite photos
   */
  const fetchImages = (favouriteObj: any) => {
    setImageList([]);
    setLoading(true);
    const startDateStr = moment(startDate).format("YYYY-MM-DD");
    const endDateStr = moment(endDate).format("YYYY-MM-DD");
    const url = `${NASA_URL}?start_date=${startDateStr}&end_date=${endDateStr}&api_key=${API_KEY}`;

    fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Bad date inputs");
      })
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
                liked: favouriteObj.hasOwnProperty(photo.url) ? true : false,
              };
            }),
        ]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  /**
   * Add event listener to save to local storage
   */
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("favourite-list", JSON.stringify(favouritePhotos));
  });

  /**
   * Handle like button clicked event.
   * @param likedPhoto Photo object which is being liked
   */
  const handleLike = (likedPhoto: Photo) => {
    likedPhoto.liked = !likedPhoto.liked;
    if (favouritePhotos.hasOwnProperty(likedPhoto.url)) {
      const tempFavourite = { ...favouritePhotos };
      delete tempFavourite[likedPhoto.url];
      setFavouritePhotos(tempFavourite);
    } else setFavouritePhotos({ ...favouritePhotos, [likedPhoto.url]: likedPhoto });
  };

  /**
   * Handle changing between photo of the day gallery or favourite gallery.
   * @param favourite Indicator for one of two collection buttons is clicked.
   */
  const handleChangeCollection = (favourite: boolean) => {
    listRef.current!.scrollTo({ top: 0, behavior: "smooth" });
    setFavouriteClicked(favourite);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <img src={shopifyLogo} alt="Shopify Logo" />
          Spacestagram
        </div>

        <div className="picker-container">
          <div className="picker">
            Start Date
            <DatePicker
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => setStartDate(date)}
              maxDate={endDate}
              minDate={new Date("2000/01/01")}
              selectsStart
            />
          </div>
          <div className="picker">
            End Date
            <DatePicker
              selected={endDate}
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              maxDate={new Date()}
              selectsEnd
            />
          </div>
        </div>

        <div className="buttons">
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
      </div>

      <div className="main-container">
        {loading ? <Loader type="Puff" color="#1EA47E" /> : null}
        <div className="photo-list" ref={listRef}>
          {(favouriteClicked ? Object.values(favouritePhotos) : imageList).map(
            (photo) => (
              <Card
                key={photo.url}
                photo={photo}
                liked={photo.liked}
                onLike={handleLike}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
