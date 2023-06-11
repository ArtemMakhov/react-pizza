import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😔</span>
        <br />
        Not found
      </h1>
      <p className={styles.description}>К сожалению ничего не найдено</p>
    </div>
  );
};
