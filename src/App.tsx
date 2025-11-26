import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import type { Movie } from "./types/types";
import debounce from "lodash/debounce";
import styles from "./App.module.scss";
import loadingImg from "./assets/animated/spinner.svg";

function App() {
  const [data, setData] = useState<Movie[]>([]);
  const [allData, setAllData] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dataError, setDataError] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleInputChange = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFiltering(true);
        setSearchValue(event.target.value);
        setTimeout(() => {
          setIsFiltering(false);
        }, 500);
      }, 300),
    []
  );
  const filteredData = useMemo(() => {
    return allData.filter((movie) =>
      movie.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [allData, searchValue]);

  useEffect(() => {
    setData(filteredData);
  }, [filteredData]);

  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setIsFiltering(true);
      setSelectValue(event.target.value);

      setTimeout(() => {
        setIsFiltering(false);
      }, 500);
    },
    []
  );

  const selectedData = useMemo(() => {
    if (selectValue.includes("all")) {
      return allData;
    }
    return allData.filter((movie) =>
      movie.genre?.some((item) =>
        item.toLowerCase().includes(selectValue.toLowerCase())
      )
    );
  }, [allData, selectValue]);

  useEffect(() => {
    setData(selectedData);
  }, [selectedData]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/movies`);
        if (!response.ok) {
          console.warn(`Ошибка ${response.status}: ${response.statusText}`);

          setDataError(true);
          return;
        }
        const movies = await response.json();
        setData(movies);
        setAllData(movies);
      } catch {
        console.error("Failed to fetch movies");

        setDataError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <img src={loadingImg} alt="" />
      </div>
    );
  }

  return (
    <>
      {loading}

      <Header
        handleSelect={handleSelect}
        handleInputChange={handleInputChange}
      />
      <Main isFiltering={isFiltering} dataError={dataError} data={data} />
    </>
  );
}

export default App;
