export interface Photo {
  url: string;
  date: string;
  title: string;
  explanation: string;
  liked: boolean;
}

export interface FavouriteList {
  [url: string]: Photo;
}