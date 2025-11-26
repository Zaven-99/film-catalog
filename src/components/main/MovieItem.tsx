import type { Movie } from "../../types/types";
import styles from "../main/main.module.scss";

interface MovieItemProps {
  data: Movie[];
  handleClick: (movie: Movie) => void;
  isFiltering: boolean;
}
const MovieItem = ({ data, isFiltering, handleClick }: MovieItemProps) => {
  return (
    <div className={styles["movie-item"]}>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((movie) => (
          <div
            onClick={() => handleClick(movie)}
            className={`${styles["movie-card"]} ${
              isFiltering ? styles.search : ""
            }`}
            key={movie.id}
          >
            <div className={styles["image-container"]}>
              <img
                className={styles["film-poster"]}
                src={movie.imageUrl}
                alt={movie.name}
              />
            </div>
            <div className={styles["movie-card__info"]}>
              <h4>{movie.name}</h4>
              <p>{new Date(movie.year).getFullYear()}</p>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.message}>Ничего не найдено...</p>
      )}
    </div>
  );
};

export default MovieItem;
