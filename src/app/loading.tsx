import styles from './page.module.scss';

export default function Loading() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
}
