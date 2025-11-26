import { useState } from "react";
import type { Movie } from "../../types/types";
import Modal from "../modal/Modal";
import MovieItem from "./MovieItem";
import styles from "./main.module.scss";
interface MainProps {
  data: Movie[];
  dataError: boolean;
  isFiltering: boolean;
}
const Main = ({ data, dataError, isFiltering }: MainProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState<Movie | null>(null);
  const handleClick = (movie: Movie) => {
    setMovieSelected(movie);
    setIsModalOpen(true);
  };

  return (
    <main>
      {dataError ? (
        <p className={styles.message}>Ошибка загрузки фильмов! :(</p>
      ) : (
        <MovieItem
          isFiltering={isFiltering}
          handleClick={handleClick}
          data={data}
        />
      )}

      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} movieSelected={movieSelected} />
      )}
    </main>
  );
};

export default Main;
