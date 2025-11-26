import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import type { Genres } from "../../types/types";
interface HeaderProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Header = ({ handleInputChange, handleSelect }: HeaderProps) => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [genreError, setGenreError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchGenre = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/genres");
        if (!response.ok) {
          console.warn(`Ошибка ${response.status}: ${response.statusText}`);
          setGenreError(true);
          return;
        }
        const data = await response.json();
        setGenres(data);
      } catch {
        console.log("error");
        setGenreError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGenre();
  }, []);

  return (
    <header>
      <h3>Каталог фильмов</h3>
      <div className={styles["filter-block"]}>
        <div className={styles.filter}>
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Поиск фильмов..."
          />
        </div>
        <div className={styles.filter}>
          {loading ? (
            <>Загрузка жанров...</>
          ) : (
            <select onChange={handleSelect}>
              <option value="all">Выберите жанр</option>
              {genreError ? (
                <option disabled>Ошибка загрузки жанров</option>
              ) : (
                genres.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))
              )}
            </select>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
