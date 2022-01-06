import { useState } from "react";
import "./Card.css";
import Button from "../Button/Button";
import { Photo } from "../../utils/interfaces";
import { FavoriteBorder, Favorite } from "@material-ui/icons";

interface CardProps {
  photo: Photo;
  liked: boolean,
  onLike: (photo: Photo) => void;
}

const Card = ({ photo, liked, onLike }: CardProps) => {
  const { url, title, date, explanation } = photo;

  return (
    <div className="card">
      <img width="100%" src={url} alt="space-img" />
      <div className="content">
        <div className="card-header">
          <div>
            <span className="title">{title}</span>
            <br />
            <span className="date">{date}</span>
          </div>
          <div>
            <Button color={liked ? "#FF8989" : "#000"} onClick={() => onLike(photo)}>
              {
                liked
                  ? <Favorite color="inherit" fontSize="inherit" />
                  : <FavoriteBorder fontSize="inherit" />
              }
            </Button>
          </div>
        </div>
        <span className="description">{explanation}</span>
      </div>
    </div>
  );
};

export default Card;
