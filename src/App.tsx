import { useState, useEffect, useRef } from "react";
import "./App.css";
import shopifyLogo from "./assets/shopify-logo.png";
import Card from "./components/Card/Card";
import Button from "./components/Button/Button";
import { Photo } from "./utils/interfaces";
import { Favorite, PhotoLibrary } from "@material-ui/icons";
import { DateRange, RangeKeyDict } from "react-date-range";
import moment from "moment";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Loader from "react-loader-spinner";

const NASA_URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = "hiqVRSbsWAgNxm6bQxJNVL5WXISljVcot6mtpEuZ";

function App() {
  const [imageList, setImageList] = useState<Array<Photo>>([]);
  const [favouritePhotos, setFavouritePhotos] = useState<Array<Photo>>([]);
  const [favouriteClicked, setFavouriteClicked] = useState(false);
  const [startDate, setStartDate] = useState<moment.Moment>(
    moment().subtract(6, "days")
  );
  const [endDate, setEndDate] = useState<moment.Moment>(moment());
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchImages();
  }, [startDate, endDate]);

  const fetchImages = () => {
    setImageList([]);
    setLoading(true);
    const startDateStr = startDate.format("YYYY-MM-DD");
    const endDateStr = endDate.format("YYYY-MM-DD");
    const url = `${NASA_URL}?start_date=${startDateStr}&end_date=${endDateStr}&api_key=${API_KEY}`;

    fetch(url)
      .then((res) =>
        {
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
                liked: false,
              };
            }),
        ]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

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
  };

  const handleChangeDates = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.range;
    setStartDate(moment(startDate));
    setEndDate(moment(endDate));
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <img src={shopifyLogo} alt="Shopify Logo" />
          Spacestagram
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
        <div className="picker-container" style={{ display: favouriteClicked ? "none" : "block"}}>
          <DateRange
            className="date-picker"
            ranges={[
              {
                startDate: startDate.toDate(),
                endDate: endDate.toDate(),
                key: "range",
              },
            ]}
            onChange={handleChangeDates}
          />
        </div>
        {
          loading
            ? <Loader type="Puff" color="#1EA47E" />
            : null
        }
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
