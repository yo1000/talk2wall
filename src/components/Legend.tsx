import styles from "./Legend.module.css";

export default function Legend({text}: {text: string;}) {
  return (
    <div className={styles.legend}>
      {text}
    </div>
  );
}
