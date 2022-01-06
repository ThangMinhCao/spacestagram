import { useState } from "react";
import "./Card.css";
import Button from "../Button/Button";
import { FavoriteBorder, Favorite } from "@material-ui/icons";

interface CardProps {
  imgURL: string;
  title: string;
  date: string;
  description: string;
}

const Card = (props: CardProps) => {
  const { imgURL, title, date, description } = props;
  const [liked, setLiked] = useState(false);

  return (
    <div className="card">
      <img width="100%" src={imgURL} alt="space-img" />
      <div className="content">
        <div className="card-header">
          <div>
            <span className="title">{title}</span>
            <br />
            <span className="date">{date}</span>
          </div>
          <div>
            <Button onClick={() => setLiked(!liked)}>
              {
                liked
                  ? <Favorite color="secondary" fontSize="inherit" />
                  : <FavoriteBorder fontSize="inherit" />
              }
            </Button>
          </div>
        </div>
        <span className="description">{description}</span>
      </div>
    </div>
  );
};

export default Card;
