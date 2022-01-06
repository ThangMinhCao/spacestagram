import "./Card.css";

interface CardProps {
  imgURL: string;
  title: string;
  date: string;
  description: string;
}

const Card = (props: CardProps) => {
  const { imgURL, title, date, description } = props;

  return (
    <div className="card">
      <img width="100%" src={imgURL} alt="space-img" />
      <div className="content">
        <span className="date">{date}</span><br/>
        <span className="title">{title}</span><br/>
        <span>{description}</span>
      </div>
    </div>
  )
}

export default Card;