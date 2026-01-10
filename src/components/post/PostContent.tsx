import styles from "./PostContent.module.css";
import React from "react";
import Legend from "@/components/Legend";

export default function PostContent({title, children}: {title: string; children: React.ReactNode;}) {
  return (
    <article className={styles.PostContent}>
      <h1 className={styles.title}>
        <Legend text={"TITLE"}/>
        <span>{title}</span>
      </h1>
      <div className={styles.body}>
        {children}
      </div>
    </article>
  );
}
