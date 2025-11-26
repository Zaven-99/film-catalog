import type { Movie } from "../../types/types";
import styles from "./Modal.module.scss";
import closeImg from "../../assets/icons/close.svg";
import { useState } from "react";
interface ModalProps {
  movieSelected?: Movie | null;
  setIsModalOpen: (isOpen: boolean) => void;
}
const Modal = ({ movieSelected, setIsModalOpen }: ModalProps) => {
  const [isClosing, setisClosing] = useState(false);

  const handleClose = () => {
    setisClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setisClosing(false);
    }, 500);
  };

  return (
    <div
      onClick={() => setIsModalOpen(false)}
      className={styles["modal-overlay"]}
    >
      <div
        className={`${styles["modal-content"]} ${
          isClosing ? styles.close : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={handleClose} className={styles.close}>
          <img src={closeImg} alt="" />
        </div>
        <div className={styles["modal-content__container"]}>
          <div className={styles["modal-content__image"]}>
            <img src={movieSelected?.imageUrl} alt={movieSelected?.name} />
          </div>
          <div className={styles["modal-content__info"]}>
            <h3>{movieSelected?.name}</h3>
            <p className={styles.year}>
              {new Date(movieSelected?.year || "").getFullYear()}
            </p>
            <div className={styles["genres-container"]}>
              {movieSelected?.genre?.map((genre) => (
                <p key={genre} className={styles.genre}>
                  {genre}
                </p>
              ))}
            </div>
            <p className={styles.description}>{movieSelected?.description}</p>
            <div className={styles["raiting-container"]}>
              <p className={styles.raiting}>{movieSelected?.raiting}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
