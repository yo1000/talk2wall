import styles from "./PostContent.module.css";
import React from "react";

export default function PostContent({title, children}: {title: string; children: React.ReactNode;}) {
  return (
    <article className={styles.PostContent}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.body}>
        {children}
      </div>
    </article>
  );
}
