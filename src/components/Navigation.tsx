import styles from "./Navigation.module.css";

export default function Navigation({tags}: {tags: {tag: string, count: number}[] | undefined}) {
  return (
    <nav className={styles.navigation}>
      <div className={styles.shortcuts}>
        <ul>
          <li><a href="/posts">Posts</a></li>
          <li><a href="/tags">Tags</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="https://github.com/yo1000/talk2wall">GitHub</a></li>
        </ul>
      </div>
      <div className={styles.tags}>
        <ul>
          {(tags ?? []).map(t => (
            <li key={t.tag}><a href={`/tags/${t.tag}`}>{t.tag}({t.count})</a></li>
          ))}
        </ul>
      </div>
      <div className={styles.logo}>
        <a href="/">壁にでも話してろ</a>
      </div>
    </nav>
  );
}
